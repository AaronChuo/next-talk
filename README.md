# NextTalk 🛈

NextTalk 是一個 **多人即時聊天室**，使用 **Next.js + SWR + json-server**，支援 **對話列表、聊天室內容、訊息發送**。

---

## 🚀 功能特色
- **對話列表**：顯示所有對話，點擊即可進入聊天室
- **即時聊天**：支援文字訊息、圖片、系統通知
- **訊息反應**：可對訊息按 **like/love/laugh**
- **支援深色模式**：依系統設定自動切換

---

## 📦 技術採用
- **Next.js**
- **React Hooks**：useState / useEffect / useLayoutEffect / useCallback / useRef
- **SWR**：高效能快取與自動更新資料
- **json-server**：模擬後端API / 模擬網路延遲
- **Tailwind CSS**：UI / 動態效果 / 深色模式

---

## 🛠️ 安裝與執行
### 1. **安裝**
```bash
git clone https://github.com/AaronChuo/next-talk.git
cd next-talk
pnpm install
```

### 2. **啟動 Mock Server**
```bash
pnpm mock
```
Server API 將啟動於 **http://localhost:3001**

### 3. **啟動 Next.js**
```bash
pnpm dev
```
App 將啟動於 **http://localhost:3000**

---

## 🔐 API 文件
取得所有聊天室
```
GET /conversations
```
取得指定聊天室的所有訊息
```
GET /messages?conversationId=1
```
發送訊息
```
POST /conversations/:id/messages/create
```
對指定的訊息發送反應（Emoji）
```
PATCH /messages/:id/reactions
```
---

## 🗃️ 專案結構
```
NextTalk/
 ├── src/
 │   ├── app/                   # Next.js 13+
 │   │   ├── chat/
 │   │   │   ├── [id]/
 │   │   │   │   ├── page.js    # 聊天室頁面
 │   │   ├── favicon.ico
 │   │   ├── global.css
 │   │   ├── layout.js
 │   │   ├── page.js            # 對話列表頁面
 │   ├── components/
 │   │   ├── ChatHeader.js
 │   │   ├── LazyImage.js
 │   │   ├── Loading.js
 │   │   ├── Error.js
 │   │   ├── MessageInput.js
 │   │   ├── MessageItem.js
 │   │   ├── MessageReactions.js
 │   ├── lib/                   # SWR API hooks
 │   │   ├── useChatApi.js
 │   ├── mock/                  # 資料 & API
 │   │   ├── chat_data.json
 │   │   ├── server.js
 │   ├── utils/                 # 其它常用函式
 │   │   ├── datetime.js
 │   ├── constants.js           # 所有共用常數
 │   ├── add_id_to_messages.js  # 初次安裝專案需先將messages作批次處理，為所有message加上id，因為若沒有id，json-server無法做CRUD
 ├── public/                    # 靜態資源
 ├── package.json
 ├── next.config.js
 ├── README.md
```
---

**© NextTalk - A Real-time Chat App by Aaron Chuo 🚀**

