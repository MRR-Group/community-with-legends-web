import { describe, it, expect } from 'vitest';
import Tag from '../../core/src/entities/tag';
import { tagDtoToEntity, TagDto } from '../../core/src/dto/tagDto';

describe('tagDtoToEntity', () => {
  it('should correctly map TagDto to Tag entity', () => {
    const dto: TagDto = {
      id: 5,
      name: 'Action',
    };

    const tag = tagDtoToEntity(dto);

    expect(tag).toBeInstanceOf(Tag);
    expect(tag.id).toBe(dto.id);
    expect(tag.name).toBe(dto.name);
  });
});
