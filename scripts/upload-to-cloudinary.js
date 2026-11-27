const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Load .env.local manually
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const [key, ...rest] = trimmed.split("=");
    if (key && rest.length > 0) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "diy4ratd",
  api_key: process.env.CLOUDINARY_API_KEY || "812983528492383",
  api_secret: process.env.CLOUDINARY_API_SECRET || "0UlZEyJLIigF-54SNV77gB56oww",
  secure: true,
});

async function uploadFile(filePath, folder, resourceType = "image", publicId = null) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return null;
  }
  const filename = path.basename(filePath, path.extname(filePath));
  const options = {
    folder,
    resource_type: resourceType,
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  if (publicId) options.public_id = publicId;

  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    console.log(`[UPLOADED] ${filePath} -> ${result.secure_url}`);
    return {
      localPath: filePath,
      secure_url: result.secure_url,
      public_id: result.public_id,
      resource_type: resourceType,
    };
  } catch (err) {
    if (err.message && err.message.includes("403")) {
      console.error(
        `\n[PERMISSION ERROR] Cloudinary API Key returned 403 Forbidden.` +
        `\nReason: In your Cloudinary dashboard (Settings -> Access Keys), your API key needs "Upload / Create" permissions enabled,` +
        `\nor use your account's Master API Key & Secret.\n`
      );
    } else {
      console.error(`[ERROR] Failed to upload ${filePath}:`, err.message);
    }
    return null;
  }
}

async function main() {
  const results = {};
  const baseDir = path.join(__dirname, "..");

  console.log("=== 1. UPLOADING HERO VIDEO & POSTER ===");
  const heroVideo = path.join(baseDir, "public", "videos", "homevideo1.mp4");
  results["hero_video"] = await uploadFile(heroVideo, "empire-ae/hero", "video", "homevideo1");

  const heroPoster = path.join(baseDir, "public", "hero.webp");
  results["hero_poster"] = await uploadFile(heroPoster, "empire-ae/hero", "image", "hero");

  console.log("\n=== 2. UPLOADING TEAM PHOTOS ===");
  results.team = {};
  const photoOneDir = path.join(baseDir, "public", "team", "PHOTO-ONE");
  if (fs.existsSync(photoOneDir)) {
    for (let i = 1; i <= 29; i++) {
      const numStr = i < 10 ? `0${i}` : `${i}`;
      const photoFile = path.join(photoOneDir, `photos-${numStr}.jpg`);
      if (fs.existsSync(photoFile)) {
        const res = await uploadFile(photoFile, "empire-ae/team", "image", `photos-${numStr}`);
        if (res) results.team[numStr] = res.secure_url;
      }
    }
  }

  // Sayooj & Arjun photos
  const sojiFile = path.join(baseDir, "public", "team", "pic", "soji.PNG");
  if (fs.existsSync(sojiFile)) {
    const res = await uploadFile(sojiFile, "empire-ae/team", "image", "soji");
    if (res) results.team["soji"] = res.secure_url;
  }

  const arjunFile = path.join(baseDir, "public", "team", "pic", "Arjun.jpeg");
  if (fs.existsSync(arjunFile)) {
    const res = await uploadFile(arjunFile, "empire-ae/team", "image", "Arjun");
    if (res) results.team["arjun"] = res.secure_url;
  }

  console.log("\n=== 3. UPLOADING OTHER IMPORTANT ASSETS ===");
  const aboutFile = path.join(baseDir, "public", "about.webp");
  if (fs.existsSync(aboutFile)) {
    results["about"] = await uploadFile(aboutFile, "empire-ae/about", "image", "about");
  }

  const outputPath = path.join(__dirname, "cloudinary-urls.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf8");
  console.log(`\nAll uploaded successfully! Results saved to ${outputPath}`);
}

main().catch(console.error);
