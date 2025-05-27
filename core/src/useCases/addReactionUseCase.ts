import AuthRepository from "../repositories/authRepository.ts";
import PostsRepository from "../repositories/postsRepository.ts";
import UnauthenticatedException from "../exceptions/unauthenticatedException.ts";

export class AddReactionUseCase {
  private _authRepository: AuthRepository;
  private _postsRepository: PostsRepository;

  constructor(authRepository: AuthRepository, postsRepository: PostsRepository) {
    this._authRepository = authRepository;
    this._postsRepository = postsRepository;
  }

  public async addReaction(postId: number): Promise<boolean> {
    if (!this._authRepository.isLogged) {
      throw new UnauthenticatedException();
    }

    return this._postsRepository.addReaction(postId);
  }
}