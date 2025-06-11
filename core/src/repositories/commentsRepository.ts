import Post from "../entities/post.ts";
import axios from "axios";
import Response from "../dto/response.ts";
import Comment from "../entities/comment.ts";
import CommentDto, {commentDtoToEntity} from "../dto/commentDto.ts";

export default class CommentsRepository {
  public async byId(commentId: number):Promise<Comment> {
    const response = await axios.get<Response<CommentDto>>(`/api/comments/${commentId}`);
    const comment = response.data.data;

    return commentDtoToEntity(comment);
  }

  public async createComment(post: Post, content: string): Promise<Comment> {
    const response = await axios.post(`/api/posts/${post.id}/comments`, {content});
    const comment = await this.byId(response.data.id);

    return comment;
  }

  public async reportComment(comment: Comment): Promise<void> {
    await axios.post(`/api/comments/${comment.id}/report`);
  }

  public async removeComment(comment: Comment): Promise<void> {
    await axios.delete(`/api/comments/${comment.id}`);
  }
}