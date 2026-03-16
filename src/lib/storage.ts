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

    // Validation for Production
    const key = process.env.S3_UPLOAD_KEY;
    const secret = process.env.S3_UPLOAD_SECRET;
    const bucket = process.env.S3_UPLOAD_BUCKET;
    const region = process.env.S3_UPLOAD_REGION || "ap-south-1";

    if (!key || !secret || !bucket) {
        const missing = [];
        if (!key) missing.push("S3_UPLOAD_KEY");
        if (!secret) missing.push("S3_UPLOAD_SECRET");
        if (!bucket) missing.push("S3_UPLOAD_BUCKET");
        
        const errorMsg = `CRITICAL CONFIG ERROR: Missing ${missing.join(", ")}. Ensure these are set in AWS Amplify Environment Variables.`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }

    try {
        console.log(`Starting S3 upload to bucket: ${bucket}, region: ${region}, file: ${fileName}, size: ${buffer.length} bytes`);
        
        const parallelUploads3 = new Upload({
            client: s3Client,
            params: {
                Bucket: bucket,
                Key: fileName,
                Body: buffer,
                ContentType: file.type || "image/jpeg",
            },
        });

        await parallelUploads3.done();
        console.log(`Successfully uploaded ${fileName} to S3`);
        
        return `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;
    } catch (error: any) {
        console.error("DETAILED S3 UPLOAD ERROR:", error);
        
        // Handle common S3 errors with helpful messages
        let friendlyMessage = error.message || "Unknown S3 error";
        if (error.name === "CredentialsError" || error.code === "CredentialsError") {
            friendlyMessage = "AWS Credentials Error: Check if S3_UPLOAD_KEY and S3_UPLOAD_SECRET are correct and active.";
        } else if (error.name === "InvalidAccessKeyId") {
            friendlyMessage = "Invalid AWS Access Key ID. Please check your S3_UPLOAD_KEY.";
        } else if (error.name === "SignatureDoesNotMatch") {
            friendlyMessage = "AWS Secret Access Key is incorrect (Signature Mismatch). Please check your S3_UPLOAD_SECRET.";
        } else if (error.name === "NoSuchBucket") {
            friendlyMessage = `S3 Bucket "${bucket}" not found. Create it in AWS Console or check S3_UPLOAD_BUCKET.`;
        } else if (error.name === "AccessDenied") {
            friendlyMessage = `Access Denied for bucket "${bucket}". Ensure your IAM user has s3:PutObject and s3:PutObjectAcl permissions.`;
        }
        
        throw new Error(`S3 Upload Failed: ${friendlyMessage} [Code: ${error.name || error.code || 'None'}]`);
    }
}
