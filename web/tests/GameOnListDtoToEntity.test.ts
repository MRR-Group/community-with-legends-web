import { describe, it, expect } from 'vitest';
import GameOnList from '../../core/src/entities/gameOnList';
import Game from '../../core/src/entities/game';
import GameOnListDto, { gameOnListDtoToEntity } from '../../core/src/dto/gameOnListDto';

describe('gameOnListDtoToEntity', () => {
  it('should correctly map GameOnListDto to GameOnList entity', () => {
    const game = new Game(1, 'Example Game', 'http://example.com/cover.jpg');

    const dto: GameOnListDto = {
      id: 10,
      status: 'playing',
      game: game,
    };

    const entity = gameOnListDtoToEntity(dto);

    expect(entity).toBeInstanceOf(GameOnList);
    expect(entity.id).toBe(dto.id);
    expect(entity.status).toBe(dto.status);
    expect(entity.game).toBeInstanceOf(Game);
    expect(entity.game.id).toBe(game.id);
    expect(entity.game.name).toBe(game.name);
    expect(entity.game.cover).toBe(game.cover);
  });
});
