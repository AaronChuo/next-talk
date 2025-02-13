'use client';

import { use } from "react";
import { useMessages } from "../../../lib/useChatApi";
import Image from "next/image";
import MessageInput from "../../../components/MessageInput";

export default function ChatRoom({ params }) {
  const { id } = use(params);
  const { messages, isLoading, isError, mutate } = useMessages(id);

  console.log(messages);

  if (isLoading || !id) return <p>載入中...</p>;
  if (isError) return <p>載入失敗</p>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">聊天室</h1>
      <div className="space-y-2">
        {messages.map((msg) => (
          <div key={msg.timestamp} className="flex items-start space-x-3">
            <Image
              src={msg.avatar || ""}
              alt={msg.user}
              width={40}
              height={40}
              className="rounded-full"
              unoptimized
            />
            <div className="bg-gray-100 p-2 rounded-lg">
              <p className="font-semibold">{msg.user}</p>
              {msg.messageType === "text" && (
                <p>{msg.message}</p>
              )}
              {msg.messageType === "system" && (
                <p className="text-sm text-gray-600">{msg.message}</p>
              )}
              {msg.messageType === "image" && (
                <Image
                  src={msg.message || ""}
                  alt="sent image"
                  width={200}
                  height={150}
                  unoptimized
                />
              )}
              <p className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
      </div>
      <MessageInput conversationId={id} mutate={mutate} />
    </div>
  );
}
