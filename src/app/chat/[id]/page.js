'use client';

import { use, useLayoutEffect, useRef } from 'react';
import { useMessages } from '@/lib/useChatApi';
import MessageInput from '@/components/MessageInput';
import MessageItem from '@/components/MessageItem';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import ChatHeader from '@/components/ChatHeader';

const ChatRoom = ({ params }) => {
  const { id } = use(params);
  const { messages, isLoading, isError, mutate } = useMessages(id);
  const messagesEndRef = useRef(null);
  const prevMessagesLength = useRef(0);

  // Scroll to the latest message when new messages arrive
  useLayoutEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  if (isLoading || !id) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="p-0 max-w-lg mx-auto">
      <ChatHeader title="聊天室" />
      <div className="flex-1 overflow-y-auto px-2 mt-6">
        {messages.map((msg) => (
          <MessageItem key={msg.id} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={`
        sticky bottom-0 z-10 p-4 shadow-md backdrop-blur-sm
        bg-gradient-to-t from-background to-white/70 dark:to-black/70
        dark:border-gray-700 dark:border-t-[1px]
      `}>
        <MessageInput conversationId={id} mutate={mutate} />
      </div>
    </div>
  );
}

export default ChatRoom;
