import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageInput from '@/components/MessageInput';
import { sendMessage } from '@/lib/useChatApi';
import { CURRENT_USER_ID } from '@/constants';

jest.mock('@/lib/useChatApi', () => ({
  sendMessage: jest.fn(),
}));

describe('MessageInput Component', () => {
  const conversationId = 1;
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and send button', () => {
    render(<MessageInput conversationId={conversationId} mutate={mockMutate} />);
    
    expect(screen.getByPlaceholderText('Say something...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('updates input value when typing', async () => {
    render(<MessageInput conversationId={conversationId} mutate={mockMutate} />);
    
    const input = screen.getByPlaceholderText('Say something...');
    await userEvent.type(input, 'Hello! bro');

    expect(input).toHaveValue('Hello! bro');
  });

  it('calls sendMessage and clear input when send button clicked', async () => {
    render(<MessageInput conversationId={conversationId} mutate={mockMutate} />);
    
    const input = screen.getByPlaceholderText('Say something...');
    const sendButton = screen.getByRole('button', { name: 'Send' });

    await userEvent.type(input, 'Hello! sir');
    await userEvent.click(sendButton);

    expect(sendMessage).toHaveBeenCalledWith(
      conversationId,
      expect.objectContaining({
        conversationId,
        userId: CURRENT_USER_ID,
        messageType: 'text',
        message: 'Hello! sir',
      }),
      mockMutate
    );
    expect(input).toHaveValue('');
  });

  it('does not call sendMessage if input is empty', async () => {
    render(<MessageInput conversationId={conversationId} mutate={mockMutate} />);
    
    const sendButton = screen.getByRole('button', { name: 'Send' });
    await userEvent.click(sendButton);

    expect(sendMessage).not.toHaveBeenCalled();
  });
});
