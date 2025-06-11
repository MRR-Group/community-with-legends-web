import Post from "../entities/post.ts";
import CommentsRepository from "../repositories/commentsRepository.ts";
import Comment from "../entities/comment.ts";

export class CreateCommentUseCase {
  private _commentsRepository: CommentsRepository;

  constructor(commentsRepository: CommentsRepository) {
    this._commentsRepository = commentsRepository;
  }

  public async createComment(post: Post, content: string): Promise<Comment> {
    return this._commentsRepository.createComment(post, content);
  }
}