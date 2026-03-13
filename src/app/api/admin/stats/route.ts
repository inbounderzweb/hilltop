import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const [[{ count: productCount }]]: any = await db.query("SELECT COUNT(*) as count FROM products");
        const [[{ count: categoryCount }]]: any = await db.query("SELECT COUNT(*) as count FROM categories");
        const [[{ count: variationCount }]]: any = await db.query("SELECT COUNT(*) as count FROM variation_options WHERE type = 'color'");
        const [[{ count: blogCount }]]: any = await db.query("SELECT COUNT(*) as count FROM blogs");

        return Response.json({
            success: true,
            counts: {
                products: productCount,
                categories: categoryCount,
                variations: variationCount,
                blogs: blogCount
            }
        });
    } catch (error: any) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
