"use client";

import { useState } from "react";
import { Send, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onUpload: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, onUpload, disabled, placeholder }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onUpload}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="上传文档"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder || "输入问题..."}
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          maxLength={2000}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          aria-label="发送"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
