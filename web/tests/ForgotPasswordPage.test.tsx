import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import ForgotPasswordPage from '../src/ForgotPasswordPage';
import '@testing-library/jest-dom';

const mockSendEmail = vi.fn().mockResolvedValue(undefined);

vi.mock('../src/providers/coreProvider', async () => {
  const actual = await vi.importActual('../src/providers/coreProvider');
  return {
    ...actual,
    useCore: () => ({
      sendResetPasswordEmailUseCase: {
        sendEmail: mockSendEmail,
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

vi.mock('../src/utils/useErrorHandler', () => ({
  __esModule: true,
  default: () => ({
    errors: {},
    handleError: vi.fn(),
    clearErrors: vi.fn(),
  }),
}));

describe('ForgotPasswordPage', () => {
  it('po wpisaniu emaila wywołuje sendResetPasswordEmailUseCase.sendEmail', async () => {
    render(
      <BrowserRouter>
        <ForgotPasswordPage />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const submitButton = screen.getByRole('button', { name: 'Send code' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSendEmail).toHaveBeenCalledWith('test@example.com');
    });
  });
});
