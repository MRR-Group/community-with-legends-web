import axios from "axios";
import Response from "../dto/response.ts";
import Post from "../entities/post.ts";
import PostDto, {postDtoToEntity} from "../dto/postDto.ts";

export default class PostsRepository {
    public async all(page: number):Promise<{ posts: Post[], reachedEnd: boolean }> {
        const response = await axios.get<Response<PostDto[]>>(`/api/posts?page=${page}`);
        const posts = response.data.data.map((post) => postDtoToEntity(post));
        const reachedEnd = response.data.meta.current_page >= response.data.meta.last_page;

        return {posts, reachedEnd};
    }

    public async byId(postId: number):Promise<Post> {
        const response = await axios.get<Response<PostDto>>(`/api/posts/${postId}`);
        const post = response.data.data;

        return postDtoToEntity(post);
    }

    public async byUser(userId: number):Promise<Post[]> {
        const response = await axios.get<Response<PostDto[]>>(`/api/users/${userId}/posts`);
        const posts = response.data.data.map((post) => postDtoToEntity(post));

        return posts;
    }

    public async addReaction(postId: number): Promise<boolean> {
        const response = await axios.post(`/api/posts/${postId}/reactions`);

        return response.status === 201;
    }

    public async removeReaction(postId: number): Promise<boolean> {
        const response = await axios.delete(`/api/posts/${postId}/reactions`);

        return response.status === 201;
    }

    public async createPost(content: string, tagIds?: number[], gameId?: number, assetType?: 'video'|'image', assetLink?: string): Promise<Post> {
        const body = {
            content,
            tag_ids: tagIds,
            game_id: gameId,
            asset_type_id: this.assetTypeToId(assetType),
            asset_link: assetLink,
        };

        const response = await axios.post(`/api/posts`, body);
        const id = response.data.id;
        const post = await this.byId(id);

        return post;
    }

    private assetTypeToId(assetType?: 'video'|'image'): number|undefined {
        const VIDEO_ASSET_ID = 2;
        const IMAGE_ASSET_ID = 1;

        if (assetType === 'image') {
            return IMAGE_ASSET_ID;
        }

        if (assetType === 'video') {
            return VIDEO_ASSET_ID;
        }

        return undefined;
    }
    public async reportPost(postId: number): Promise<boolean> {
        const response = await axios.post(`/api/posts/${postId}/report`);

        return response.status === 201;
    }

    public async removePost(postId: number): Promise<boolean> {
        const response = await axios.delete(`/api/posts/${postId}`);

        return response.status === 201;
    }
}