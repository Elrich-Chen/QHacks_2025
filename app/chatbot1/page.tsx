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
      const response = await fetch("http://localhost:5101/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listing_id: 1, // Adjust if you want to make this dynamic
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
    <div className="w-full h-[770px] relative bg-white overflow-hidden">
      {/* Border */}
      <div className="w-full h-[0px] top-[92.49px] absolute border border-[#c7c5c5]"></div>

      {/* User Avatar */}
      <div className="w-[72px] h-[72px] left-[30px] top-[10px] absolute bg-[#d9d9d9] rounded-full"></div>

      {/* User Name */}
      <div className="left-[118px] top-[38px] absolute text-black text-2xl font-bold font-['Inter']">John Doe</div>

      {/* Chat History - Scrollable container */}
      <div
        ref={chatContainerRef}
        className="w-full h-[510px] overflow-y-scroll scrollbar-hidden absolute top-[130px] left-0 p-4 bg-white rounded-b-[16px]"
      >
        {chatHistory.length === 0 ? (
          <div className="w-full text-center text-gray-400">No messages yet. Start the conversation!</div>
        ) : (
          chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`mb-4 ${chat.sender === "user" ? "flex justify-end" : "flex justify-start"}`}
            >
              {chat.sender === "user" ? (
                <div className="relative max-w-[40%]">
                  <div className="bg-[#0866ff] text-white rounded-[20px] px-6 py-3 pt-5 pb-5">
                    <div className="text-[20px] font-medium font-['Inter']">{chat.text}</div>
                  </div>
                  <div className="text-right text-[13px] font-bold text-black mt-1 mr-[10px]">{chat.time}</div> {/* Timestamp 10px from the right */}
                </div>
              ) : (
                <div className="relative max-w-[40%]">
                  {chat.text === "AI is typing..." ? (
                    <div className="bg-[#d9d9d9] text-black rounded-[25px] px-6 py-3 pt-5 pb-5 flex justify-center items-center">
                      <span className="dot-animation">.</span>
                      <span className="dot-animation">.</span>
                      <span className="dot-animation">.</span>
                    </div>
                  ) : (
                    <div className="bg-[#d9d9d9] text-black rounded-[25px] px-6 py-3 pt-5 pb-5">
                      <div className="text-[20px] font-medium font-['Inter']">{chat.text}</div>
                    </div>
                  )}
                  <div className="text-left text-[13px] font-bold text-black mt-1 ml-[10px]">{chat.time}</div> {/* Timestamp 10px from the left */}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input Box */}
      <div className="w-full h-[70px] absolute top-[660px] left-1/2 transform -translate-x-1/2">
        <div className="w-[800px] h-full bg-[#d9d9d9] rounded-[56.29px] flex items-center justify-between px-6 mx-auto">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border-none bg-transparent text-black text-[20px] rounded outline-none"
            disabled={loading || !!summary}
            onKeyDown={handleKeyDown} // Handle Enter key press
          />
        </div>
      </div>

      {/* End Conversation Button */}
      <button
        onClick={endConversation}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 absolute top-[36px] right-[30px]"
        disabled={endingConversation}
      >
        {endingConversation ? "Ending Conversation..." : "End Conversation"}
      </button>

      {/* Error Handling */}
      {error && (
        <div className="absolute top-[100px] left-[50%] transform -translate-x-[50%] bg-red-500 text-white p-4 rounded">
          {error}
        </div>
      )}

      {/* Conversation Summary */}
      {summary && (
        <div className="absolute top-[100px] left-[50%] transform -translate-x-[50%] bg-blue-500 text-white p-4 rounded w-1/2">
          <h3>Conversation Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
