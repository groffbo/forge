import { gmail } from "../utils";

export const emailRouter = {
    createDraft: async (to: string, subject: string, body: string) => {
        try {
            // write email
            const rawMessage = [
                `To: ${to}`,
                `Subject: ${subject}`,
                "",
                body,
            ].join("\n")

            // random id number
            const id = Math.floor(Math.random() * 100001).toString();

            const draft = {
                id: id,
                message: [
                    Buffer.from(rawMessage).toString("base64")
                ],
            }

            await gmail.users.drafts.create({
                userId: "me",
                requestBody: {
                    message: draft,
                },
            });
                                 
        } catch (error) {
            console.error("Error creating draft:", error);
            throw new Error("Failed to create draft");
        }
    },

    sendDraft: async (draftId: string) => {
        try {
            // send previously created draft
            await gmail.users.drafts.send({
                userId: "me",
                requestBody: {
                    id: draftId,
                },
            });
        } catch (error) {
            console.error("Error sending draft:", error);
            throw new Error("Failed to send draft");
        }
    },

    sendEmail: async (to: string, subject: string, body: string) => {
        try {
            // write email
            const rawMessage = [
                `To: ${to}`,
                `Subject: ${subject}`,
                "",
                body,
            ].join("\n");
            
            // send email
            await gmail.users.messages.send({
                userId: "me",
                requestBody: {
                    raw: Buffer.from(rawMessage).toString("base64"),
                },
            });
        } catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Failed to send email");
        }
    },
};