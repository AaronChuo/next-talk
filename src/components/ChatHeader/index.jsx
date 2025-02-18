import { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const ChatHeader = memo(({ title }) => {
  const router = useRouter();

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className={`
      sticky top-0 z-10 p-4 shadow-md backdrop-blur-sm
      dark:border-gray-700 dark:border-b-[1px]
      bg-gradient-to-b from-background to-white/70 dark:to-black/70
    `}>
      <div className="flex items-center mb-4">
        <button
          onClick={handleClickBack}
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          ⬅ Back
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
    </div>
  );
});

export default ChatHeader;
