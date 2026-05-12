// src/app/api/products/[id]/route.ts
import { db } from "@/lib/db";
import { uploadFile } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const [rows]: any = await db.query("SELECT * FROM products WHERE id = ?", [id]);

        if (rows.length === 0) {
            return Response.json({ success: false, error: "Product not found" }, { status: 404 });
        }

        const product = rows[0];
        // Parse gallery if it exists and is a string
        if (product.gallery) {
            try {
                product.gallery = typeof product.gallery === "string"
                    ? JSON.parse(product.gallery)
                    : product.gallery;
            } catch (e) {
                console.error("Gallery parsing failed:", e);
                product.gallery = [];
            }
        } else {
            product.gallery = [];
        }

        return Response.json({ success: true, product });
    } catch (error: any) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const formData = await request.formData();

        const product_name = formData.get("product_name")?.toString().trim();
        const category = formData.get("category")?.toString().trim();
        const origin = formData.get("origin")?.toString().trim();
        const color_family = formData.get("color_family")?.toString().trim();
        const description = formData.get("description")?.toString().trim();

        // New Fields
        const thickness = formData.get("thickness")?.toString().trim();
        const base_color = formData.get("base_color")?.toString().trim();
        const product_video_url = formData.get("product_video_url")?.toString().trim();

        // Handle main image if updated
        const image = formData.get("image") as File | null;
        let image_url = formData.get("existing_image_url")?.toString();

        if (image && image.size > 0) {
            image_url = await uploadFile(image, "products");
        }

        // Handle video if updated
        const video = formData.get("product_video") as File | null;
        let final_video_url = formData.get("existing_video_url")?.toString() || "";

        if (video && video.size > 0) {
            final_video_url = await uploadFile(video, "videos");
        }

        // Handle Book Match Images (Removed)
        let bookMatchUrls: string[] = [];

        // Handle Application Images (Removed)
        let applicationUrls: string[] = [];

        // Handle gallery in parallel
        const gallery_links = JSON.parse(formData.get("gallery_links")?.toString() || "[]");
        const existing_gallery = JSON.parse(formData.get("existing_gallery")?.toString() || "[]");
        const gallery_layout_str = formData.get("gallery_layout")?.toString();
        const gallery_layout = gallery_layout_str ? JSON.parse(gallery_layout_str) : null;
        
        const newGalleryImages = formData.getAll("gallery_images") as File[];

        const galleryUploadPromises = newGalleryImages.map(async (file, i) => {
            if (file && file.size > 0) {
                const url = await uploadFile(file, "gallery");
                return { url, link: gallery_links[i] || "" };
            }
            return null;
        });

        const uploadedNewGallery = await Promise.all(galleryUploadPromises);
        
        let gallery: any[] = [];
        
        if (gallery_layout) {
            let newImageIndex = 0;
            let existingItemIndex = 0;
            
            for (const item of gallery_layout) {
                if (item.type === 'existing' && existing_gallery[existingItemIndex]) {
                    gallery.push(existing_gallery[existingItemIndex]);
                    existingItemIndex++;
                } else if (item.type === 'new') {
                    const uploadedItem = uploadedNewGallery[newImageIndex];
                    if (uploadedItem) {
                        gallery.push(uploadedItem);
                    }
                    newImageIndex++;
                }
            }
        } else {
            gallery = [...existing_gallery];
            uploadedNewGallery.forEach(item => {
                if (item) gallery.push(item);
            });
        }

        await db.query(
            `UPDATE products SET 
            product_name = ?, category = ?, origin = ?, color_family = ?, description = ?, image_url = ?, gallery = ?,
            thickness = ?, base_color = ?, product_video_url = ?, book_match_images = ?, application_images = ?
            WHERE id = ?`,
            [
                product_name, category, origin, color_family, description, image_url, JSON.stringify(gallery),
                thickness, base_color, final_video_url, JSON.stringify(bookMatchUrls), JSON.stringify(applicationUrls),
                id
            ]
        );

        return Response.json({ success: true, message: "Product updated successfully" });
    } catch (error: any) {
        console.error("UPDATE ERROR:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return Response.json(
                { success: false, error: "Product id is required" },
                { status: 400 }
            );
        }

        const [result]: any = await db.query(
            "DELETE FROM products WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return Response.json(
                { success: false, error: "Product not found" },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error: any) {
        console.error("DELETE PRODUCT ERROR:", error);

        return Response.json(
            {
                success: false,
                error: error?.message || "Failed to delete product",
            },
            { status: 500 }
        );
    }
}