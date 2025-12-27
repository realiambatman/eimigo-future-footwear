import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, Bot, User } from "lucide-react";
import { getStylistRecommendation } from "../services/geminiService";
import { Product, ChatMessage } from "../types";

interface AIStylistProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: Product[];
  onViewProduct: (productId: string) => void;
}

export const AIStylist: React.FC<AIStylistProps> = ({
  isOpen,
  onClose,
  inventory,
  onViewProduct,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hi! I'm your Assistant. Ask me anything about Eimigo, our products, or get style advice.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const { recommendationText, recommendedProductId } =
      await getStylistRecommendation(userMsg.text, inventory);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "model",
      text: recommendationText,
      recommendedProductId,
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-end sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto pointer-events-none">
      <div
        className="pointer-events-auto w-full h-full sm:h-auto sm:w-96 flex flex-col shadow-2xl animate-fade-in-up bg-brand-base sm:rounded-xl border border-brand-surfaceHighlight overflow-hidden sm:max-h-[600px]"
        style={{ pointerEvents: "auto" }}
      >
        <div className="bg-brand-text text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-accent animate-pulse" />
            <h3 className="font-bold tracking-wide">ASSISTANT</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-surface sm:h-96">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                  msg.role === "user"
                    ? "bg-brand-text text-white rounded-tr-none"
                    : "bg-white text-brand-text border border-brand-surfaceHighlight rounded-tl-none"
                }`}
              >
                <div className="flex items-center gap-2 mb-1 opacity-70 text-xs font-bold uppercase">
                  {msg.role === "user" ? (
                    <User className="w-3 h-3" />
                  ) : (
                    <Bot className="w-3 h-3 text-brand-text" />
                  )}
                  {msg.role === "user" ? "You" : "Assistant"}
                </div>
                <p className="text-sm leading-relaxed">{msg.text}</p>

                {msg.recommendedProductId && (
                  <button
                    onClick={() => {
                      onViewProduct(msg.recommendedProductId!);
                      onClose();
                    }}
                    className="mt-3 w-full bg-brand-accent text-black font-bold text-xs py-2 rounded hover:bg-brand-accentHover transition-colors border border-black/10"
                  >
                    View Recommended Shoe
                  </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-brand-surfaceHighlight rounded-2xl rounded-tl-none p-4 flex gap-1">
                <div
                  className="w-2 h-2 bg-brand-text rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 bg-brand-text rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 bg-brand-text rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 bg-brand-base border-t border-brand-surfaceHighlight flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your style request..."
            className="flex-1 bg-brand-surface border border-brand-surfaceHighlight rounded-lg px-4 py-2 text-sm text-brand-text focus:outline-none focus:border-brand-text focus:ring-1 focus:ring-brand-text transition-all placeholder:text-brand-textMuted"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-brand-text text-white p-2 rounded-lg hover:bg-brand-accent hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
