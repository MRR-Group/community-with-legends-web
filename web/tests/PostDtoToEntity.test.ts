import { describe, it, expect } from 'vitest';
import Post from '../../core/src/entities/post';
import {User} from '../../core/src/entities/user';
import Game from '../../core/src/entities/game';
import Tag from '../../core/src/entities/tag';
import Comment from '../../core/src/entities/comment';
import PostDto, { postDtoToEntity } from '../../core/src/dto/postDto';

describe('postDtoToEntity', () => {
  it('should correctly map PostDto to Post entity with all nested entities', () => {
    const dto: PostDto = {
      id: 100,
      content: 'Post content here',
      created_at: '2025-06-11T12:00:00.000Z',
      user: {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        avatar: 'avatar.png',
        permissions: ['makeComment', 'reactToPost'],
        hasPassword: true,
        hasTwitchAccount: false,
      },
      game: {
        id: 2,
        name: 'Cool Game',
        cover: 'http://example.com/cover.jpg',
      },
      tags: [
        { id: 10, name: 'fun' },
        { id: 11, name: 'multiplayer' },
      ],
      asset: {
        id: 20,
        link: 'http://example.com/image.png',
        type: 'Image',
      },
      reactions: 42,
      user_reacted: true,
      comments: [
        {
          id: 30,
          content: 'Nice post!',
          created_at: '2025-06-11T12:05:00.000Z',
          user: {
            id: 3,
            name: 'Bob',
            email: 'bob@example.com',
            avatar: 'bob.png',
            permissions: ['makeComment'],
            hasPassword: false,
            hasTwitchAccount: true,
          },
        },
      ],
    };

    const post = postDtoToEntity(dto);

    expect(post).toBeInstanceOf(Post);
    expect(post.id).toBe(dto.id);
    expect(post.content).toBe(dto.content);
    expect(post.createdAt.toISOString()).toBe(dto.created_at);
    expect(post.reactions).toBe(dto.reactions);
    expect(post.userReacted).toBe(dto.user_reacted);

    expect(post.user).toBeInstanceOf(User);
    expect(post.user.id).toBe(dto.user.id);
    expect(post.user.name).toBe(dto.user.name);
    expect(post.user.email.value).toBe(dto.user.email);
    expect(post.user.permissions).toEqual(dto.user.permissions);

    expect(post.game).toBeInstanceOf(Game);
    expect(post.game?.id).toBe(dto.game?.id);
    expect(post.game?.name).toBe(dto.game?.name);

    expect(post.tags).toHaveLength(dto.tags.length);
    post.tags.forEach((tag, i) => {
      expect(tag).toBeInstanceOf(Tag);
      expect(tag.id).toBe(dto.tags[i].id);
      expect(tag.name).toBe(dto.tags[i].name);
    });

    expect(post.asset).toBeDefined();
    expect(post.asset?.id).toBe(dto.asset?.id);
    expect(post.asset?.link).toBe(dto.asset?.link);
    expect(post.asset?.type).toBe(dto.asset?.type);

    expect(post.comments).toHaveLength(dto.comments.length);
    post.comments.forEach((comment, i) => {
      expect(comment).toBeInstanceOf(Comment);
      expect(comment.id).toBe(dto.comments[i].id);
      expect(comment.content).toBe(dto.comments[i].content);
      expect(comment.createdAt.toISOString()).toBe(dto.comments[i].created_at);
      expect(comment.user).toBeInstanceOf(User);
      expect(comment.user.id).toBe(dto.comments[i].user.id);
    });
  });

  it('should correctly handle missing optional fields (game and asset)', () => {
    const dto: PostDto = {
      id: 101,
      content: 'Another post',
      created_at: '2025-06-11T13:00:00.000Z',
      user: {
        id: 4,
        name: 'Charlie',
        email: 'charlie@example.com',
        avatar: 'charlie.png',
        permissions: [],
        hasPassword: false,
        hasTwitchAccount: false,
      },
      tags: [],
      reactions: 0,
      user_reacted: false,
      comments: [],
    };

    const post = postDtoToEntity(dto);

    expect(post).toBeInstanceOf(Post);
    expect(post.game).toBeUndefined();
    expect(post.asset).toBeUndefined();
    expect(post.tags).toHaveLength(0);
    expect(post.comments).toHaveLength(0);
  });
});
