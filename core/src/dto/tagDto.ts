import Tag from "../entities/tag.ts";

export default interface TagDto {
  id: number,
  name: string,
}

export function tagDtoToEntity(data: TagDto):Tag {
  return new Tag(data.id, data.name);
}