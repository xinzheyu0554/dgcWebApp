require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function main() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      max_results: 1,
    });

    console.log("Cloudinary connected successfully.");
    console.log("Returned resources:", result.resources.length);
  } catch (error) {
    console.error("Cloudinary test failed:");
    console.error(error.message);
    process.exit(1);
  }
}

main();
