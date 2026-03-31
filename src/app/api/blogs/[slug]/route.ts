import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const [rows]: any = await db.query(
            "SELECT * FROM blogs WHERE slug = ?",
            [slug]
        );

        if (rows.length === 0) {
            return Response.json(
                { success: false, error: "Blog post not found" },
                { status: 404 }
            );
        }

        const [related]: any = await db.query(
            "SELECT id, title, slug, excerpt, image_url FROM blogs WHERE slug != ? ORDER BY created_at DESC LIMIT 3",
            [slug]
        );

        const blog = rows[0];
        if (blog.image_url && !blog.image_url.startsWith("http") && !blog.image_url.startsWith("/")) {
            blog.image_url = `/${blog.image_url}`;
        }

        const relatedWithCorrectPaths = related.map((r: any) => {
            if (r.image_url && !r.image_url.startsWith("http") && !r.image_url.startsWith("/")) {
                return { ...r, image_url: `/${r.image_url}` };
            }
            return r;
        });

        return Response.json({
            success: true,
            blog: blog,
            related: relatedWithCorrectPaths
        });
    } catch (error: any) {
        return Response.json(
            { success: false, error: error?.message || "Failed to fetch blog post" },
            { status: 500 }
        );
    }
}
