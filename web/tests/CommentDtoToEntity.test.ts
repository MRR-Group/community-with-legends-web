import { describe, it, expect } from 'vitest';
import CommentDto, { commentDtoToEntity } from '../../core/src/dto/commentDto';
import Comment from '../../core/src/entities/comment';
import {User} from '../../core/src/entities/user';

describe('commentDtoToEntity', () => {
  it('should correctly map CommentDto to Comment entity', () => {
    const userDto = {
      id: 5,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'avatar.png',
      permissions: ['makeComment', 'reactToPost'],
      hasPassword: true,
      hasTwitchAccount: false,
    };

    const commentDto: CommentDto = {
      id: 10,
      content: 'This is a comment',
      created_at: '2025-06-11T10:00:00.000Z',
      user: userDto,
    };

    const comment = commentDtoToEntity(commentDto);

    expect(comment).toBeInstanceOf(Comment);
    expect(comment.id).toBe(commentDto.id);
    expect(comment.content).toBe(commentDto.content);
    expect(comment.createdAt.toISOString()).toBe(commentDto.created_at);

    expect(comment.user).toBeInstanceOf(User);
    expect(comment.user.id).toBe(userDto.id);
    expect(comment.user.name).toBe(userDto.name);
    expect(comment.user.email.value).toBe(userDto.email);
    expect(comment.user.avatar).toBe(userDto.avatar);
    expect(comment.user.permissions).toEqual(userDto.permissions);
    expect(comment.user.hasPassword).toBe(userDto.hasPassword);
    expect(comment.user.hasTwitchAccount).toBe(userDto.hasTwitchAccount);
  });
});
