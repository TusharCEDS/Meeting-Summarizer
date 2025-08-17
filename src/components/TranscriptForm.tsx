"use client";
import React, { useState } from "react";
import Summary from "./Summary";
import EmailForm from "./EmailForm";
const TranscriptForm = () => {
  const [text, setText] = useState(""); // user input
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(""); // API result
  const [error, setError] = useState(""); // error message

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Please paste a transcript first.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text }),
      });

      if (!res.ok) {
        throw new Error("Failed to summarize transcript. Try again!");
      }

      const data = await res.json();
      setSummary(data.summary); // 👈 assuming API returns { summary: "..."}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-10">
      <textarea
        className="w-2/3 h-40 p-4 border rounded-lg mb-4"
        placeholder="Paste your meeting transcript here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSummarize}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {/* Error message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Show result */}
      <Summary summary={summary} />
      <EmailForm summary={summary} />



    </section>
  );
};

export default TranscriptForm;
