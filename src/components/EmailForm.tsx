"use client";
import React, { useState } from "react";

interface EmailFormProps {
  summary: string;
}

const EmailForm = ({ summary }: EmailFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, summary }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Email sent successfully!");
      } else {
        setMessage("❌ " + data.error);
      }
    } catch (err) {
      setMessage("❌ Failed to send email.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSend} className="mt-6 w-2/3 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-bold mb-2">Send Summary via Email:</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border p-2 rounded w-full mb-3"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Email"}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
};

export default EmailForm;
