import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
    region: process.env.S3_UPLOAD_REGION || "ap-south-1",
    credentials: {
        accessKeyId: process.env.S3_UPLOAD_KEY || "",
        secretAccessKey: process.env.S3_UPLOAD_SECRET || "",
    },
});

export async function uploadFile(file: File, folder: string = "uploads"): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
    const fileName = `${folder}/${uuidv4()}.${ext}`;

    // Fallback to local if no S3 keys (for development)
    if (!process.env.S3_UPLOAD_KEY && process.env.NODE_ENV !== "production") {
        console.warn("S3_UPLOAD_KEY not found, attempting local write (only works in dev)");
        const fs = require("fs/promises");
        const path = require("path");
        const uploadsDir = path.join(process.cwd(), "public", folder);
        await fs.mkdir(uploadsDir, { recursive: true });
        const filePath = path.join(uploadsDir, `${uuidv4()}.${ext}`);
        await fs.writeFile(filePath, buffer);
        return `/${folder}/${path.basename(filePath)}`;
    }

    try {
        const parallelUploads3 = new Upload({
            client: s3Client,
            params: {
                Bucket: process.env.S3_UPLOAD_BUCKET || "",
                Key: fileName,
                Body: buffer,
                ContentType: file.type || "image/jpeg",
            },
        });

        await parallelUploads3.done();
        
        // Return the public URL
        // If the bucket is public, it's https://BUCKET.s3.REGION.amazonaws.com/KEY
        // Or if you use a CDN/CloudFront, you might want to return that.
        // For now, return the S3 URL format
        return `https://${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com/${fileName}`;
    } catch (error) {
        console.error("S3 Upload Error:", error);
        throw new Error("Failed to upload image to S3");
    }
}
