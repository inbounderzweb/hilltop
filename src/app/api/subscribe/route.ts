import { sendEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return Response.json({ success: false, error: "Email is required" }, { status: 400 });
        }

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
