'use client';

import { useConversations } from "../lib/useChatApi";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { conversations, isLoading, isError } = useConversations();
  const router = useRouter();

  if (isLoading) return <p>載入中...</p>;
  if (isError) return <p>載入失敗</p>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">對話列表</h1>
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className="flex items-center p-3 bg-gray-100 rounded-lg mb-2 cursor-pointer hover:bg-gray-200"
          onClick={() => router.push(`/chat/${conv.id}`)}
        >
          <Image src={conv.participants[1].avatar} alt={conv.participants[1].user} width={40} height={40} className="rounded-full" />
          <div className="ml-3">
            <p className="font-semibold">{conv.participants[1].user}</p>
            <p className="text-sm text-gray-600">{conv.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
