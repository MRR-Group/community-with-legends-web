import { render, screen, fireEvent } from '@testing-library/react';
import EditGamesList from '../src/components/EditGamesList';
import { describe, it, expect, vi } from 'vitest';

const mockGames = [
  { id: 1, game: { id: 11, name: 'Game 1' }, status: 'playing' },
  { id: 2, game: { id: 22, name: 'Game 2' }, status: 'playing' },
];

const mockOnAdd = vi.fn();
const mockOnDelete = vi.fn();
const mockOnDone = vi.fn();

const errors = {
  game_id: ['Error message'],
};

describe('EditGamesList', () => {
  beforeEach(() => {
    mockOnAdd.mockReset();
    mockOnDelete.mockReset();
    mockOnDone.mockReset();
  });

  it('renders list name and games', () => {
    render(
      <EditGamesList
        games={mockGames}
        errors={{}}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onDone={mockOnDone}
        listName="My Games"
      />
    );

    expect(screen.getByText('My Games')).toBeInTheDocument();
    expect(screen.getByText('Game 1')).toBeInTheDocument();
    expect(screen.getByText('Game 2')).toBeInTheDocument();
  });

  it('shows errors if passed', () => {
    render(
      <EditGamesList
        games={mockGames}
        errors={errors}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onDone={mockOnDone}
        listName="Games List"
      />
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('calls onDelete when Remove button is clicked', () => {
    render(
      <EditGamesList
        games={mockGames}
        errors={{}}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onDone={mockOnDone}
        listName="Games List"
      />
    );

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('calls onAdd when Add game button is clicked', () => {
    render(
      <EditGamesList
        games={mockGames}
        errors={{}}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onDone={mockOnDone}
        listName="Games List"
      />
    );

    fireEvent.click(screen.getByText('Add game'));
    expect(mockOnAdd).toHaveBeenCalledWith(undefined);
  });

  it('calls onDone when Done button is clicked', () => {
    render(
      <EditGamesList
        games={mockGames}
        errors={{}}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onDone={mockOnDone}
        listName="Games List"
      />
    );

    fireEvent.click(screen.getByText('Done'));
    expect(mockOnDone).toHaveBeenCalled();
  });
});
