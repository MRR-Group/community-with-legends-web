import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom';
import LoginPage from '../src/LoginPage';

const mockLogIn = vi.fn().mockResolvedValue(undefined);

vi.mock('../src/providers/authProvider', async () => {
  const actual = await vi.importActual('../src/providers/authProvider');
  return {
    ...actual,
    useAuth: () => ({
      logIn: mockLogIn,
      logOut: vi.fn(),
      isLoggedIn: false,
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

describe('LoginPage', () => {
  it('po wpisaniu danych logowania wywołuje logIn', async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'supersecret' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogIn).toHaveBeenCalledWith('test@example.com', 'supersecret');
    });
  });
});
