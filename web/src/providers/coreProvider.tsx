import {AuthService} from "../../../core/src/services/authService.ts";
import {LoginUseCase} from "../../../core/src/useCases/login.ts";
import {RegisterUseCase} from "../../../core/src/useCases/register.ts";
import {createContext, PropsWithChildren, useContext} from "react";
import AuthRepository from "../../../core/src/repositories/authRepository.ts";
import UserRepository from "../../../core/src/repositories/userRepository.ts";
import {LogoutUseCase} from "../../../core/src/useCases/logout.ts";
import {RefreshUseCase} from "../../../core/src/useCases/refreshUseCase.ts";
import {ResetPasswordUseCase} from "../../../core/src/useCases/resetPassword.ts";
import {SendResetPasswordEmailUseCase} from "../../../core/src/useCases/sendResetPasswordEmail.ts";
import PostsRepository from "../../../core/src/repositories/postsRepository.ts";
import {AddReactionUseCase} from "../../../core/src/useCases/addReactionUseCase.ts";
import {RemoveReactionUseCase} from "../../../core/src/useCases/removeReactionUseCase.ts";
import {CreatePostUseCase} from "../../../core/src/useCases/createPostUseCase.ts";

interface CoreContextType {
  authService: AuthService,
  authRepository: AuthRepository,
  userRepository: UserRepository,
  postsRepository: PostsRepository,
  registerUseCase: RegisterUseCase,
  loginUseCase: LoginUseCase,
  logoutUseCase: LogoutUseCase,
  refreshUseCase: RefreshUseCase,
  resetPasswordUseCase: ResetPasswordUseCase,
  sendResetPasswordEmailUseCase: SendResetPasswordEmailUseCase,
  addReactionUseCase: AddReactionUseCase,
  removeReactionUseCase: RemoveReactionUseCase,
  createPostUseCase: CreatePostUseCase,
}

const authService = new AuthService();
const authRepository = new AuthRepository();
const userRepository = new UserRepository();
const postsRepository = new PostsRepository()
const registerUseCase = new RegisterUseCase(authService);
const loginUseCase = new LoginUseCase(authService, authRepository, userRepository);
const logoutUseCase = new LogoutUseCase(authService, authRepository);
const refreshUseCase = new RefreshUseCase(authService, authRepository, userRepository)
const resetPasswordUseCase = new ResetPasswordUseCase(authService);
const sendResetPasswordEmailUseCase = new SendResetPasswordEmailUseCase(authService);
const addReactionUseCase = new AddReactionUseCase(authRepository, postsRepository);
const removeReactionUseCase = new RemoveReactionUseCase(authRepository, postsRepository);
const createPostUseCase = new CreatePostUseCase(authRepository, postsRepository);

const defaultContext:CoreContextType = {
  authService,
  authRepository,
  userRepository,
  postsRepository,
  registerUseCase,
  loginUseCase,
  logoutUseCase,
  refreshUseCase,
  resetPasswordUseCase,
  sendResetPasswordEmailUseCase,
  addReactionUseCase,
  removeReactionUseCase,
  createPostUseCase,
}

const Context = createContext<CoreContextType>(defaultContext);

export function CoreProvider({children}:PropsWithChildren) {
  return (
    <Context.Provider value={defaultContext}>
      {children}
    </Context.Provider>
  )
}

export function useCore() {
  const context = useContext(Context);

  if(!context) {
    throw new Error('Use core must be used within CoreProvider');
  }

  return context;
}