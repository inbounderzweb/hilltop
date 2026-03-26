export async function sendEmail({ to, subject, html, text, ...rest }: { to?: string, subject?: string, html?: string, text?: string, [key: string]: any }) {
    try {
        const accessKey = process.env.WEB3FORMS_ACCESS_KEY || "bbc3fdfc-bcde-470e-ace3-3c732adaa164";
        
        const payload = {
            access_key: accessKey,
            subject: subject || "New Website Submission",
            from_name: "Hilltop Auto-Mailer",
            message: html || text || "No message content provided.",
            ...rest
        };

        console.log("Sending email via Web3Forms with Key:", accessKey.substring(0, 8) + "...");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        });

        const responseText = await response.text();
        let result;
        
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            console.error("Web3Forms returned non-JSON response:", responseText.substring(0, 200));
            return { success: false, error: "Invalid response from email service" };
        }
        
        if (result.success) {
            console.log("Web3Forms Email sent successfully:", result.message);
            return { success: true, messageId: result.message };
        } else {
            console.error("Web3Forms API Error:", result.message || result);
            return { success: false, error: result.message || "Email service error" };
        }
    } catch (error) {
        console.error("Error sending email via Web3Forms:", error);
        return { success: false, error };
    }
}
