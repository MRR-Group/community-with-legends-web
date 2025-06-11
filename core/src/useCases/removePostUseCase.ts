import PostsRepository from "../repositories/postsRepository.ts";

export class RemovePostUseCase {
  private _postsRepository: PostsRepository;

  constructor(postsRepository: PostsRepository) {
    this._postsRepository = postsRepository;
  }

  public async removePost(postId: number): Promise<boolean> {
    return this._postsRepository.removePost(postId);
  }
}