export const API_URL = 'http://localhost:3001';
export const INTERVAL_MS_CONVERSATIONS = 5000;
export const INTERVAL_MS_MESSAGES = 3000;
export const INTERVAL_MS_NONE = 0;
export const ERROR_SEND_MESSAGE = 'Failed to send message';
export const ERROR_UPDATE_REACTION = 'Failed to update message';

export const CURRENT_USER_ID = 1;

export const MESSAGE_TYPE_TEXT = 'text';
export const MESSAGE_TYPE_IMAGE = 'image';
export const MESSAGE_TYPE_SYSTEM = 'system';

export const REACTION_LIKE = 'like';
export const REACTION_LOVE = 'love';
export const REACTION_LAUGH = 'laugh';
export const REACTIONS = {
  [REACTION_LIKE]: '👍',
  [REACTION_LOVE]: '❤️',
  [REACTION_LAUGH]: '😂',
};
