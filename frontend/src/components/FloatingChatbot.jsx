import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 Aaj aap kaisa feel kar rahe ho?" }
  ]);

  const messagesEndRef = useRef(null);

  // 🔽 Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🤖 Simple bot reply logic
  const getBotReply = (text) => {
    const t = text.toLowerCase();

    if (t.includes("sad") || t.includes("dukhi")) {
      return "Mujhe afsos hai 😔 aap aisa feel kar rahe ho. Thoda likhna help karega 💚";
    }
    if (t.includes("happy") || t.includes("khush")) {
      return "Yeh sunkar acha laga 😊 isi feeling ko journal me likho ✨";
    }
    if (t.includes("stress")) {
      return "Thoda deep breath lo 🌿 sab theek hoga.";
    }
    return "Main samajh raha hoon 🤍 thoda aur batao.";
  };

  // 📤 Send message
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // bot reply delay
    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: getBotReply(input)
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  return (
    <>
      {/* 🟢 Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-xl z-50"
      >
        <FaRobot />
      </button>

      {/* 💬 Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col z-50">
          
          {/* Header */}
          <div className="p-3 bg-green-600 text-white font-semibold rounded-t-xl">
            Journal Chatbot 🤖
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[75%] px-3 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "ml-auto bg-green-500 text-white"
                    : "mr-auto bg-green-100 text-green-900"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 flex gap-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type here..."
              className="flex-1 border rounded-lg px-3 py-1 text-sm outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-green-600 text-white px-3 rounded-lg"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
