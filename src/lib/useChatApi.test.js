import { renderHook } from '@testing-library/react';
import useSWR from 'swr';
import { useMessages, useConversations } from '@/lib/useChatApi';
import { sendMessage, updateReactions } from '@/lib/useChatApi';
import { ERROR_SEND_MESSAGE, ERROR_UPDATE_REACTION } from '@/constants';

jest.mock('swr');

let mockData, mockError, mockMutate;

describe('useMessages Hook', () => {
  beforeEach(() => {
    mockData = [{ id: 1, message: 'Hello' }];
    mockError = new Error('API Error');
  });

  it('returns messages when success', async () => {
    useSWR.mockReturnValue({ data: mockData, error: null });

    const { result } = await renderHook(() => useMessages(1));
    expect(result.current.messages).toEqual(mockData);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
  });

  it('returns error when failure', async () => {
    useSWR.mockReturnValue({ data: null, error: mockError });

    const { result } = await renderHook(() => useMessages(1));
    expect(result.current.messages).toHaveLength(0);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeTruthy();
  });
});

describe('useConversations Hook', () => {
  beforeEach(() => {
    mockData = [{ id: 2, message: 'Hey' }];
    mockError = new Error('API Error');
  });

  it('returns conversations when success', async () => {
    useSWR.mockReturnValue({ data: mockData, error: null });

    const { result } = await renderHook(() => useConversations());
    expect(result.current.conversations).toEqual(mockData);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
  });

  it('returns error when failure', async () => {
    useSWR.mockReturnValue({ data: null, error: mockError });

    const { result } = await renderHook(() => useConversations(1));
    expect(result.current.conversations).toHaveLength(0);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeTruthy();
  });
});

describe('sendMessage API', () => {
  const conversationId = 1;

  beforeEach(() => {
    global.fetch = jest.fn();
    mockMutate = jest.fn();
  });

  it('sends message and call mutate when success', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    const apiUrl = `http://localhost:3001/conversations/${conversationId}/messages/create`;
    await sendMessage(conversationId, { message: 'Alo' }, mockMutate);

    expect(fetch).toHaveBeenCalledWith(
      apiUrl,
      expect.objectContaining({ method: 'POST' })
    );
    expect(mockMutate).toHaveBeenCalled();
  });

  it('throws error when failure', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    const conversationId = 1;
    const callApi = sendMessage(conversationId, { message: 'Hello' }, mockMutate);
    await expect(callApi).rejects.toThrow(ERROR_SEND_MESSAGE);
  });
});

describe('updateReactions API', () => {
  const conversationId = 3;

  beforeEach(() => {
    global.fetch = jest.fn();
    mockMutate = jest.fn();
  });

  it('updates reaction and call mutate when success', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    
    const apiUrl = `http://localhost:3001/messages/${conversationId}/reactions`;
    await updateReactions(conversationId, { reaction: 'like' }, mockMutate);

    expect(fetch).toHaveBeenCalledWith(
      apiUrl,
      expect.objectContaining({ method: 'PATCH' })
    );
    expect(mockMutate).toHaveBeenCalled();
  });

  it('throws error when failure', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    const callApi = updateReactions(conversationId, { message: 'Hello' }, mockMutate);
    await expect(callApi).rejects.toThrow(ERROR_UPDATE_REACTION);
  });
});
