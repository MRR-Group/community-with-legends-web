import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import SetPasswordTwitchPage from '../src/SetPasswordTwitch';
import '@testing-library/jest-dom';

const mockSetPasswordTwitch = vi.fn().mockResolvedValue(undefined);

vi.mock('../src/providers/coreProvider', async () => {
  const actual = await vi.importActual('../src/providers/coreProvider');
  return {
    ...actual,
    useCore: () => ({
      setPasswordTwitchUseCase: {
        setPasswordTwitch: mockSetPasswordTwitch,
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

describe('SetPasswordTwitchPage', () => {
  it('wysyła dane i przekierowuje po pomyślnym ustawieniu hasła', async () => {
    render(
      <MemoryRouter initialEntries={['/set-password-twitch/123']}>
        <Routes>
          <Route path="/set-password-twitch/:id" element={<SetPasswordTwitchPage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'securePassword123' },
    });
    fireEvent.change(screen.getByPlaceholderText('repeat password'), {
      target: { value: 'securePassword123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    await waitFor(() => {
      expect(mockSetPasswordTwitch).toHaveBeenCalledWith(
        'securePassword123',
        'securePassword123'
      );
    });
  });
});
