"use client";
import React, { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState(""); // User input message
  const [chatHistory, setChatHistory] = useState<
    { sender: string; text: string }[]
  >([]); // Chat history
  const [summary, setSummary] = useState<any | null>(null); // Conversation summary
  const [error, setError] = useState<string | null>(null); // Error messages
  const [loading, setLoading] = useState(false); // Loading state
  const [endingConversation, setEndingConversation] = useState(false); // Ending conversation state

  const sendMessage = async () => {
    if (!message.trim()) return; // Avoid empty messages

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5101/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listing_id: 2, // Adjust if you want to make this dynamic
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message to the backend.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Update chat history with user's message and AI response
      setChatHistory((prev) => [
        ...prev,
        { sender: "user", text: message },
        { sender: "ai", text: data.response },
      ]);

      setMessage(""); // Clear input
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const endConversation = async () => {
    setEndingConversation(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5101/summary?listing=1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary from the backend.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Save the summary data
      setSummary(data);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setEndingConversation(false);
    }
  };

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h1 className="text-xl font-bold mb-4">Chat with Landlord AI</h1>

      {/* Chat History */}
      <div className="border border-white rounded p-4 mb-4 max-h-80 overflow-y-auto bg-black">
        {chatHistory.length === 0 ? (
          <p className="text-gray-400">No messages yet. Start the conversation!</p>
        ) : (
          chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded ${
                chat.sender === "user"
                  ? "bg-gray-800 text-white text-right"
                  : "bg-gray-600 text-white text-left"
              }`}
            >
              <strong>{chat.sender === "user" ? "You" : "AI"}:</strong> {chat.text}
            </div>
          ))
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* Input and Send Button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-white bg-black text-white rounded"
          disabled={loading || !!summary}
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white border border-white px-4 py-2 rounded hover:bg-gray-800"
          disabled={loading || !!summary}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* End Conversation Button */}
      <button
        onClick={endConversation}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        disabled={endingConversation}
      >
        {endingConversation ? "Ending Conversation..." : "End Conversation"}
      </button>

      {/* Summary Section */}
      {summary && (
        <div className="mt-4 p-4 border border-white rounded bg-gray-800 text-white">
          <h2 className="text-lg font-bold mb-2">Conversation Summary</h2>
          <p>
            <strong>Final Grade:</strong> {summary.feedback?.final_grade || "N/A"}
          </p>
          <p>
            <strong>Good Questions Asked:</strong>{" "}
            {(summary.feedback?.good_questions || []).join(", ") || "None"}
          </p>
          <p>
            <strong>Missed Questions:</strong>{" "}
            {(summary.feedback?.missed_questions || []).join(", ") || "None"}
          </p>
          <p>
            <strong>Red Flags:</strong>{" "}
            {(summary.feedback?.red_flags || []).join(", ") || "None"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Chat;