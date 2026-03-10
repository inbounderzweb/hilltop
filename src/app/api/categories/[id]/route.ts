import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return Response.json({ success: false, error: "Category ID is required" }, { status: 400 });
        }

        const [result]: any = await db.query("DELETE FROM categories WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return Response.json({ success: false, error: "Category not found" }, { status: 404 });
        }

        return Response.json({ success: true, message: "Category deleted successfully" });
    } catch (error: any) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
