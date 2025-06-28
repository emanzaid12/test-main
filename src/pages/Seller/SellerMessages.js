import React, { useState, useEffect, useRef } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // استخرج sellerId من التوكن في localStorage
  const getSellerIdFromToken = () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  };
  const sellerId = getSellerIdFromToken();

  // إرسال لAPI (POST)
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch(
        "https://shopyapi.runasp.net/api/Chat/send-to-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // ضروري تبقى JSON
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input), // ✅ فقط النص بدون كائن
        }
      );

      const result = await res.text();
      console.log("Response status:", res.status);
      console.log("Response body:", result);

      if (res.ok) {
        setInput(""); // امسح الرسالة بعد الإرسال
        viewAllMessages(); // جلب الرسائل من جديد
      } else {
        console.error("Failed to send message");
      }
    } catch (err) {
      console.error("Error sending:", err);
    }
  };

  // جلب كل الرسائل من API
  const viewAllMessages = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(
        "https://shopyapi.runasp.net/api/Chat/admin-seller-conversation",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-2xl font-bold text-[#800000] mb-6">
          Messages
        </h1>

        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="h-96 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-gray-400 text-4xl mb-2">💬</div>
                  <p className="text-gray-500 text-lg">No messages yet</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Start a new conversation
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId.toString() === sellerId.toString()
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md transform transition duration-200 hover:scale-105 ${
                        msg.senderId.toString() === sellerId.toString()
                          ? "bg-[#800000] text-white rounded-br-sm"
                          : "bg-white text-gray-800 border-gray-200 rounded-bl-sm border"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                      <div
                        className={`text-xs mt-2 ${
                          msg.senderId.toString() === sellerId.toString()
                            ? "text-gray-200"
                            : "text-gray-500"
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex flex-col items-center space-y-3">
              <div className="flex items-center w-full space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 focus:border-[#800000] focus:ring-2 focus:ring-[#800000] focus:ring-opacity-20 outline-none transition-all duration-200"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    ✏️
                  </div>
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className={`px-6 py-3 rounded-full font-medium transition duration-200 transform hover:scale-105 ${
                    input.trim()
                      ? "bg-[#800000] text-white hover:bg-[#600000] shadow-lg"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Send
                </button>
              </div>

              <button
                onClick={viewAllMessages}
                className="mt-2 px-4 py-2 bg-[#800000] text-white rounded-full hover:bg-[#600000] transition"
              >
                View All Messages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
