import React, { useState } from "react";
import { monasteryQA } from "../data/monasteryQA";

export default function MonasteryChatbot() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]); // { type: "user" | "bot", text: string }

  const handleAsk = () => {
    if (!query.trim()) return;

    const userMessage = { type: "user", text: query };
    const lowerQuery = query.toLowerCase();

    const matched = monasteryQA.find((q) =>
      q.keywords.some((kw) => lowerQuery.includes(kw))
    );

    const botMessage = {
      type: "bot",
      text: matched ? matched.answer : "Sorry, I don't know the answer.",
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setQuery(""); // clear input
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Ask about Monasteries</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-4 rounded flex flex-col gap-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.type === "user" ? "bg-indigo-100 self-end" : "bg-gray-100 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
        />
        <button
          onClick={handleAsk}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
