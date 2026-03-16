import { db } from "@/lib/db";
import { uploadFile } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const [result]: any = await db.query(
            "DELETE FROM blogs WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return Response.json(
                { success: false, error: "Blog post not found" },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: "Blog post deleted successfully",
        });
    } catch (error: any) {
        return Response.json(
            { success: false, error: error?.message || "Failed to delete blog post" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const formData = await req.formData();

        const title = formData.get("title")?.toString().trim();
        const author_name = formData.get("author_name")?.toString().trim();
        const excerpt = formData.get("excerpt")?.toString().trim();
        const content = formData.get("content")?.toString().trim();
        const image = formData.get("image") as File | null;
        let image_url = formData.get("existing_image_url")?.toString();

        if (!title || !author_name || !excerpt || !content) {
            return Response.json(
                { success: false, error: "Required fields are missing" },
                { status: 400 }
            );
        }

        // Handle image update if a new file is provided
        if (image && image.size > 0) {
            image_url = await uploadFile(image, "blogs");
        }

        await db.query(
            `UPDATE blogs SET title = ?, author_name = ?, excerpt = ?, content = ?, image_url = ? WHERE id = ?`,
            [title, author_name, excerpt, content, image_url, id]
        );

        return Response.json({
            success: true,
            message: "Blog post updated successfully",
        });
    } catch (error: any) {
        console.error("BLOG UPDATE ERROR:", error);
        return Response.json(
            { success: false, error: error?.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
