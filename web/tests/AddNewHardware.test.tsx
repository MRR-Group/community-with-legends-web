import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AddNewHardware from '../src/components/AddNewHardware';
import '@testing-library/jest-dom';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../src/components/AddButton', () => ({
  default: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick}>Add Hardware</button>
  ),
}));

vi.mock('../src/components/AcceptButton', () => ({
  default: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick}>Accept</button>
  ),
}));

vi.mock('../src/components/DeclineButton', () => ({
  default: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick}>Decline</button>
  ),
}));

vi.mock('../src/components/Input', () => ({
  default: ({ value = '', onChange = () => {}, placeholder }: any) => (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe('AddNewHardware', () => {
  const mockOnSave = vi.fn();

  beforeEach(() => {
    mockOnSave.mockReset();
  });

  it('renders AddButton initially', () => {
    render(<AddNewHardware errors={{}} onSave={mockOnSave} />);
    expect(screen.getByText('Add Hardware')).toBeInTheDocument();
  });

  it('shows EditHardware form after clicking AddButton', () => {
    render(<AddNewHardware errors={{}} onSave={mockOnSave} />);
    fireEvent.click(screen.getByText('Add Hardware'));
    expect(screen.getByPlaceholderText('Component type')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Component model')).toBeInTheDocument();
  });

  it('calls onSave with correct values and closes form on accept', () => {
    render(<AddNewHardware errors={{}} onSave={mockOnSave} />);
    fireEvent.click(screen.getByText('Add Hardware'));

    const typeInput = screen.getByPlaceholderText('Component type');
    const modelInput = screen.getByPlaceholderText('Component model');

    fireEvent.change(typeInput, { target: { value: 'GPU' } });
    fireEvent.change(modelInput, { target: { value: 'RTX 3080' } });

    fireEvent.click(screen.getByText('Accept'));

    expect(mockOnSave).toHaveBeenCalledWith('GPU', 'RTX 3080');
    expect(screen.getByText('Add Hardware')).toBeInTheDocument();
  });

  it('closes the form without saving on decline', () => {
    render(<AddNewHardware errors={{}} onSave={mockOnSave} />);
    fireEvent.click(screen.getByText('Add Hardware'));
    fireEvent.click(screen.getByText('Decline'));

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(screen.getByText('Add Hardware')).toBeInTheDocument();
  });
});
