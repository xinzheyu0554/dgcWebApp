require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function getAllImages(folder) {
  let all = [];
  let nextCursor;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix: `${folder}/`,
      max_results: 100,
      next_cursor: nextCursor,
    });

    all = all.concat(result.resources || []);
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return all;
}

async function main() {
  const folders = [
    "doncaster-garden-club/plants",
    "doncaster-garden-club/events",
  ];

  for (const folder of folders) {
    const images = await getAllImages(folder);

    console.log("\nFolder:", folder);
    console.log("Count:", images.length);

    images.slice(0, 5).forEach((image) => {
      console.log(image.secure_url);
    });
  }
}

main();
