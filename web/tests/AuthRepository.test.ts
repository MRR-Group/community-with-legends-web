import { describe, it, expect, beforeEach } from 'vitest';
import AuthRepository from '../../core/src/repositories/authRepository';
import { User } from '../../core/src/entities/user';

describe('AuthRepository', () => {
  let repo: AuthRepository;
  let user: User;

  beforeEach(() => {
    repo = new AuthRepository();

    user = new User(
      1,
      'TestUser',
      'test@example.com',
      'avatar.png',
      ['createPost', 'makeComment'],
      true,
      false
    );
  });

  it('should initially have undefined user and isLogged false', () => {
    expect(repo.User).toBeUndefined();
    expect(repo.isLogged).toBe(false);
  });

  it('should set and get the user correctly', () => {
    repo.User = user;
    expect(repo.User).toBe(user);
    expect(repo.isLogged).toBe(true);
  });

  it('should clear the user correctly', () => {
    repo.User = user;
    expect(repo.isLogged).toBe(true);

    repo.clear();
    expect(repo.User).toBeUndefined();
    expect(repo.isLogged).toBe(false);
  });
});
