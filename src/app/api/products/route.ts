import { db } from "@/lib/db";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
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

        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadsDir, { recursive: true });

        // Helper to save files
        const saveFile = async (file: File) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
            const fileName = `${uuidv4()}.${ext}`;
            const filePath = path.join(uploadsDir, fileName);
            await writeFile(filePath, buffer);
            return `/uploads/${fileName}`;
        };

        const image_url = await saveFile(image);

        // Handle Book Match Images (Removed)
        let bookMatchUrls: string[] = [];

        // Handle Application Images (Removed)
        let applicationUrls: string[] = [];

        // Handle Gallery (keeping for backward compatibility if needed)
        const gallery_links = JSON.parse(formData.get("gallery_links")?.toString() || "[]");
        const gallery_images = formData.getAll("gallery_images") as File[];
        let gallery = [];
        for (let i = 0; i < gallery_images.length; i++) {
            const file = gallery_images[i];
            if (file && file.size > 0) {
                const url = await saveFile(file);
                gallery.push({ url, link: gallery_links[i] || "" });
            }
        }

        const [result] = await db.query(
            `INSERT INTO products 
            (product_name, category, origin, color_family, description, image_url, gallery, thickness, base_color, product_video_url, book_match_images, application_images) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                product_name, category, origin, color_family, description, image_url, JSON.stringify(gallery),
                thickness, base_color, product_video_url, JSON.stringify(bookMatchUrls), JSON.stringify(applicationUrls)
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