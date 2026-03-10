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

        if (image.size > 500 * 1024) {
            return Response.json(
                { success: false, error: "Image size must be less than 500KB" },
                { status: 400 }
            );
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadsDir, { recursive: true });

        const originalName = image.name || "image";
        const ext = originalName.includes(".")
            ? originalName.split(".").pop()
            : "jpg";

        const fileName = `${uuidv4()}.${ext}`;
        const filePath = path.join(uploadsDir, fileName);

        await writeFile(filePath, buffer);

        const image_url = `/uploads/${fileName}`;

        // Handle Gallery
        const gallery_links = JSON.parse(formData.get("gallery_links")?.toString() || "[]");
        const gallery_images = formData.getAll("gallery_images") as File[];

        let gallery = [];
        for (let i = 0; i < gallery_images.length; i++) {
            const file = gallery_images[i];
            if (file && file.size > 0) {
                const bytesG = await file.arrayBuffer();
                const bufferG = Buffer.from(bytesG);
                const fileNameG = `${uuidv4()}.${file.name.split(".").pop()}`;
                await writeFile(path.join(uploadsDir, fileNameG), bufferG);
                gallery.push({
                    url: `/uploads/${fileNameG}`,
                    link: gallery_links[i] || ""
                });
            }
        }

        const [result] = await db.query(
            `INSERT INTO products
      (product_name, category, origin, color_family, description, image_url, gallery)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [product_name, category, origin, color_family, description, image_url, JSON.stringify(gallery)]
        );

        return Response.json({
            success: true,
            message: "Product added successfully",
            image_url,
            gallery,
            result,
        });
    } catch (error: any) {
        console.error("PRODUCT INSERT ERROR:", error);

        return Response.json(
            {
                success: false,
                error: error?.message || "Something went wrong",
            },
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