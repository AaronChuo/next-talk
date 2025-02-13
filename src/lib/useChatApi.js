import useSWR from "swr";

const API_URL = "http://localhost:3001";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useConversations = () => {
  const { data, error } = useSWR(
    `${API_URL}/conversations`,
    fetcher,
    { refreshInterval: 5000 }
  );

  return {
    conversations: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useMessages = (conversationId) => {
  const { data, error, mutate } = useSWR(
    conversationId ? `${API_URL}/messages?conversationId=${conversationId}` : null,
    fetcher,
    { refreshInterval: 5000 }
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  mutate();
};
