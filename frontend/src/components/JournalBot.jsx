import { useState } from "react";

export default function JournalBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 🌿 Aaj aap kaisa feel kar rahe ho?" },
  ]);
  const [input, setInput] = useState("");


  const getBotReply = (text) => {
  const t = text.toLowerCase();

  // 🚨 VERY SERIOUS
  if (
    t.includes("suicide") ||
    t.includes("suicidal") ||
    t.includes("marna") ||
    t.includes("self harm")
  ) {
    return (
      "Mujhe afsos hai ki aap aisa mehsoos kar rahe ho 💔\n\n" +
      "Aap akela nahi ho 🙏\n" +
      "🇮🇳 AASRA Helpline: 91-9820466726\n" +
      "Ya kisi trusted person se turant baat karo.\n" +
      "Aapki zindagi bahut keemti hai 💚"
    );
  }

  // 😔 NEGATIVE / LOW MOOD
  if (
    t.includes("sad") ||
    t.includes("dukhi") ||
    t.includes("depressed") ||
    t.includes("stress")
  ) {
    return (
      "Samajh raha hoon 😔\n\n" +
      "Chhota sa suggestion:\n" +
      "• 3 deep breaths lo 🌿\n" +
      "• Jo feel ho raha hai likho ✍️\n" +
      "• Ek chhoti achhi cheez karo ☕"
    );
  }

  // 😊 POSITIVE
  if (
    t.includes("happy") ||
    t.includes("khush") ||
    t.includes("accha")
  ) {
    return (
      "Yeh sun kar achha laga 😊\n" +
      "Aaj kis cheez ne aapko khush kiya?"
    );
  }

  // 🤍 DEFAULT
  return "Main sun raha hoon 💚 Thoda aur likho…";
};

const handleSend = () => {
  if (!input.trim()) return;

  const userMsg = { sender: "user", text: input };
  const botMsg = { sender: "bot", text: getBotReply(input) };

  setMessages([...messages, userMsg, botMsg]);
  setInput("");
};



  
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f7f6f2]">
      <div className="bg-white w-full max-w-md p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-green-700 mb-3 text-center">
          Journal Chatbot 🤖
        </h2>

        {/* Messages */}
        <div className="h-64 overflow-y-auto mb-3 space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg text-sm max-w-[80%] ${
                m.sender === "bot"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800 ml-auto text-right"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Apna mann likho..."
            className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-green-600 text-white px-3 rounded text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
