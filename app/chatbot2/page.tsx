"use client";
import React, { useState, useRef, useEffect } from "react";

// Helper function to format the time
const getFormattedTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12; // Convert hour to 12-hour format
  const formattedTime = `${hour12}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
  return formattedTime;
};

type SummaryFeedback = {
  good_questions: string[];
  missed_questions: string[];
  red_flags: string[];
  final_grade: string;
};

const Chat = () => {
  const [message, setMessage] = useState(""); // User input message
  const [chatHistory, setChatHistory] = useState<{ sender: string; text: string; time: string }[]>([]); // Chat history with timestamps
  const [summary, setSummary] = useState<any | null>(null); // Conversation summary
  const [error, setError] = useState<string | null>(null); // Error messages
  const [loading, setLoading] = useState(false); // Loading state
  const [endingConversation, setEndingConversation] = useState(false); // Ending conversation state
  const [isProcessing, setIsProcessing] = useState(false); // AI processing state
  const chatContainerRef = useRef<HTMLDivElement>(null); // Reference to the chat container for auto-scrolling

  const sendMessage = async () => {
    if (!message.trim()) return; // Avoid empty messages

    const timestamp = getFormattedTime(); // Get the current time

    setLoading(true);
    setIsProcessing(true); // Show processing animation
    setError(null);

    // Add user message to chat history
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", text: message.trim(), time: timestamp },
    ]);

    setMessage(""); // Clear input

    // Add a temporary "AI typing..." message
    setChatHistory((prev) => [
      ...prev,
      { sender: "ai", text: "AI is typing...", time: getFormattedTime() },
    ]);

    try {
      const response = await fetch("http://127.0.0.1:5102/chat?listing=2", {
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

      // Replace the "AI typing..." with the actual AI response
      setChatHistory((prev) => [
        ...prev.slice(0, prev.length - 1), // Remove the "AI typing..." message
        { sender: "ai", text: data.response, time: getFormattedTime() },
      ]);

      setIsProcessing(false); // Hide processing animation once AI response is ready
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
      setIsProcessing(false); // Hide processing animation in case of error
    } finally {
      setLoading(false);
    }
  };
  
    // Function to call the summary API
    const endConversation = async () => {
      setEndingConversation(true);
      setError(null);
    
      try {
        const response = await fetch("http://127.0.0.1:5102/chat?listing=2", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch summary from the backend.");
        }
    
        const data = await response.json();
    
        if (data.error) {
          throw new Error(data.error);
        }
          // Log just the feedback to verify its structure
      console.log("Feedback:", data.feedback); 

        // Extract the feedback part of the response
        setSummary(data.feedback);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setEndingConversation(false);
      }
    };

  useEffect(() => {
    // Auto scroll to the bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior (e.g., newline)
      sendMessage(); // Send the message
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
  {/* Main Chat Section */}
  <div className="flex-1 flex flex-col items-center">
    {/* Header */}
    <div className="w-full max-w-lg flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div> {/* User Avatar */}
        <h1 className="text-lg font-semibold text-black">John Doe</h1>
      </div>
      <div className="flex items-center gap-4 text-purple-600">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 4.5l10.5 7.5-10.5 7.5V4.5z"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 6.75L6.75 17.25M6.75 6.75l10.5 10.5"
            />
          </svg>
        </button>
      </div>
    </div>

    {/* Chat History */}
    <div className="w-full max-w-lg flex-1 p-4 overflow-y-auto bg-gray-100 border border-gray-300 rounded-lg mt-4">
      {chatHistory.length === 0 ? (
        <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
      ) : (
        chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              chat.sender === "user"
                ? "bg-blue-100 text-blue-900 text-right"
                : "bg-gray-200 text-gray-900 text-left"
            }`}
          >
            <strong>{chat.sender === "user" ? "You" : "AI"}:</strong> {chat.text}
          </div>
        ))
      )}
    </div>

    {/* Error Message */}
    {error && <p className="text-red-500 mt-4">{error}</p>}

    {/* Input and Send Button */}
    <div className="w-full max-w-lg flex gap-4 mt-4 items-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        disabled={loading || !!summary}
      />
      <button
        onClick={sendMessage}
        className="px-6 py-2 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition duration-200 disabled:bg-gray-300"
        disabled={loading || !!summary}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>

    {/* End Conversation Button */}
    <button
      onClick={endConversation}
      className="mt-4 px-6 py-2 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition duration-200 disabled:bg-gray-300"
      disabled={endingConversation}
    >
      {endingConversation ? "Ending Conversation..." : "End Conversation"}
    </button>
  </div>

  {/* Sidebar Summary Section */}
  {summary && (
    <div className="w-96 bg-gray-50 border-l border-gray-300 p-6 flex flex-col shadow-md">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Conversation Summary</h2>
      <div className="mb-4">
        <p className="font-semibold">Final Grade:</p>
        <p className="text-gray-700">{summary.feedback?.final_grade || "N/A"}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Good Questions Asked:</p>
        <ul className="list-disc pl-4 text-gray-700">
          {(summary.feedback?.good_questions || []).map((question, index) => (
            <li key={index}>{question}</li>
          )) || <p>None</p>}
        </ul>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Missed Questions:</p>
        <ul className="list-disc pl-4 text-gray-700">
          {(summary.feedback?.missed_questions || []).map((question, index) => (
            <li key={index}>{question}</li>
          )) || <p>None</p>}
        </ul>
      </div>
      <div>
        <p className="font-semibold">Red Flags:</p>
        <ul className="list-disc pl-4 text-gray-700">
          {(summary.feedback?.red_flags || []).map((flag, index) => (
            <li key={index}>{flag}</li>
          )) || <p>None</p>}
        </ul>
      </div>
    </div>
  )}
</div>

  );
};

export default Chat;