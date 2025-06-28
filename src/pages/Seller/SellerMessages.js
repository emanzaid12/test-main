import React, { useState, useEffect, useRef } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // دالة لتحريك التمرير لأسفل تلقائياً عند وصول رسالة جديدة
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // دالة إرسال رسالة جديدة (هنا مجرد محاكاة، أضف الكود الخاص بالاتصال بالAPI هنا)
  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      senderId: "seller", // ممكن تعدل حسب الحاجة
      message: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  // عند الضغط على Enter في الحقل لإرسال الرسالة
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-center text-2xl font-bold text-[#800000] mb-6">
          Messages
        </h1>

        {/* Messages Container */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {/* Messages Area */}
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
                      msg.senderId === "seller"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md transform transition duration-200 hover:scale-105 ${
                        msg.senderId === "seller"
                          ? "bg-[#800000] text-white rounded-br-sm"
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                      <div
                        className={`text-xs mt-2 ${
                          msg.senderId === "seller"
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

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex items-center space-x-3">
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
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                  input.trim()
                    ? "bg-[#800000] text-white hover:bg-[#600000] shadow-lg"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Stats or Info Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-[#800000]">
              {messages.length}
            </div>
            <div className="text-gray-600 text-sm">Total Messages</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-green-600">Online</div>
            <div className="text-gray-600 text-sm">Connection Status</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">
              {messages.filter((m) => m.senderId === "seller").length}
            </div>
            <div className="text-gray-600 text-sm">My Messages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
