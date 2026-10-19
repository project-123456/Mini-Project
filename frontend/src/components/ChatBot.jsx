
import { useState } from "react";
import { predictEmotion } from "../utils/api";
import chatbotData from "../data/chatbotData";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I'm here to help you relax.",
    },
  ]);

  const [input, setInput] = useState("");
  const [voiceLoading, setVoiceLoading] = useState(false);

  // Generate chatbot reply
  const getBotReply = (text) => {
    const msg = text.toLowerCase();

    for (const item of chatbotData) {
      if (item.keywords.some((keyword) => msg.includes(keyword))) {
        return item.response;
      }
    }

    return "I'm listening 🌿 Tell me more.";
  };

  // Send text message
  const sendMessage = () => {
    const text = input.trim();

    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text },
      { sender: "bot", text: getBotReply(text) },
    ]);

    setInput("");
  };

  // Upload audio and detect emotion
  const handleVoiceUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setVoiceLoading(true);

    try {
      const result = await predictEmotion(file);

      if (result?.emotion) {
        const detectedEmotion = String(result.emotion);

        setMessages((prev) => [
          ...prev,
          {
            sender: "user",
            text: "🎤 I uploaded my voice.",
          },
          {
            sender: "bot",
            text: `🎤 Detected emotion: ${detectedEmotion}. ${getBotReply(
              detectedEmotion
            )}`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              result?.error ||
              "Emotion could not be detected. Please try another audio file.",
          },
        ]);
      }
    } catch (error) {
      console.error("Voice emotion error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Unable to analyze voice. Please check that the voice AI service is running.",
        },
      ]);
    } finally {
      setVoiceLoading(false);
      e.target.value = "";
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white shadow-lg"
          aria-label="Open chat"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-emerald-500 px-4 py-3 text-white">
              <span className="font-semibold">Relax Chat 🌱</span>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                ❌
              </button>
            </div>

            {/* Messages */}
            <div className="flex h-64 flex-col gap-2 overflow-y-auto p-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-xl px-3 py-2 text-sm ${
                    message.sender === "user"
                      ? "ml-auto bg-emerald-100 text-right"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.text}
                </motion.div>
              ))}

              {voiceLoading && (
                <p className="text-xs text-gray-500">
                  🎧 Analyzing your voice...
                </p>
              )}
            </div>

            {/* Voice Upload and Text Input */}
            <div className="flex items-center border-t">
              <label
                className={`cursor-pointer px-3 py-3 text-lg ${
                  voiceLoading ? "pointer-events-none opacity-50" : ""
                }`}
                title="Upload voice"
              >
                🎤
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  disabled={voiceLoading}
                  onChange={handleVoiceUpload}
                />
              </label>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Type here..."
                className="min-w-0 flex-1 px-2 py-3 text-sm outline-none"
              />

              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="bg-emerald-500 px-3 py-3 text-white disabled:opacity-50"
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
