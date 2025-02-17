import { memo } from 'react';
import { REACTIONS } from '@/constants';

const MessageReactions = memo(({ message }) => {
  return (
    <div className="flex justify-end min-w-40">
      {Object.entries(REACTIONS).map(([key, emoji]) => {
        const count = message.reactions[key] || 0;
        return (
          <span
            key={key}
            className={`
              text-xs text-gray-400 ml-[3px] pl-[5px] h-4 
            `}
          >
            {emoji} {count}
          </span>
        );
      })}
    </div>
  );
});

export default MessageReactions;
