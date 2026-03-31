import { db } from "@/lib/db";
import { uploadFile } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

// Helper to generate slug
const generateSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
};

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const title = formData.get("title")?.toString().trim();
        const author_name = formData.get("author_name")?.toString().trim();
        const excerpt = formData.get("excerpt")?.toString().trim();
        const content = formData.get("content")?.toString().trim();
        const image = formData.get("image") as File | null;

        if (!title || !author_name || !excerpt || !content || !image) {
            return Response.json(
                { success: false, error: "All fields are required" },
                { status: 400 }
            );
        }

        // Slug generation
        let slug = generateSlug(title);

        // Ensure slug is unique (basic check)
        const [existing]: any = await db.query("SELECT id FROM blogs WHERE slug = ?", [slug]);
        if (existing.length > 0) {
            slug = `${slug}-${Date.now().toString().slice(-4)}`;
        }

        const image_url = await uploadFile(image, "blogs");

        const [result] = await db.query(
            `INSERT INTO blogs (title, author_name, slug, excerpt, content, image_url) VALUES (?, ?, ?, ?, ?, ?)`,
            [title, author_name, slug, excerpt, content, image_url]
        );

        return Response.json({
            success: true,
            message: "Blog post created successfully",
            slug,
            result,
        });
    } catch (error: any) {
        console.error("BLOG INSERT ERROR:", error);
        return Response.json(
            { success: false, error: error?.message || "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const [rows]: any = await db.query(
            "SELECT id, title, author_name, slug, excerpt, content, image_url, created_at FROM blogs ORDER BY created_at DESC"
        );

        const blogsWithCorrectPaths = rows.map((blog: any) => {
            if (blog.image_url && !blog.image_url.startsWith("http") && !blog.image_url.startsWith("/")) {
                return { ...blog, image_url: `/${blog.image_url}` };
            }
            return blog;
        });

        return Response.json({
            success: true,
            blogs: blogsWithCorrectPaths,
        });
    } catch (error: any) {
        return Response.json(
            { success: false, error: error?.message || "Failed to fetch blogs" },
            { status: 500 }
        );
    }
}
