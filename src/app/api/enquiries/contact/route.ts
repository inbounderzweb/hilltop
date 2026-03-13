import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, purpose, message } = body;

        if (!name || !email) {
            return Response.json({ success: false, error: "Name and Email are required" }, { status: 400 });
        }

        await db.query(
            "INSERT INTO contact_enquiries (name, email, phone, purpose, message) VALUES (?, ?, ?, ?, ?)",
            [name, email, phone, purpose, message]
        );

        // Send Email Notification to Admin
        try {
            await sendEmail({
                to: "dk.inbounderz@gmail.com",
                subject: `New Customer Enquiry: ${purpose}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #DA9C39;">New Website Enquiry</h2>
                        <p>A new enquiry has been submitted through the Contact Form.</p>
                        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                            <p><strong>Purpose:</strong> ${purpose}</p>
                            <p><strong>Message:</strong></p>
                            <p style="white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                `
            });
        } catch (err) {
            console.error("FAILED TO SEND ADMIN EMAIL:", err);
            // We don't fail the whole request just because email failed
        }

        return Response.json({
            success: true,
            message: "Enquiry submitted successfully",
        });

    } catch (error: any) {
        console.error("CONTACT ENQUIRY ERROR:", error);
        return Response.json({
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM contact_enquiries ORDER BY created_at DESC");
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
