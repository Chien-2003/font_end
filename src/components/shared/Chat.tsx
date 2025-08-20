'use client';

import type { Message } from '@/components/ui/chat-message';
import { useState } from 'react';
import { MessageInput } from '../ui/message-input';
import { MessageList } from '../ui/message-list';

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleSend(value: string) {
    if (!value.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: value,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Đây là phản hồi giả lập từ bot.',
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsGenerating(false);
    }, 1500);
  }

  return (
    <div className="relative">
      <div className="flex flex-col h-[600px] justify-end float-right border rounded-md dark:bg-gray-900 z-50 w-[500px] absolute bottom-5 right-9">
        <MessageList messages={messages} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
        >
          <MessageInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            isGenerating={isGenerating}
            stop={() => {
              setIsGenerating(false);
            }}
            transcribeAudio={async (blob) => {
              return 'Nội dung giọng nói chuyển thành text';
            }}
          />
        </form>
      </div>
    </div>
  );
}
