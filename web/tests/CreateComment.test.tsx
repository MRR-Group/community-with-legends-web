import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateComment from '../src/components/CreateComment';
import '@testing-library/jest-dom';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('CreateComment', () => {
  const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders correctly', () => {
    render(<CreateComment onSubmit={mockOnSubmit} errors={{}} />);

    expect(screen.getByText('Create a comment')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Join the conversation!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Comment' })).toBeInTheDocument();
  });

  it('submits comment content correctly', async () => {
    render(<CreateComment onSubmit={mockOnSubmit} errors={{}} />);

    const input = screen.getByPlaceholderText('Join the conversation!');
    fireEvent.change(input, { target: { value: 'Test comment content' } });

    const button = screen.getByRole('button', { name: 'Comment' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('Test comment content');
    });
  });

  it('displays error message when provided', () => {
    render(<CreateComment onSubmit={mockOnSubmit} errors={{ content: ['Content is required'] }} />);

    expect(screen.getByText('Content is required')).toBeInTheDocument();
  });
});
