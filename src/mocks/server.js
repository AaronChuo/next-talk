const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'chat_data.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// POST /conversations/:id/messages/create
server.post('/conversations/:id/messages/create', (req, res) => {
  const conversationId = Number(req.params.id);
  if (isNaN(conversationId)) {
    return res.status(400).json({ error: 'Invalid conversation ID' });
  }

  if (!req.body || !req.body.message) {
    return res.status(400).json({ error: 'No message content' });
  }

  const db = router.db;
  const messages = db.get('messages');

  // Get the max id
  const maxId = Math.max(0, ...messages.map((msg) => msg.id));
  const newId = maxId + 1;

  const newMessage = {
    id: newId,
    conversationId,
    ...req.body,
  };

  messages.push(newMessage).write();

  res.status(201).json(newMessage);
});

// PATCH /messages/:id/reactions
server.patch('/messages/:id/reactions', (req, res) => {
  const db = router.db;
  const messages = db.get('messages');

  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const message = messages.find({ id }).value();
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }

  const reactionType = req.body.reaction;
  if (!req.body || typeof reactionType !== 'string') {
    return res
      .status(400)
      .json({
        error: 'Invalid request format.',
      });
  }

  const updatedReactions = {
    ...message.reactions,
    [reactionType]: (message.reactions?.[reactionType] || 0) + 1,
  };

  messages.find({ id }).assign({ reactions: updatedReactions }).write();

  res.status(200).json({ ...message, reactions: updatedReactions });
});

// Change image URL to /delayed-image/:id to simulate delayed image loading
server.get('/messages', (req, res) => {
  const db = router.db;
  const conversationId = req.query.conversationId
    ? Number(req.query.conversationId)
    : null;
  const messages = db.get('messages').value();
  const conversationMessages = messages.filter(
    (msg) => Number(msg.conversationId) === conversationId,
  );

  const delayedMessages = conversationMessages.map((msg) => {
    if (msg.messageType === 'image') {
      return {
        ...msg,
        message: `http://localhost:3001/delayed-image/${msg.id}`,
      };
    }
    return msg;
  });

  res.status(200).json(delayedMessages);
});

// GET /delayed-image/:id
server.get('/delayed-image/:id', (req, res) => {
  const db = router.db;
  const message = db
    .get('messages')
    .find({ id: Number(req.params.id) })
    .value();

  setTimeout(() => {
    res.redirect(message.message);
  }, 1000);
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running at http://localhost:3001');
});
