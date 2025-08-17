import React from "react";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 ">
      <h1 className="text-4xl font-bold mb-4">AI Meeting Summarizer</h1>
      <p className="text-lg text-gray-600 mb-6">
        Paste your meeting transcript and get instant, concise summaries powered
        by AI.
      </p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Get Started
      </button>
    </section>
  );
}
