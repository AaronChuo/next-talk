# NextTalk 🛈

NextTalk 是一個 **多人即時聊天室**，使用 **Next.js + SWR + json-server**，支援 **對話列表、聊天室內容、訊息發送**。

---

## 🚀 功能特色
- **對話列表**：顯示所有對話，點擊即可進入聊天室
- **即時聊天**：支援文字訊息、圖片、系統通知
- **訊息反應**：可對訊息按 **like/love/laugh**
- **Mock API**：使用 `json-server` 模擬後端 API
- **SWR 資料同步**：提供高效能快取與自動更新

---

## 📦 技術採用
- **Next.js** 13+ (多項相關功能)
- **React Hooks (使用 useContext + useReducer)**
- **SWR (數據快取 & 自動更新)**
- **json-server (模擬 API)**
- **Tailwind CSS (使用在 UI 樣式設計上)**
- **GitHub Actions (自動部署與 CI/CD)**

---

## 🛠️ 安裝與執行
### 1️⃣ **安裝專案**
```bash
git clone https://github.com/AaronChuo/NextTalk.git
cd NextTalk
pnpm install  # 或使用 npm install
```

### 2️⃣ **啟動 `json-server` (模擬 API)**
```bash
pnpm run mock
# 或者手動執行：
node mock/server.js
```
📉 `json-server` 會在 **http://localhost:3001** 提供 API。

### 3️⃣ **啟動 Next.js**
```bash
pnpm dev
# 或者
npm run dev
```
📉 開啟瀏覽器並訪問 **http://localhost:3000** 🎉

---

## 🔐 API 文件
```
GET /conversations
GET /messages
POST /conversations/:id/messages/create
```
---

## 🗃️ 專案結構
```
NextTalk/
 ├── app/                   # Next.js 應用
 │   ├── chat/[id]/page.js  # 聊天室頁面
 │   ├── page.js            # 首頁（對話列表）
 ├── components/            # 可重用組件
 │   ├── ConversationList.js
 │   ├── ChatRoom.js
 │   ├── MessageInput.js
 ├── lib/                   # SWR API hooks
 │   ├── useChatApi.js
 ├── mock/                  # json-server 假數據
 │   ├── chat_data.json
 │   ├── server.js
 ├── public/                # 靜態資源（圖片、頭像等）
 ├── styles/                # Tailwind CSS 樣式
 ├── package.json
 ├── next.config.js
 ├── README.md
```
---

## 🎯 未來計畫
✅ **支援 WebSocket 進行即時更新**  
✅ **加入使用者身份驗證 (OAuth、JWT)**  
✅ **部署到 Vercel & Render**

---

## 🎉 貢獻方式
歡迎提交 **Issue** 或 **Pull Request**！🚀  
📁 **Repo**: [NextTalk on GitHub](https://github.com/AaronChuo/NextTalk)

---
**© 2024 NextTalk - A Real-time Chat App 🚀**

