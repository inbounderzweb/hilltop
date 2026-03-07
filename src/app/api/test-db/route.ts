import db from "@/lib/db";

export const dynamic = "force-static";

export async function GET() {
    try {
        const [rows] = await db.query("SELECT NOW() AS now");
        return Response.json({ success: true, rows });
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, error: "DB connection failed" }, { status: 500 });
    }
}