import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mail";
import { uploadFile } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";
import path from "path";

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
        const emailResult = await sendEmail({
            to: process.env.ADMIN_EMAIL || "555jinson@gmail.com",
            replyTo: email,
            subject: `New Job Application: ${job_role}`,
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <div style="background-color: #DA9C39; padding: 30px 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">HILLTOP SURFACES</h1>
                    </div>
                    <div style="padding: 35px 30px; background-color: #ffffff; color: #333333;">
                        <h2 style="color: #222222; margin-top: 0; font-size: 22px; font-weight: 600;">New Career Application</h2>
                        <p style="font-size: 15px; line-height: 1.6; color: #555555;">A new job application has been submitted through the Hilltop Careers page.</p>
                        
                        <div style="background-color: #fcfaf7; padding: 20px; border-radius: 6px; margin-top: 25px; border-left: 4px solid #DA9C39;">
                            <p style="margin: 0 0 12px 0; font-size: 15px;"><strong style="color: #222222; display: inline-block; width: 120px;">Applicant:</strong> ${full_name}</p>
                            <p style="margin: 0 0 12px 0; font-size: 15px;"><strong style="color: #222222; display: inline-block; width: 120px;">Position:</strong> ${job_role}</p>
                            <p style="margin: 0 0 12px 0; font-size: 15px;"><strong style="color: #222222; display: inline-block; width: 120px;">Email Address:</strong> <a href="mailto:${email}" style="color: #DA9C39; text-decoration: none;">${email}</a></p>
                            <p style="margin: 0; font-size: 15px;"><strong style="color: #222222; display: inline-block; width: 120px;">Phone Number:</strong> +91 ${phone || 'N/A'}</p>
                        </div>
                        
                        <div style="margin-top: 35px; border-top: 1px solid #eeeeee; padding-top: 20px;">
                            <p style="font-size: 14px; color: #666666; margin: 0; text-align: center;">The applicant's resume has been securely attached to this email.</p>
                        </div>
                    </div>
                    <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
                        <p style="color: #888888; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Hilltop Surfaces. All rights reserved.</p>
                        <p style="color: #666666; font-size: 11px; margin: 8px 0 0 0;">Manage applications at <a href="https://hilltopgranite.com/admin" style="color: #DA9C39; text-decoration: none;">Admin Control Center</a></p>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: resume.name || "resume.pdf",
                    path: resume_url.startsWith("/") ? path.join(process.cwd(), "public", resume_url) : resume_url
                }
            ]
        });

        if (!emailResult.success) {
            return Response.json({
                success: false,
                error: `Mail delivery failure: ${emailResult.error}`,
            }, { status: 500 });
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
