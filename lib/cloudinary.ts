import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary on the server side
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "diy4ratd",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Generate an optimized delivery URL for a Cloudinary public ID or path
 */
export function getCloudinaryUrl(
  publicId: string,
  options: {
    resourceType?: "image" | "video";
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
  } = {}
): string {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME ||
    "diy4ratd";

  const {
    resourceType = "image",
    width,
    height,
    crop = "limit",
    quality = "auto",
    format = "auto",
  } = options;

  const transformations: string[] = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);

  const transformString =
    transformations.length > 0 ? `${transformations.join(",")}/` : "";

  // Strip leading slash if present
  const cleanId = publicId.replace(/^\//, "");

  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${transformString}${cleanId}`;
}
