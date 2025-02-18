'use client';

import { memo, useCallback } from 'react';
import { useConversations } from '@/lib/useChatApi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { localizeTimeString } from '@/utils/datetime';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import ThemeToggle from '@/components/ThemeToggle';

const Home = memo(() => {
  const { conversations, isLoading, isError } = useConversations();
  const router = useRouter();

  const handleClickConversation = useCallback((event) => {
    const id = event.currentTarget.getAttribute('data-conversation-id');
    router.push(`/chat/${id}`);
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex justify-between">
        對話列表
        <ThemeToggle />
      </h1>
      {conversations.map((conv) => {
        const { id, participants, lastMessage, timestamp } = conv;
        const participant = participants[1];
        return (
          <div
            key={id}
            data-conversation-id={id}
            onClick={handleClickConversation}
            className={`
              flex items-center h-[60px] p-1 mb-5 bg-gray-100
              rounded-full cursor-pointer hover:bg-gray-200
              dark:bg-gray-900 dark:hover:bg-gray-800
            `}
          >
            <Image
              src={participant.avatar}
              alt={participant.user}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                {participant.user}
                <span className="text-xs ml-2 text-gray-400 dark:text-gray-600">
                  {localizeTimeString(timestamp)}
                </span>
              </p>
              <p
                className="text-sm text-gray-600 truncate dark:text-gray-400"
                aria-live="polite"
              >
                {lastMessage}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default Home;
