import PostsRepository from "../repositories/postsRepository.ts";

export class ReportPostUseCase {
  private _postsRepository: PostsRepository;

  constructor(postsRepository: PostsRepository) {
    this._postsRepository = postsRepository;
  }

  public async reportPost(postId: number): Promise<boolean> {
    return this._postsRepository.reportPost(postId);
  }
}