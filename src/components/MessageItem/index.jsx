import { memo, useState, useCallback } from 'react';
import LazyImage from '@/components/LazyImage';
import MessageReactions from '@/components/MessageReactions';
import { localizeTimeString } from '@/utils/datetime';
import {
  CURRENT_USER_ID,
  MESSAGE_TYPE_TEXT,
  MESSAGE_TYPE_IMAGE,
  MESSAGE_TYPE_SYSTEM,
} from '@/constants';

const MessageItem = memo(({ msg }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseOver = useCallback(() => setIsHover(true), []);
  const handleMouseOut = useCallback(() => setIsHover(false), []);

  const isSelf = msg.userId === CURRENT_USER_ID;
  const messageBubbleClass = isSelf
    ? 'before:right-16 before:border-l-8 before:border-l-gray-100 flex-row-reverse dark:before:border-l-gray-900'
    : 'before:left-16 before:border-r-8 before:border-r-gray-100 dark:before:border-r-gray-900';

  return (
    <div
      className={`
        flex items-start mb-6 relative
        before:absolute
        before:top-6 
        before:w-0 before:h-0 
        before:border-t-8 before:border-t-transparent 
        before:border-b-8 before:border-b-transparent 
        ${messageBubbleClass}
      `}
    >
      <LazyImage
        src={msg.avatar || ''}
        alt={msg.user}
        width={60}
        height={60}
        className="rounded-full"
        unoptimized
      />
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="bg-gray-100 p-2 ml-3 mr-3 rounded-lg dark:bg-gray-900"
      >
        <p className="font-semibold text-gray-700 dark:text-gray-200">{msg.user}</p>
        {msg.messageType === MESSAGE_TYPE_TEXT &&
          <p className="text-sm text-gray-600 dark:text-gray-300">{msg.message}</p>
        }
        {msg.messageType === MESSAGE_TYPE_SYSTEM &&
          <p className="text-sm text-teal-600 dark:text-gray-300">{msg.message}</p>
        }
        {msg.messageType === MESSAGE_TYPE_IMAGE &&
          <LazyImage
            src={msg.message || ''}
            alt="sent image"
            width={200}
            height={150}
            unoptimized
          />
        }
        <div className="flex justify-between items-center text-xs text-gray-400 mt-3 dark:text-gray-500">
          <span>{localizeTimeString(msg.timestamp)}</span>
          <MessageReactions message={msg} isHover={isHover} />
        </div>
      </div>
    </div>
  );
});

export default MessageItem;
