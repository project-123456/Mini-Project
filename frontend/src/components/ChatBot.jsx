
import { useState, useEffect, useRef } from "react";
import { predictEmotion } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [speakReplies, setSpeakReplies] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 🌿 I'm here to listen. You can type or speak to me. How are you feeling today?",
    },
  ]);

  const recognitionRef = useRef(null);
  const bottomRef = useRef(null);
  const messagesRef = useRef(messages);
  const busyRef = useRef(false);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Speak the AI answer aloud
  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = /[\u0900-\u097F]/.test(text)
      ? "hi-IN"
      : "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  // Send message to the backend AI route
  const getAIReply = async (text, history = []) => {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
        history,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "AI response nahi mil paya."
      );
    }

    if (!data.reply) {
      throw new Error("AI ne empty response diya.");
    }

    return data.reply;
  };

  // Send text or recognized speech to AI
  const addBotReply = async (text) => {
    const cleanText = text.trim();

    if (!cleanText || busyRef.current) return;

    busyRef.current = true;
    setLoading(true);

    const history = messagesRef.current
      .filter(
        (item) =>
          item.sender === "user" || item.sender === "bot"
      )
      .slice(-10)
      .map((item) => ({
        role: item.sender === "user" ? "user" : "assistant",
        content: item.text,
      }));

    const updatedMessages = [
      ...messagesRef.current,
      { sender: "user", text: cleanText },
    ];

    messagesRef.current = updatedMessages;
    setMessages(updatedMessages);

    try {
      const reply = await getAIReply(cleanText, history);

      const finalMessages = [
        ...messagesRef.current,
        { sender: "bot", text: reply },
      ];

      messagesRef.current = finalMessages;
      setMessages(finalMessages);

      if (speakReplies) {
        speak(reply);
      }
    } catch (error) {
      console.error("AI chatbot error:", error);

      const errorMessages = [
        ...messagesRef.current,
        {
          sender: "bot",
          text: `Sorry, AI response nahi mil paya. ${error.message} Backend, API key aur model check karo.`,
        },
      ];

      messagesRef.current = errorMessages;
      setMessages(errorMessages);
    } finally {
      busyRef.current = false;
      setLoading(false);
    }
  };

  // Send typed message
  const sendMessage = () => {
    const text = input.trim();

    if (!text || busyRef.current) return;

    setInput("");
    addBotReply(text);
  };

  // Microphone speech-to-text
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Voice input supported nahi hai. Google Chrome mein try karo ya message type karo.",
        },
      ]);
      return;
    }

    if (busyRef.current) return;

    window.speechSynthesis?.cancel();
    recognitionRef.current?.stop();

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setListening(false);
      setInput("");
      addBotReply(transcript);
    };

    recognition.onerror = (event) => {
      setListening(false);

      let message = "Voice recognize nahi hui. Dobara try karo.";

      if (event.error === "not-allowed") {
        message =
          "Microphone permission blocked hai. Browser settings mein microphone allow karo.";
      } else if (event.error === "no-speech") {
        message = "Awaaz sunai nahi di. Dobara clearly bolo.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: message },
      ]);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (error) {
      setListening(false);
      console.error("Microphone error:", error);
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  // Analyze uploaded audio with your existing emotion model
  const handleVoiceUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setVoiceLoading(true);

    try {
      const result = await predictEmotion(file);

      if (!result?.emotion) {
        throw new Error(
          result?.error || "Audio emotion detect nahi hui."
        );
      }

      const emotion = String(result.emotion);

      const userMessage =
        `Please help me understand my voice emotion analysis. ` +
        `The model detected: ${emotion}. ` +
        `Explain this result gently and suggest a helpful coping activity. ` +
        `Mention that voice emotion detection may be inaccurate.`;

      const reply = await getAIReply(userMessage, []);

      const finalMessages = [
        ...messagesRef.current,
        {
          sender: "user",
          text: `🎤 Uploaded audio: ${file.name} (Detected: ${emotion})`,
        },
        { sender: "bot", text: reply },
      ];

      messagesRef.current = finalMessages;
      setMessages(finalMessages);

      if (speakReplies) {
        speak(reply);
      }
    } catch (error) {
      console.error("Audio analysis error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            error.message ||
            "Audio analyze nahi ho paya. Voice AI service check karo.",
        },
      ]);
    } finally {
      setVoiceLoading(false);
      e.target.value = "";
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white shadow-lg"
          aria-label="Open chat"
        >
          💬
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between bg-emerald-600 px-4 py-3 text-white">
              <span className="font-semibold">
                MindJournal AI 🌿
              </span>

              <button
                onClick={() => {
                  stopListening();
                  window.speechSynthesis?.cancel();
                  setOpen(false);
                }}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between border-b px-3 py-2 text-xs">
              <span className="text-gray-600">
                AI text and voice support
              </span>

              <label className="flex cursor-pointer items-center gap-1">
                <input
                  type="checkbox"
                  checked={speakReplies}
                  onChange={(e) => {
                    setSpeakReplies(e.target.checked);

                    if (!e.target.checked) {
                      window.speechSynthesis?.cancel();
                    }
                  }}
                />
                🔊 Read answers
              </label>
            </div>

            <div
              className="flex h-72 flex-col gap-2 overflow-y-auto p-3"
              aria-live="polite"
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[88%] whitespace-pre-wrap break-words rounded-xl px-3 py-2 text-sm ${
                    message.sender === "user"
                      ? "ml-auto bg-emerald-100 text-right"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.text}

                  {message.sender === "bot" && (
                    <button
                      onClick={() => speak(message.text)}
                      className="ml-2 text-emerald-700"
                      title="Listen to answer"
                      aria-label="Listen to answer"
                    >
                      🔊
                    </button>
                  )}
                </motion.div>
              ))}

              {listening && (
                <p className="text-xs text-emerald-700">
                  🎙️ Listening... Please speak now.
                </p>
              )}

              {(loading || voiceLoading) && (
                <p className="text-xs text-gray-500">
                  🌿 Thinking... Please wait.
                </p>
              )}

              <div ref={bottomRef} />
            </div>

            <div className="flex items-center gap-1 border-t p-2">
              <button
                onClick={listening ? stopListening : startListening}
                disabled={loading || voiceLoading}
                className={`rounded-lg px-3 py-2 ${
                  listening
                    ? "bg-red-100 text-red-700"
                    : "bg-emerald-50 text-emerald-700"
                } disabled:opacity-50`}
                title={listening ? "Stop listening" : "Speak"}
                aria-label={listening ? "Stop listening" : "Speak"}
              >
                {listening ? "⏹️" : "🎤"}
              </button>

              <label
                className={`cursor-pointer rounded-lg bg-gray-100 px-2 py-2 ${
                  voiceLoading || loading
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                title="Upload audio for emotion detection"
              >
                📎
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  disabled={voiceLoading || loading}
                  onChange={handleVoiceUpload}
                />
              </label>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Type or speak..."
                disabled={loading || voiceLoading}
                className="min-w-0 flex-1 rounded-lg px-2 py-2 text-sm outline-none"
              />

              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading || voiceLoading}
                className="rounded-lg bg-emerald-600 px-3 py-2 text-white disabled:opacity-50"
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
