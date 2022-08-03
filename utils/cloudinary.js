const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export function uploadImage(file) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file, 
            { width: 400, height: 400, crop: "fill", folder: "festivapp" },
            (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}