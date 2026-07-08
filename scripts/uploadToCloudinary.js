require("dotenv").config();

const fs = require("fs");
const os = require("os");
const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const ROOT = path.join(os.homedir(), "Desktop", "dgc-s3-export");

const albums = [
  {
    name: "plants",
    localFolder: path.join(ROOT, "plants"),
    cloudinaryFolder: "doncaster-garden-club/plants",
  },
  {
    name: "events",
    localFolder: path.join(ROOT, "events"),
    cloudinaryFolder: "doncaster-garden-club/events",
  },
];

const allowedExt = [".jpg", ".jpeg", ".png", ".webp"];

function getImages(folder) {
  if (!fs.existsSync(folder)) {
    console.log("Folder not found:", folder);
    return [];
  }

  return fs
    .readdirSync(folder)
    .map((file) => path.join(folder, file))
    .filter((filePath) => {
      const stat = fs.statSync(filePath);
      const ext = path.extname(filePath).toLowerCase();

      return stat.isFile() && allowedExt.includes(ext) && stat.size > 1024;
    });
}

async function uploadAlbum(album) {
  const files = getImages(album.localFolder);

  console.log("\n==============================");
  console.log("Album:", album.name);
  console.log("Local:", album.localFolder);
  console.log("Cloudinary:", album.cloudinaryFolder);
  console.log("Images found:", files.length);
  console.log("==============================");

  for (const filePath of files) {
    const baseName = path.basename(filePath, path.extname(filePath));

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: album.cloudinaryFolder,
        public_id: baseName,
        resource_type: "image",
        overwrite: true,
        transformation: [
          {
            width: 1600,
            height: 1600,
            crop: "limit",
            quality: "auto:good",
          },
        ],
      });

      console.log("Uploaded:", baseName);
      console.log(result.secure_url);
    } catch (error) {
      console.error("Failed:", filePath);
      console.error(error.message);
    }
  }
}

async function main() {
  for (const album of albums) {
    await uploadAlbum(album);
  }

  console.log("\nAll uploads finished.");
}

main();
