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
}