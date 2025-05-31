import CommentsRepository from "../repositories/commentsRepository.ts";
import Comment from "../entities/comment.ts";

export class RemoveCommentUseCase {
    private _commentsRepository: CommentsRepository;

    constructor(commentsRepository: CommentsRepository) {
        this._commentsRepository = commentsRepository;
    }

    public async removeComment(comment: Comment): Promise<void> {
        return this._commentsRepository.removeComment(comment);
    }
}