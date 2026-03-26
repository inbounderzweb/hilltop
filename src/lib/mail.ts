export async function sendEmail({ to, subject, html, text, ...rest }: { to?: string, subject?: string, html?: string, text?: string, [key: string]: any }) {
    try {
        const payload = {
            // Using the key you provided so you don't even need to touch the .env!
            access_key: process.env.WEB3FORMS_ACCESS_KEY || "bbc3fdfc-bcde-470e-ace3-3c732adaa164",
            subject: subject || "New Website Submission",
            from_name: "Hilltop Auto-Mailer",
            message: html || text || "No message content provided.",
            ...rest
        };

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        
        if (result.success) {
            console.log("Web3Forms Email sent successfully:", result.message);
            return { success: true, messageId: result.message };
        } else {
            console.error("Web3Forms Error:", result.message);
            return { success: false, error: result.message };
        }
    } catch (error) {
        console.error("Error sending email via Web3Forms:", error);
        return { success: false, error };
    }
}
