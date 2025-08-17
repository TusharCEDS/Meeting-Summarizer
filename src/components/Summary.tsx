"use client";
import React from "react";

interface SummaryProps {
  summary: string;
}

const Summary = ({ summary }: SummaryProps) => {
  if (!summary) return null;

  return (
    <div className="mt-6 w-2/3 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-bold mb-2">Summary:</h3>
      <p className="whitespace-pre-line">{summary}</p>
    </div>
  );
};

export default Summary;
