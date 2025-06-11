import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom';
import RegisterPage from '../src/RegisterPage';

const mockRegister = vi.fn().mockResolvedValue(undefined);

vi.mock('../src/providers/coreProvider', async () => {
  const actual = await vi.importActual('../src/providers/coreProvider');
  return {
    ...actual,
    useCore: () => ({
      registerUseCase: {
        register: mockRegister,
      },
    }),
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: vi.fn(),
    },
  }),
}));

vi.mock('../src/translations', () => ({
  useLoadDefaultLanguage: () => {},
}));

vi.mock('../src/utils/useErrorHandler', () => ({
  __esModule: true,
  default: () => ({
    errors: {},
    handleError: vi.fn(),
    clearErrors: vi.fn(),
  }),
}));

describe('RegisterPage', () => {
  it('po wpisaniu danych rejestracyjnych wywołuje registerUseCase.register', async () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText('name');
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const confirmPasswordInput = screen.getByPlaceholderText('repeat password');
    const submitButton = screen.getByRole('button', { name: 'Register' });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securepass123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'securepass123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        'Test User',
        'test@example.com',
        'securepass123',
        'securepass123'
      );
    });
  });
});
