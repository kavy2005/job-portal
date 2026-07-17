const cloudinary = require("cloudinary").v2;

console.log("Cloudinary ENV check:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "SET (" + process.env.CLOUDINARY_API_KEY.length + " chars)" : "MISSING",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "SET (" + process.env.CLOUDINARY_API_SECRET.length + " chars)" : "MISSING",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;