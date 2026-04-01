import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, purpose, message, country } = body;

        if (!name || !email) {
            return Response.json({ success: false, error: "Name and Email are required" }, { status: 400 });
        }

        await db.query(
            "INSERT INTO contact_enquiries (name, email, phone, purpose, message) VALUES (?, ?, ?, ?, ?)",
            [name, email, phone, purpose, message]
        );

        let toEmail = process.env.INDIA_EMAIL || "armaan@hilltopgranite.com";
        const normalizedCountry = country?.toLowerCase();
        if (normalizedCountry === "usa" || normalizedCountry === "united states" || normalizedCountry === "united state" || normalizedCountry === "us") {
            toEmail = process.env.USA_EMAIL || "dallas@hilltopgranite.com";
        }

        // Send Email Notification to Admin
        const emailResult = await sendEmail({
            to: toEmail,
            replyTo: email,
            subject: `New Customer Enquiry: ${purpose}`,
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <div style="background-color: #DA9C39; padding: 30px 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">HILLTOP SURFACES</h1>
                    </div>
                    <div style="padding: 35px 30px; background-color: #ffffff; color: #333333;">
                        <h2 style="color: #222222; margin-top: 0; font-size: 22px; font-weight: 600;">Customer Enquiry</h2>
                        <p style="font-size: 15px; line-height: 1.6; color: #555555;">A new enquiry has been submitted through the Hilltop Contact page.</p>
                        
                        <div style="background-color: #fcfaf7; padding: 20px; border-radius: 6px; margin-top: 25px; border-left: 4px solid #DA9C39;">
                            <p style="margin: 0 0 12px 0; font-size: 15px;"><strong style="color: #222222; display: inline-block; width: 120px;">Customer Name:</strong> ${name}</p>
                            <p style="margin: 0 0 12px 0; font-size: 15px;"><strong style="color: #222222; display: inline-block; width: 120px;">Email Address:</strong> <a href="mailto:${email}" style="color: #DA9C39; text-decoration: none;">${email}</a></p>
                            <p style="margin: 0 0 12px 0; font-size: 15px;"><strong style="color: #222222; display: inline-block; width: 120px;">Phone Number:</strong> ${phone || 'N/A'}</p>
                            <p style="margin: 0 0 12px 0; font-size: 15px;"><strong style="color: #222222; display: inline-block; width: 120px;">Country:</strong> ${country || 'N/A'}</p>
                            <p style="margin: 0; font-size: 15px;"><strong style="color: #222222; display: inline-block; width: 120px;">Purpose:</strong> ${purpose}</p>
                        </div>
                        
                        <div style="margin-top: 25px; padding: 20px; border: 1px solid #eeeeee; border-radius: 6px; background-color: #ffffff;">
                            <p style="margin: 0 0 10px 0; font-size: 14px; color: #888888; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">Message Details</p>
                            <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #444444; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                    <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
                        <p style="color: #888888; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Hilltop Surfaces. All rights reserved.</p>
                        <p style="color: #666666; font-size: 11px; margin: 8px 0 0 0;">Manage enquiries at <a href="https://hilltopgranite.com/admin" style="color: #DA9C39; text-decoration: none;">Admin Control Center</a></p>
                    </div>
                </div>
            `
        });

        console.log("<><>emailResult", emailResult)

        if (!emailResult.success) {
            return Response.json({
                success: false,
                error: `Mail delivery failure: ${emailResult.error}`,
            }, { status: 500 });
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
