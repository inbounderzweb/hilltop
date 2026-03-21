import { db } from "@/lib/db";
import { uploadFile } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const formData = await req.formData();

        const name = formData.get("name")?.toString().trim();
        const content = formData.get("content")?.toString().trim();
        const rating = parseInt(formData.get("rating")?.toString() || "5", 10);
        const image = formData.get("image") as File | null;

        if (!name || !content) {
            return Response.json(
                { success: false, error: "Name and content are required" },
                { status: 400 }
            );
        }

        let avatar_url: string | null = null;
        if (image) {
            avatar_url = await uploadFile(image, "testimonials");
        }

        if (avatar_url) {
            await db.query(
                `UPDATE testimonials SET name = ?, content = ?, rating = ?, avatar_url = ? WHERE id = ?`,
                [name, content, rating, avatar_url, id]
            );
        } else {
            await db.query(
                `UPDATE testimonials SET name = ?, content = ?, rating = ? WHERE id = ?`,
                [name, content, rating, id]
            );
        }

        return Response.json({
            success: true,
            message: "Testimonial updated successfully"
        });
    } catch (error: any) {
        console.error("TESTIMONIAL UPDATE ERROR:", error);
        return Response.json(
            { success: false, error: error?.message || "Failed to update testimonial" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        
        await db.query("DELETE FROM testimonials WHERE id = ?", [id]);

        return Response.json({
            success: true,
            message: "Testimonial deleted successfully"
        });
    } catch (error: any) {
        return Response.json(
            { success: false, error: error?.message || "Failed to delete testimonial" },
            { status: 500 }
        );
    }
}
