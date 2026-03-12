'use client';

import { useChat } from './hooks/useChat';
import { MessageBubble } from './MessageBubble';
import { Send, Square } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ChatAreaProps {
  onCitationClick?: (pageNum: number) => void;
}

export function ChatArea({ onCitationClick }: ChatAreaProps) {
  const { messages, isStreaming, sendMessage, stopStreaming } = useChat();
  const [input, setInput] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;
    setShowWelcome(false);
    await sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
    setShowWelcome(false);
    sendMessage(question);
  };

  return (
    <div className="flex flex-col h-full bg-[rgb(var(--background))]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {showWelcome && messages.length === 0 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-[rgb(var(--surface))] p-5 rounded-lg border border-[rgb(var(--accent))]">
              <div className="text-xs text-[rgb(var(--foreground-muted))] uppercase tracking-wider mb-2">Document Summary</div>
              <div className="text-sm text-[rgb(var(--foreground))] leading-relaxed">
                XYZ 系列芯片 Datasheet · 128 页 · 12 章节<br/>
                涵盖引脚定义、寄存器映射、电气特性
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-[rgb(var(--foreground-muted))] uppercase tracking-wider">Quick Start</div>
              {[
                'CTRL_REG 的复位值是多少？',
                'VDD 的最大耐压范围？',
                '该芯片支持哪些通信接口？',
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuestionClick(q)}
                  className="w-full px-4 py-3 text-sm text-left bg-[rgb(var(--surface))] hover:bg-[rgb(var(--surface-elevated))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] transition-all text-[rgb(var(--foreground))] rounded"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} onCitationClick={onCitationClick} />
        ))}

        {isStreaming && (
          <div className="text-sm text-[rgb(var(--foreground-muted))]">正在生成回答...</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
        <div className="flex gap-2 items-end">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            placeholder="输入问题，开始与文档对话..."
            className="flex-1 px-4 py-3 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded focus:outline-none focus:border-[rgb(var(--accent))] disabled:opacity-50 disabled:cursor-not-allowed text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--foreground-muted))]"
          />
          <button
            onClick={isStreaming ? stopStreaming : handleSend}
            disabled={!input.trim() && !isStreaming}
            className={`px-6 py-3 rounded transition-all text-sm font-medium ${
              isStreaming
                ? 'bg-[rgb(var(--error))] hover:opacity-90 text-white'
                : input.trim()
                ? 'bg-[rgb(var(--accent))] hover:opacity-90 text-[rgb(var(--background))] active:scale-95'
                : 'bg-[rgb(var(--surface-elevated))] text-[rgb(var(--foreground-muted))] cursor-not-allowed'
            }`}
          >
            {isStreaming ? <Square className="w-5 h-5" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
