import CommentsRepository from "../repositories/commentsRepository.ts";
import Comment from "../entities/comment.ts";

export class ReportCommentUseCase {
    private _commentsRepository: CommentsRepository;

    constructor(commentsRepository: CommentsRepository) {
        this._commentsRepository = commentsRepository;
    }

    public async reportComment(comment: Comment): Promise<void> {
        return this._commentsRepository.reportComment(comment);
    }
}