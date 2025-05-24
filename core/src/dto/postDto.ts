import UserDto, {userDtoToEntity} from "./userDto.ts";
import GameDto, {gameDtoToEntity} from "./gameDto.ts";
import TagDto, {tagDtoToEntity} from "./tagDto.ts";
import AssetDto, {assetDtoToEntity} from "./assetDto.ts";
import CommentDto, {commentDtoToEntity} from "./commentDto.ts";
import Post from "../entities/post.ts";

export default interface PostDto {
    id: number,
    content: string,
    created_at: string,
    user: UserDto,
    game?: GameDto,
    tags: TagDto[],
    asset?: AssetDto,
    reactions: number,
    user_reacted: boolean,
    comments: CommentDto[],
}

export function postDtoToEntity(data: PostDto):Post {
    const user = userDtoToEntity(data.user);
    const game = data.game ? gameDtoToEntity(data.game) : undefined;
    const tags = data.tags.map((tag) => tagDtoToEntity(tag));
    const asset = data.asset ? assetDtoToEntity(data.asset) : undefined;
    const comments = data.comments.map((comment) => commentDtoToEntity(comment));


    return new Post(
        data.id,
        data.content,
        new Date(data.created_at),
        user,
        game,
        tags,
        asset,
        data.reactions,
        data.user_reacted,
        comments
    );
}