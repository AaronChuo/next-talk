import { memo, useCallback } from 'react';
import { useMessages, updateReactions } from '@/lib/useChatApi';
import { REACTIONS } from '@/constants';

const MessageReactions = memo(({message, isHover = false }) => {
  const { mutate } = useMessages(message.conversationId);

  const handleReactionClick = useCallback(async (event) => {
    const reaction = event.currentTarget.getAttribute('data-reaction');
    try {
      await updateReactions(message.id, { reaction }, mutate);
    } catch (error) {
      console.error('Failed to update reaction', error);
    }
  }, [message.id, mutate]);

  return (
    <div className="flex justify-end min-w-40">
      {Object.entries(REACTIONS).map(([key, emoji]) => {
        const count = message.reactions[key] || 0;
        const isReacted = message.reactions[key] > 0;
        return (
          <button
            key={key}
            data-reaction={key}
            onClick={handleReactionClick}
            className={`
              flex items-right rounded-md hover:scale-110
              ${isReacted
                ? 'opacity-100'
                : isHover
                ? 'opacity-80 grayscale hover:grayscale-0 hover:opacity-100'
                : 'opacity-0 w-0'
              }
            `}
          >
            <span className={`text-xs text-gray-400 ml-[3px] pl-[5px] h-4 ${isReacted || isHover ? 'w-auto' : 'w-0'}`}>
              {emoji} {count}
            </span>
          </button>
        );
      })}
    </div>
  );
});

export default MessageReactions;
