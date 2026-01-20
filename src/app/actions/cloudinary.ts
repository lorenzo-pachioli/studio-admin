'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteImage(imageUrl: string) {
    try {
        if (!imageUrl || !imageUrl.includes('res.cloudinary.com')) {
            return; // Not a Cloudinary image or empty
        }

        // Extract public_id from URL
        // URL format: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>.<extension>
        // or sometimes without version
        const parts = imageUrl.split('/');
        const uploadIndex = parts.indexOf('upload');
        if (uploadIndex === -1) return;

        // Everything after 'upload' (and potential version) is part of public_id
        // But we need to handle version (v1234567890) if present
        let publicIdParts = parts.slice(uploadIndex + 1);

        // Remove version if present (starts with 'v' followed by numbers)
        if (publicIdParts[0].match(/^v\d+$/)) {
            publicIdParts = publicIdParts.slice(1);
        }

        const filename = publicIdParts.join('/');
        const publicId = filename.substring(0, filename.lastIndexOf('.')); // Remove extension

        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        // We don't throw here to avoid blocking the main operation (product deletion)
        // but in a production app you might want to handle this more robustly
    }
}
