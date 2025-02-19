import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageItem from '@/components/MessageItem';
import { CURRENT_USER_ID, MESSAGE_TYPE_TEXT, MESSAGE_TYPE_IMAGE, MESSAGE_TYPE_SYSTEM } from '@/constants';

jest.mock('@/components/LazyImage', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

describe('MessageItem Component', () => {
  let mockMessage;

  beforeEach(() => {
    mockMessage = {
      id: 3,
      userId: 6,
      user: 'Aaron',
      avatar: 'https://i.pravatar.cc/150?img=19',
      messageType: MESSAGE_TYPE_TEXT,
      message: 'Welcome to my next talk!',
      reactions: { like: 1, love: 2, laugh: 0 },
      timestamp: Date.now(),
    };
  });

  it('renders a text message correctly', () => {
    render(<MessageItem msg={mockMessage} />);

    expect(screen.getByText(mockMessage.user)).toBeInTheDocument();
    expect(screen.getByText(mockMessage.message)).toBeInTheDocument();
  });

  it('renders an image message correctly', () => {
    const imageMessage = {
      ...mockMessage,
      messageType: MESSAGE_TYPE_IMAGE,
      message: 'https://picsum.photos/333'
    };
    render(<MessageItem msg={imageMessage} />);

    const image = screen.getByAltText('sent image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageMessage.message);
  });

  it('renders a system message correctly', () => {
    const systemMessage = {
      ...mockMessage,
      messageType: MESSAGE_TYPE_SYSTEM,
      message: 'System Message'
    };
    render(<MessageItem msg={systemMessage} />);

    const systemMsg = screen.getByText(systemMessage.message);
    expect(systemMsg).toBeInTheDocument();
    expect(systemMsg).toHaveClass('text-teal-600');
  });

  it('renders user avatar correctly', () => {
    render(<MessageItem msg={mockMessage} />);

    const avatar = screen.getByAltText(mockMessage.user);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockMessage.avatar);
  });

  it('renders correct styles for self messages', () => {
    const selfMessage = {
      ...mockMessage,
      userId: CURRENT_USER_ID
    };
    render(<MessageItem msg={selfMessage} />);

    const messageBubble = screen.getByAltText(selfMessage.user).closest('div');
    expect(messageBubble)
      .toHaveClass('before:right-16', 'before:border-l-8', 'before:border-l-gray-100', 'flex-row-reverse');
  });

  it('renders correct styles for other users\' messages', () => {
    render(<MessageItem msg={mockMessage} />);

    const messageBubble = screen.getByAltText(mockMessage.user).closest('div');
    expect(messageBubble)
      .toHaveClass('before:left-16', 'before:border-r-8', 'before:border-r-gray-100');
  });

  it('handles hover state for reactions', async () => {
    render(<MessageItem msg={mockMessage} />);
    const messageBubble = screen.getByAltText(mockMessage.user).closest('div');
    const laughButton = screen.getByRole('button', { name: '😂 0' });

    await userEvent.hover(messageBubble);
    expect(laughButton).toBeVisible();

    await userEvent.unhover(messageBubble);
    expect(laughButton).toHaveClass('opacity-0');
  });
});
