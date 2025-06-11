import { describe, it, expect } from 'vitest';
import {User} from '../../core/src/entities/user';
import UserDto, { userDtoToEntity } from '../../core/src/dto/userDto';
import InvalidEmailException from '../../core/src/exceptions/invalidEmailException';

describe('userDtoToEntity', () => {
  it('should correctly map UserDto to User entity', () => {
    const dto: UserDto = {
      id: 42,
      roles: ['admin', 'moderator'],
      email: 'test@example.com',
      name: 'Test User',
      avatar: 'avatar.png',
      permissions: ['makeComment', 'viewUsers'],
      created_at: '2025-06-11T10:00:00Z',
      hasPassword: true,
      hasTwitchAccount: false,
    };

    const user = userDtoToEntity(dto);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(dto.id);
    expect(user.name).toBe(dto.name);
    expect(user.avatar).toBe(dto.avatar);
    expect(user.email.value).toBe(dto.email);
    expect(user.permissions).toEqual(dto.permissions);
    expect(user.hasPassword).toBe(dto.hasPassword);
    expect(user.hasTwitchAccount).toBe(dto.hasTwitchAccount);

    expect(user.can('makeComment')).toBe(true);
    expect(user.can('banUsers')).toBe(false);
    expect(user.cannot('banUsers')).toBe(true);
    expect(user.cannot('makeComment')).toBe(false);

    expect(user.isBanned()).toBe(false);
  });

  it('should throw InvalidEmailException for invalid email', () => {
    const invalidDto: UserDto = {
      id: 1,
      roles: [],
      email: 'invalid-email',
      name: 'Invalid',
      avatar: '',
      permissions: [],
      created_at: '2025-06-11T10:00:00Z',
      hasPassword: false,
      hasTwitchAccount: false,
    };

    expect(() => userDtoToEntity(invalidDto)).toThrow(InvalidEmailException);
  });
});
