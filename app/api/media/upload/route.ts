import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

const ALLOWED_FOLDERS = [
  "empire-ae/hero",
  "empire-ae/team",
  "empire-ae/projects",
  "empire-ae/about",
  "empire-ae/clients",
  "empire-ae/general",
];

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

export async function POST(req: NextRequest) {
  try {
    // Optional secret key authorization check for admin/CMS protection
    const authHeader = req.headers.get("authorization");
    const adminSecret = process.env.MEDIA_UPLOAD_SECRET;
    if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "empire-ae/general";
    const publicId = formData.get("public_id") as string | null;
    const overwrite = formData.get("overwrite") === "true";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate folder
    if (!ALLOWED_FOLDERS.some((f) => folder.startsWith(f))) {
      return NextResponse.json(
        { error: `Folder must start with one of: ${ALLOWED_FOLDERS.join(", ")}` },
        { status: 400 }
      );
    }

    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: "Invalid file type. Only image and video files are supported." },
        { status: 400 }
      );
    }

    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds the limit of ${maxSize / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadOptions: Record<string, unknown> = {
      folder,
      resource_type: isVideo ? "video" : "image",
      overwrite,
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
      format: string;
      bytes: number;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Cloudinary upload failed"));
          } else {
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
              format: result.format,
              bytes: result.bytes,
            });
          }
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      format: uploadResult.format,
      bytes: uploadResult.bytes,
    });
  } catch (err: unknown) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const adminSecret = process.env.MEDIA_UPLOAD_SECRET;
    if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { public_id, resource_type = "image" } = await req.json();
    if (!public_id) {
      return NextResponse.json({ error: "Missing public_id" }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type,
    });

    return NextResponse.json({ success: true, result });
  } catch (err: unknown) {
    console.error("Cloudinary delete error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete file" },
      { status: 500 }
    );
  }
}
