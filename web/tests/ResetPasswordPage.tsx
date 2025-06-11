import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import ResetPasswordPage from '../src/ResetPasswordPage';
import '@testing-library/jest-dom';

const mockResetPassword = vi.fn().mockResolvedValue(undefined);

vi.mock('../src/providers/coreProvider', async () => {
  const actual = await vi.importActual('../src/providers/coreProvider');
  return {
    ...actual,
    useCore: () => ({
      resetPasswordUseCase: {
        resetPassword: mockResetPassword,
      },
    }),
  };
});

vi.mock('../src/utils/useErrorHandler', () => ({
  __esModule: true,
  default: () => ({
    errors: {},
    handleError: vi.fn(),
    clearErrors: vi.fn(),
  }),
}));

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

describe('ResetPasswordPage', () => {
  it('po wpisaniu danych wywołuje resetPasswordUseCase.resetPassword z poprawnymi danymi', async () => {
    render(
      <BrowserRouter>
        <ResetPasswordPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('token'), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText('password'), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByPlaceholderText('repeat password'), { target: { value: 'newpassword123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Reset password' }));

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith(
        'user@example.com',
        '123456',
        'newpassword123',
        'newpassword123'
      );
    });
  });
});
