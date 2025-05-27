import axios from "axios";
import Response from "../dto/response.ts";
import Post from "../entities/post.ts";
import PostDto, {postDtoToEntity} from "../dto/postDto.ts";

export default class PostsRepository {
    public async all():Promise<Post[]> {
        const response = await axios.get<Response<PostDto[]>>(`/api/posts`);
        const posts = response.data.data.map((post) => postDtoToEntity(post));

        return posts;
    }

    public async byId(postId: number):Promise<Post> {
        const response = await axios.get<Response<PostDto>>(`/api/posts/${postId}`);
        const post = response.data.data;

        return postDtoToEntity(post);
    }

    public async addReaction(postId: number): Promise<boolean> {
        const response = await axios.post(`/api/posts/${postId}/reactions`);

        return response.status === 201;
    }

    public async removeReaction(postId: number): Promise<boolean> {
        const response = await axios.delete(`/api/posts/${postId}/reactions`);

        return response.status === 201;
    }

    public async createPost(content: string, tagIds?: number[], gameId?: number, assetTypeId?: number, assetLink?: string): Promise<Post> {
        const body = {
            content,
            tag_ids: tagIds,
            game_id: gameId,
            asset_type_id: assetTypeId,
            asset_link: assetLink,
        };

        const response = await axios.post(`/api/posts`, body);
        const id = response.data.id;
        const post = await this.byId(id);

        return post;
    }
}