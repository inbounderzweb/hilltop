import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");

        let query = "SELECT * FROM variation_options";
        let params = [];

        if (type) {
            query += " WHERE type = ?";
            params.push(type);
        }

        query += " ORDER BY value ASC";

        const [rows] = await db.query(query, params);
        return Response.json({ success: true, options: rows });
    } catch (error: any) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { type, value } = await req.json();

        if (!type || !value || value.trim() === "") {
            return Response.json({ success: false, error: "Type and value are required" }, { status: 400 });
        }

        const [result]: any = await db.query(
            "INSERT INTO variation_options (type, value) VALUES (?, ?)",
            [type.toLowerCase(), value.trim()]
        );

        return Response.json({
            success: true,
            message: "Variation option added successfully",
            id: result.insertId
        });
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            return Response.json({ success: false, error: "This variation already exists" }, { status: 400 });
        }
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
