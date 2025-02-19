import { memo, useState, useCallback } from 'react';
import { sendMessage } from '@/lib/useChatApi';
import { CURRENT_USER_ID } from '@/constants';

const MessageInput = memo(({ conversationId, mutate }) => {
  const [text, setText] = useState('');

  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleSend = useCallback(async () => {
    if (text.trim() !== '') {
      const newMessage = {
        conversationId,
        userId: CURRENT_USER_ID,
        user: 'Alice',
        avatar: 'https://i.pravatar.cc/150?img=1',
        messageType: 'text',
        message: text,
        reactions: { like: 0, love: 0, laugh: 0 },
        timestamp: Date.now(),
      };

      try {
        await sendMessage(conversationId, newMessage, mutate);
        setText('');
      } catch (error) {
        console.error('發送訊息失敗', error);
      }
    }
  });

  return (
    <div className="mt-4 flex">
      <input
        type="text"
        value={text}
        placeholder="Say something..."
        onChange={handleChange}
        className={`
          flex-1 p-2 text-gray-600 bg-gray-100 outline-none box-border
          rounded-tl-lg rounded-bl-lg 
          border-[1px] border-blue-500 border-r-0 
          focus:bg-white focus:border-blue-500
          dark:bg-background dark:focus:bg-gray-900 dark:text-gray-100
        `}
      />
      <button
        onClick={handleSend}
        className={`
          px-4 bg-blue-500 text-white rounded-tr-lg rounded-br-lg
          hover:bg-blue-600 active:bg-blue-400
        `}
      >
        Send
      </button>
    </div>
  );
});

export default MessageInput;
