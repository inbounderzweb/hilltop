import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const [rows] = await db.query("SELECT NOW() as now");

        return Response.json({
            success: true,
            time: rows,
        });

    } catch (error: any) {
        console.error("DB ERROR:", error);

        return Response.json({
            success: false,
            error: error.message,
        });
    }
}