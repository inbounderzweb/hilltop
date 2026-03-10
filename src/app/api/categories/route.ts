import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM categories ORDER BY name ASC");
        return Response.json({ success: true, categories: rows });
    } catch (error: any) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name } = await req.json();

        if (!name || name.trim() === "") {
            return Response.json({ success: false, error: "Category name is required" }, { status: 400 });
        }

        const [result]: any = await db.query("INSERT INTO categories (name) VALUES (?)", [name.trim()]);

        return Response.json({
            success: true,
            message: "Category added successfully",
            categoryId: result.insertId
        });
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            return Response.json({ success: false, error: "Category already exists" }, { status: 400 });
        }
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
