import { useState } from "react";
import chatbotData from "../data/chatbotData";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I’m here to help you relax." }
  ]);
  const [input, setInput] = useState("");

  const getBotReply = (text) => {
    const msg = text.toLowerCase();

    for (let item of chatbotData) {
      if (item.keywords.some((k) => msg.includes(k))) {
        return item.response;
      }
    }
    return "I’m listening 🌿 Tell me more.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
      { sender: "bot", text: getBotReply(input) }
    ]);
    setInput("");
  };

  return (
    <>
      {/* 🔵 Floating Circle */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-emerald-500 text-white text-2xl shadow-lg z-50"
        >
          💬
        </button>
      )}

      {/* 💬 Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-emerald-500 text-white flex justify-between items-center px-4 py-3">
              <span className="font-semibold">Relax Chat 🌱</span>
              <button onClick={() => setOpen(false)}>❌</button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-3 space-y-2">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                    m.sender === "user"
                      ? "bg-emerald-100 ml-auto text-right"
                      : "bg-gray-100"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="flex border-t">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type here..."
                className="flex-1 px-3 py-2 text-sm outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-emerald-500 text-white px-4"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
