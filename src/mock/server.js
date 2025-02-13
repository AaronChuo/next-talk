const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "chat_data.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser());

// 🔹 `POST /conversations/:id/messages/create`
server.post("/conversations/:id/messages/create", (req, res) => {
  console.log(1111111);
  const conversationId = Number(req.params.id);
  if (isNaN(conversationId)) {
    return res.status(400).json({ error: "Invalid conversation ID" });
  }

  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  // ✅ 自動補上 conversationId
  const message = { ...req.body, conversationId };

  router.db.get("messages").push(message).write(); // 🚀 新增到 `messages`
  res.status(201).json(message);
});

// 🔹 使用 `json-server` 預設的 REST API
server.use(router);

// 🔹 啟動伺服器
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
