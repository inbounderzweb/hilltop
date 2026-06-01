import { db } from "@/lib/db";
import { uploadFile } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

let productFlagsReady = false;

async function ensureProductFlags() {
    if (productFlagsReady) return;

    try {
        await db.query("ALTER TABLE products ADD COLUMN is_new_arrival TINYINT(1) NOT NULL DEFAULT 0");
        productFlagsReady = true;
    } catch (error: any) {
        if (!["ER_DUP_FIELDNAME", "42S21"].includes(error?.code) && error?.errno !== 1060) {
            throw error;
        }
        productFlagsReady = true;
    }
}

export async function POST(req: Request) {
    try {
        await ensureProductFlags();
        const formData = await req.formData();

        const product_name = formData.get("product_name")?.toString().trim();
        const category = formData.get("category")?.toString().trim();
        const origin = formData.get("origin")?.toString().trim();
        const color_family = formData.get("color_family")?.toString().trim();
        const description = formData.get("description")?.toString().trim();
        const image = formData.get("image") as File | null;

        // New Fields
        const thickness = formData.get("thickness")?.toString().trim();
        const base_color = formData.get("base_color")?.toString().trim();
        const product_video_url = formData.get("product_video_url")?.toString().trim();
        const is_new_arrival = formData.get("is_new_arrival") === "true" ? 1 : 0;

        if (
            !product_name ||
            !category ||
            !origin ||
            !color_family ||
            !description ||
            !image
        ) {
            return Response.json(
                { success: false, error: "All fields are required" },
                { status: 400 }
            );
        }

        const image_url = await uploadFile(image, "products");
        
        // Handle Video Upload
        const videoFile = formData.get("product_video") as File | null;
        let final_video_url = product_video_url || "";
        
        if (videoFile && videoFile.size > 0) {
            final_video_url = await uploadFile(videoFile, "videos");
        }

        // Handle Book Match Images (Removed)
        let bookMatchUrls: string[] = [];

        // Handle Application Images (Removed)
        let applicationUrls: string[] = [];

        // Handle Gallery Uploads in Parallel
        const gallery_links = JSON.parse(formData.get("gallery_links")?.toString() || "[]");
        const gallery_images = formData.getAll("gallery_images") as File[];
        
        const galleryUploadPromises = gallery_images.map(async (file, i) => {
            if (file && file.size > 0) {
                const url = await uploadFile(file, "gallery");
                return { url, link: gallery_links[i] || "" };
            }
            return null;
        });
        
        const uploadedGallery = await Promise.all(galleryUploadPromises);
        let gallery = uploadedGallery.filter(item => item !== null);

        const [result] = await db.query(
            `INSERT INTO products 
            (product_name, category, origin, color_family, description, image_url, gallery, thickness, base_color, product_video_url, book_match_images, application_images, is_new_arrival) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                product_name, category, origin, color_family, description, image_url, JSON.stringify(gallery),
                thickness, base_color, final_video_url, JSON.stringify(bookMatchUrls), JSON.stringify(applicationUrls), is_new_arrival
            ]
        );

        return Response.json({
            success: true,
            message: "Product added successfully",
            image_url,
            result,
        });
    } catch (error: any) {
        console.error("PRODUCT INSERT ERROR:", error);
        return Response.json(
            { success: false, error: error?.message || "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await ensureProductFlags();
        const [rows]: any = await db.query(
            "SELECT * FROM products ORDER BY id DESC"
        );

        const products = rows.map((p: any) => {
            let gallery = [];
            if (p.gallery) {
                try {
                    gallery = typeof p.gallery === 'string' ? JSON.parse(p.gallery) : p.gallery;
                } catch (e) {
                    console.error("Gallery parse error for product", p.id, e);
                    gallery = [];
                }
            }
            return { ...p, gallery };
        });

        return Response.json({
            success: true,
            products: products,
        });
    } catch (error: any) {
        return Response.json(
            {
                success: false,
                error: error?.message || "Failed to fetch products",
            },
            { status: 500 }
        );
    }
}
