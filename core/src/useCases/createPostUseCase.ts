import AuthRepository from "../repositories/authRepository.ts";
import PostsRepository from "../repositories/postsRepository.ts";
import UnauthenticatedException from "../exceptions/unauthenticatedException.ts";
import CannotPostException from "../exceptions/cannotPostException.ts";
import Post from "../entities/post.ts";

export class CreatePostUseCase {
  private _authRepository: AuthRepository;
  private _postsRepository: PostsRepository;

  constructor(authRepository: AuthRepository, postsRepository: PostsRepository) {
    this._authRepository = authRepository;
    this._postsRepository = postsRepository;
  }

  public async createPost(content: string, tagIds?: number[], gameId?: number, assetType?: 'video'|'image', assetLink?: string): Promise<Post> {
    if (!this._authRepository.isLogged) {
      throw new UnauthenticatedException();
    }

    const post = this._postsRepository.createPost(content, tagIds, gameId, assetType, assetLink);

    if (!post) {
      throw new CannotPostException();
    }

    return post;
  }
}