import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mail";
import { uploadFile } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const full_name = formData.get("fullName")?.toString().trim();
        const job_role = formData.get("job")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const phone = formData.get("phone")?.toString().trim();
        const resume = formData.get("resume") as File | null;

        if (!full_name || !email || !job_role || !resume) {
            return Response.json(
                { success: false, error: "All required fields must be filled, including resume" },
                { status: 400 }
            );
        }

        const resume_url = await uploadFile(resume, "resumes");

        await db.query(
            "INSERT INTO career_enquiries (full_name, job_role, email, phone, resume_url) VALUES (?, ?, ?, ?, ?)",
            [full_name, job_role, email, phone, resume_url]
        );

        // Send Email Notification to Admin
        try {
            await sendEmail({
                to: "jobs@hilltopgranite.com",
                subject: `New Job Application: ${job_role}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #DA9C39;">New Career Application</h2>
                        <p>A new job application has been submitted through the Career Page.</p>
                        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
                            <p><strong>Name:</strong> ${full_name}</p>
                            <p><strong>Applied For:</strong> ${job_role}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Phone:</strong> +91 ${phone || 'N/A'}</p>
                            <p><strong>Resume:</strong> Captured and stored. View it in the Admin Dashboard.</p>
                        </div>
                        <p style="margin-top: 20px; font-size: 12px; color: #888;">
                            Manage applications at: <a href="https://hilltopgranite.com/admin">Admin Control Center</a>
                        </p>
                    </div>
                `
            });
        } catch (err) {
            console.error("FAILED TO SEND ADMIN EMAIL:", err);
        }

        return Response.json({
            success: true,
            message: "Application submitted successfully",
        });

    } catch (error: any) {
        console.error("CAREER ENQUIRY ERROR:", error);
        return Response.json({
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM career_enquiries ORDER BY created_at DESC");
        return Response.json({
            success: true,
            enquiries: rows,
        });
    } catch (error: any) {
        return Response.json({
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}
