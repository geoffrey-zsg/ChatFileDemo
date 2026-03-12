'use client';

import { useState, useCallback } from 'react';
import { Message } from '@/lib/types';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      status: 'complete',
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsStreaming(true);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      status: 'streaming',
      citations: [],
    };

    setMessages((prev) => [...prev, assistantMessage]);

    // Mock streaming response
    await new Promise((resolve) => {
      const mockResponse = `根据文档描述，**CTRL_REG** 的复位值为 **0x00**[1]，位宽为 8-bit[2]。

该寄存器用于控制芯片的主工作模式，详细位域定义如下：
- Bit[7:4]: 保留（只读，默认0）
- Bit[3:0]: 工作模式选择[1]`;

      const mockCitations = [
        {
          id: 'c1',
          chunkId: 'chunk_001',
          pageNum: 37,
          title: 'Ch5 Register Map · CTRL_REG',
          content: 'CTRL_REG 复位值为 0x00...',
          score: 0.95,
        },
        {
          id: 'c2',
          chunkId: 'chunk_002',
          pageNum: 38,
          title: 'Ch5 Register Map · Bit Field Description',
          content: 'CTRL_REG 位宽为 8-bit...',
          score: 0.92,
        },
      ];

      let index = 0;
      const interval = setInterval(() => {
        if (index < mockResponse.length) {
          const chunk = mockResponse.slice(0, index + 1);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: chunk }
                : msg
            )
          );
          index++;
        } else {
          clearInterval(interval);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, status: 'complete', citations: mockCitations }
                : msg
            )
          );
          setIsStreaming(false);
          resolve(null);
        }
      }, 30);
    });
  }, []);

  const stopStreaming = useCallback(() => {
    setIsStreaming(false);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.status === 'streaming' ? { ...msg, status: 'complete' } : msg
      )
    );
  }, []);

  return { messages, isStreaming, sendMessage, stopStreaming };
}
