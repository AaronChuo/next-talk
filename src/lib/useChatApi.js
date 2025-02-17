import useSWR from 'swr';
import {
  API_URL,
  INTERVAL_MS_CONVERSATIONS,
  INTERVAL_MS_MESSAGES,
  INTERVAL_MS_NONE,
  ERROR_SEND_MESSAGE,
} from '@/constants';

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useConversations = () => {
  const { data, error } = useSWR(`${API_URL}/conversations`, fetcher, {
    refreshInterval: INTERVAL_MS_CONVERSATIONS,
  });

  return {
    conversations: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useMessages = (conversationId) => {
  const { data, error, mutate } = useSWR(
    conversationId
      ? `${API_URL}/messages?conversationId=${conversationId}`
      : null,
    fetcher,
    {
      refreshInterval: conversationId ? INTERVAL_MS_MESSAGES : INTERVAL_MS_NONE,
    },
  );

  return {
    messages: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const sendMessage = async (conversationId, messageData, mutate) => {
  const response = await fetch(
    `${API_URL}/conversations/${conversationId}/messages/create`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData),
    },
  );

  if (!response.ok) {
    throw new Error(ERROR_SEND_MESSAGE);
  }

  mutate();
};
