import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePost from '../src/components/CreatePost';
import '@testing-library/jest-dom';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  }),
}));

vi.mock('react-select-fetch', () => ({
  SelectFetch: ({ onChange, isMulti = false }: any) => {
    const handleClick = () => {
      if (isMulti) {
        onChange([{ value: 1, label: 'Tag 1' }]);
      } else {
        onChange({ value: 1, label: 'Game 1' });
      }
    };
    return (
      <button data-testid={isMulti ? 'select-tags' : 'select-game'} onClick={handleClick}>
        {isMulti ? 'Select Tags' : 'Select Game'}
      </button>
    );
  }
}));

vi.mock('../src/components/AssetSelector', () => ({
  __esModule: true,
  default: ({ onChange }: any) => (
    <button data-testid="select-asset" onClick={() => onChange({ url: 'asset.png', type: 'image' })}>
      Select Asset
    </button>
  )
}));

describe('CreatePost', () => {
  const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('should submit form with correct data', async () => {
    render(
      <CreatePost
        onSubmit={mockOnSubmit}
        errors={{}}
      />
    );

    const contentInput = screen.getByPlaceholderText('Join the conversation!');
    fireEvent.change(contentInput, { target: { value: 'This is a test post.' } });

    fireEvent.click(screen.getByTestId('select-game'));

    fireEvent.click(screen.getByTestId('select-tags'));

    fireEvent.click(screen.getByTestId('select-asset'));

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        content: 'This is a test post.',
        gameId: 1,
        tags: [1],
        asset: { url: 'asset.png', type: 'image' }
      });
    });
  });

  it('should render validation errors if present', () => {
    render(
      <CreatePost
        onSubmit={vi.fn()}
        errors={{ content: ['Content is required'] }}
      />
    );

    expect(screen.getByText('Content is required')).toBeInTheDocument();
  });
});
