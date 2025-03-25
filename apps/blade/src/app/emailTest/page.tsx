import { useState } from "react";
import { HydrateClient } from "~/trpc/server";

export default function EmailPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, body }),
      });

      if (response.ok) {
        setStatus("Email sent successfully!");
      } else {
        setStatus("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("An error occurred.");
    }
  };

  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <h1 className="text-2xl font-bold mb-4">Send an Email</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">To:</label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Recipient's email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Email subject"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Body:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Email body"
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send Email
          </button>
        </form>
        {status && <p className="mt-4 text-sm">{status}</p>}
      </main>
    </HydrateClient>
  );
}
