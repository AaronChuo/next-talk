import { render, screen } from '@testing-library/react';
import LazyImage from '../LazyImage';
import { useInView } from 'react-intersection-observer';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

describe('LazyImage Component', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test Image',
    width: 200,
    height: 200,
    className: 'custom-class',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the image when it is in view', () => {
    useInView.mockReturnValue({ ref: jest.fn(), inView: true });

    render(<LazyImage {...defaultProps} />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/_next/image?url=%2Ftest-image.jpg&w=640&q=75');
    expect(img).toHaveAttribute('alt', 'Test Image');
  });

  it('does not render the image if it is not in view', () => {
    useInView.mockReturnValue({ ref: jest.fn(), inView: false });

    render(<LazyImage {...defaultProps} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
