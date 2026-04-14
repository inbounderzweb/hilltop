import { sendEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return Response.json({ success: false, error: "Email is required" }, { status: 400 });
        }

<<<<<<< HEAD
=======
        // --- 1. MAILCHIMP INTEGRATION ---
        const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
        const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
        const MAILCHIMP_DATACENTER = MAILCHIMP_API_KEY.split("-")[1] || "us17";

        const mailchimpUrl = `https://${MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

        const mailchimpResponse = await fetch(mailchimpUrl, {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(`any:${MAILCHIMP_API_KEY}`).toString("base64")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email_address: email,
                status: "subscribed",
            }),
        });

        const mailchimpData = await mailchimpResponse.json();

        // Allow success if they are simply already subscribed
        if (!mailchimpResponse.ok && mailchimpData.title !== "Member Exists") {
            console.error("Mailchimp Error:", mailchimpData);
            return Response.json({ success: false, error: "Failed to add to Mailchimp" }, { status: mailchimpResponse.status });
        }

        // --- 2. ADMIN EMAIL NOTIFICATION ---
>>>>>>> 5adfe62 ((fix) .env added)
        const toEmail = "armaan@hilltopgranite.com, johnd@hilltopgranite.com";
        // const toEmail = "dk.inbounderz@gmail.com";

        // Send Email Notification
        const emailResult = await sendEmail({
            to: toEmail,
            replyTo: email,
            subject: `New Newsletter Subscription`,
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <div style="background-color: #DA9C39; padding: 30px 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">HILLTOP STONES</h1>
                    </div>
                    <div style="padding: 35px 30px; background-color: #ffffff; color: #333333;">
                        <h2 style="color: #222222; margin-top: 0; font-size: 22px; font-weight: 600;">New Subscriber</h2>
                        <p style="font-size: 15px; line-height: 1.6; color: #555555;">A new user has subscribed to the newsletter from the website footer.</p>
                        
                        <div style="background-color: #fcfaf7; padding: 20px; border-radius: 6px; margin-top: 25px; border-left: 4px solid #DA9C39;">
                            <p style="margin: 0; font-size: 15px;"><strong style="color: #222222; display: inline-block; width: 130px;">Subscriber Email:</strong> <a href="mailto:${email}" style="color: #DA9C39; text-decoration: none;">${email}</a></p>
                        </div>
                    </div>
                    <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
                        <p style="color: #888888; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Hilltop Stones. All rights reserved.</p>
                    </div>
                </div>
            `
        });

        if (!emailResult.success) {
            return Response.json({
                success: false,
                error: `Mail delivery failure: ${emailResult.error}`,
            }, { status: 500 });
        }

        return Response.json({
            success: true, emailResult,
            message: "Subscribed successfully",
        });

    } catch (error: any) {
        console.error("SUBSCRIBE ERROR:", error);
        return Response.json({
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}
