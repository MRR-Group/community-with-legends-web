import { describe, it, expect } from 'vitest';
import Game from '../../core/src/entities/game';
import GameDto, { gameDtoToEntity } from '../../core/src/dto/gameDto';

describe('gameDtoToEntity', () => {
  it('should correctly map GameDto to Game entity', () => {
    const gameDto: GameDto = {
      id: 42,
      name: 'Super Cool Game',
      cover: 'http://example.com/cover.png',
    };

    const game = gameDtoToEntity(gameDto);

    expect(game).toBeInstanceOf(Game);
    expect(game.id).toBe(gameDto.id);
    expect(game.name).toBe(gameDto.name);
    expect(game.cover).toBe(gameDto.cover);
  });
});
