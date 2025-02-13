import { useState } from "react";
import { sendMessage } from "../../lib/useChatApi";

export default function MessageInput({ conversationId, mutate }) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (text.trim() !== "") {
      const newMessage = {
        conversationId,
        userId: 1,
        user: "Alice",
        avatar: "https://i.pravatar.cc/150?img=1",
        messageType: "text",
        message: text,
        reactions: { like: 0, love: 0, laugh: 0 },
        timestamp: Date.now(),
      };

      try {
        await sendMessage(conversationId, newMessage, mutate);
        setText("");
      } catch (error) {
        console.error("發送訊息失敗", error);
      }
    }
  };

  return (
    <div className="mt-4 flex">
      <input
        type="text"
        className="flex-1 p-2 border"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="輸入訊息..."
      />
      <button className="ml-2 px-4 bg-blue-500 text-white" onClick={handleSend}>
        發送
      </button>
    </div>
  );
}
