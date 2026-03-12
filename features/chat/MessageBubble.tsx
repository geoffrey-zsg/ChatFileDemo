'use client';

import { Message } from '@/lib/types';
import { ThumbsUp, ThumbsDown, Copy } from 'lucide-react';
import { CitationList } from './CitationList';
import { useState } from 'react';

interface MessageBubbleProps {
  message: Message;
  onCitationClick?: (pageNum: number) => void;
}

export function MessageBubble({ message, onCitationClick }: MessageBubbleProps) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [copied, setCopied] = useState(false);

  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-[rgb(var(--surface-elevated))] flex items-center justify-center text-[rgb(var(--accent))] text-sm font-semibold flex-shrink-0">
          AI
        </div>
      )}

      <div className={`max-w-[75%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`px-4 py-3 rounded-lg ${
            isUser
              ? 'bg-[rgb(var(--accent))] text-[rgb(var(--background))]'
              : 'bg-[rgb(var(--surface))] text-[rgb(var(--foreground))] border border-[rgb(var(--border))]'
          }`}
        >
          <div className="whitespace-pre-wrap text-[14px] leading-[1.7]">
            {message.content}
            {message.status === 'streaming' && (
              <span className="inline-block w-0.5 h-4 ml-1 bg-[rgb(var(--accent))] animate-pulse">▍</span>
            )}
          </div>

          {!isUser && message.status === 'complete' && message.citations && (
            <div className="mt-4">
              <CitationList
                citations={message.citations}
                onCitationClick={(citation) => onCitationClick?.(citation.pageNum)}
              />
            </div>
          )}

          {!isUser && message.status === 'complete' && (
            <div className="flex gap-1 mt-3 pt-3 border-t border-[rgb(var(--border))]">
              <button
                onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                className={`p-2.5 rounded hover:bg-[rgb(var(--surface-elevated))] transition-colors ${
                  feedback === 'up' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--foreground-muted))]'
                }`}
                title="有帮助"
                aria-label="标记为有帮助"
              >
                <ThumbsUp className="w-4 h-4" fill={feedback === 'up' ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                className={`p-2.5 rounded hover:bg-[rgb(var(--surface-elevated))] transition-colors ${
                  feedback === 'down' ? 'text-[rgb(var(--error))]' : 'text-[rgb(var(--foreground-muted))]'
                }`}
                title="没有帮助"
                aria-label="标记为没有帮助"
              >
                <ThumbsDown className="w-4 h-4" fill={feedback === 'down' ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={handleCopy}
                className="p-2.5 rounded hover:bg-[rgb(var(--surface-elevated))] transition-colors text-[rgb(var(--foreground-muted))]"
                title="复制"
                aria-label="复制消息内容"
              >
                <Copy className="w-4 h-4" />
              </button>
              {copied && (
                <span className="text-xs text-[rgb(var(--success))] self-center ml-1 animate-in fade-in">
                  已复制
                </span>
              )}
            </div>
          )}
        </div>

        <div className="text-xs text-[rgb(var(--foreground-muted))] mt-1.5 px-1">
          {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-[rgb(var(--surface-elevated))] flex items-center justify-center text-[rgb(var(--foreground))] text-sm font-semibold flex-shrink-0">
          U
        </div>
      )}
    </div>
  );
}
