import {
  ChatMessage,
  type ChatMessageProps,
  type Message,
} from '@/components/ui/chat-message';
import { TypingIndicator } from '@/components/ui/typing-indicator';

type AdditionalMessageOptions = Omit<ChatMessageProps, keyof Message>;

interface MessageListProps {
  messages: Message[];
  showTimeStamps?: boolean;
  isTyping?: boolean;
  messageOptions?:
    | AdditionalMessageOptions
    | ((message: Message) => AdditionalMessageOptions);
}

export function MessageList({
  messages,
  showTimeStamps = true,
  isTyping = false,
  messageOptions,
}: MessageListProps) {
  return (
    <div
      className="h-[600px] space-y-4 overflow-y-auto"
      // style={{ marginBottom: '100px' }}
    >
      {messages.map((message, index) => {
        const additionalOptions =
          typeof messageOptions === 'function'
            ? messageOptions(message)
            : messageOptions;

        return (
          <ChatMessage
            key={index}
            showTimeStamp={showTimeStamps}
            {...message}
            {...additionalOptions}
          />
        );
      })}
      {isTyping && <TypingIndicator />}
    </div>
  );
}
