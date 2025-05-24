import UserDto, {userDtoToEntity} from "./userDto.ts";
import Comment from "../entities/comment.ts";

export default interface CommentDto {
    id: number,
    content: string,
    created_at: string,
    user: UserDto,
}

export function commentDtoToEntity(data: CommentDto):Comment {
    const user = userDtoToEntity(data.user);

    return new Comment(data.id, data.content, new Date(data.created_at), user);
}