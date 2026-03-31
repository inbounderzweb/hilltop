import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html, text, ...rest }: { to?: string, subject?: string, html?: string, text?: string, [key: string]: any }) {
    try {
        // Create a Nodemailer transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 465,
            secure: process.env.SMTP_SECURE === "true" || true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS, // App Password for Gmail
            },
        });

        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER || "Hilltop Auto-Mailer <no-reply@yourdomain.com>",
            to: to || process.env.ADMIN_EMAIL || "dk.inbounderz@gmail.com",
            subject: subject || "New Website Submission",
            text: text,
            html: html || text || "<p>No message content provided.</p>",
            ...rest
        };

        const result = await transporter.sendMail(mailOptions);

        console.log("Email sent successfully via Nodemailer:", result.messageId);
        return { success: true, messageId: result.messageId };

    } catch (error: any) {
        console.error("Error sending email via Nodemailer:", error);
        return { success: false, error: error.message || "Email service error" };
    }
}
