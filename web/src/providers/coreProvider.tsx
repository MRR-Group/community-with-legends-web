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
import {RemovePostUseCase} from "../../../core/src/useCases/removePostUseCase.ts";
import {ReportPostUseCase} from "../../../core/src/useCases/reportPostUseCase.ts";
import {CreateCommentUseCase} from "../../../core/src/useCases/createCommentUseCase.ts";
import CommentsRepository from "../../../core/src/repositories/commentsRepository.ts";
import {ReportCommentUseCase} from "../../../core/src/useCases/reportCommentUseCase.ts";
import {RemoveCommentUseCase} from "../../../core/src/useCases/removeCommentUseCase.ts";
import {ReportUserUseCase} from "../../../core/src/useCases/reportUserUseCase.ts";
import {BanUserUseCase} from "../../../core/src/useCases/banUserUseCase.ts";
import {ChangeAvatarUseCase} from "../../../core/src/useCases/changeAvatarUseCase.ts";
import EditProfileRepository from "../../../core/src/repositories/editProfileRepository.ts";
import {DeleteAvatarUseCase} from "../../../core/src/useCases/deleteAvatarUseCase.ts";
import {ChangeNameUseCase} from "../../../core/src/useCases/changeNameUseCase.ts";
import HardwareRepository from "../../../core/src/repositories/hardwareRepository.ts";
import {AddHardwareUseCase} from "../../../core/src/useCases/addHardwareUseCase.ts";
import {EditHardwareUseCase} from "../../../core/src/useCases/editHardwareUseCase.ts";
import {RemoveHardwareUseCase} from "../../../core/src/useCases/removeHardwareUseCase.ts";

interface CoreContextType {
  authService: AuthService,
  authRepository: AuthRepository,
  userRepository: UserRepository,
  postsRepository: PostsRepository,
  commentsRepository: CommentsRepository,
  hardwareRepository: HardwareRepository,
  editProfileRepository: EditProfileRepository,
  registerUseCase: RegisterUseCase,
  loginUseCase: LoginUseCase,
  logoutUseCase: LogoutUseCase,
  refreshUseCase: RefreshUseCase,
  resetPasswordUseCase: ResetPasswordUseCase,
  sendResetPasswordEmailUseCase: SendResetPasswordEmailUseCase,
  addReactionUseCase: AddReactionUseCase,
  removeReactionUseCase: RemoveReactionUseCase,
  createPostUseCase: CreatePostUseCase,
  reportPostUseCase: ReportPostUseCase,
  removePostUseCase: RemovePostUseCase,
  createCommentUseCase: CreateCommentUseCase,
  reportCommentUseCase: ReportCommentUseCase,
  removeCommentUseCase: RemoveCommentUseCase,
  reportUserUseCase: ReportUserUseCase,
  banUserUseCase: BanUserUseCase,
  changeAvatarUseCase: ChangeAvatarUseCase,
  deleteAvatarUseCase: DeleteAvatarUseCase,
  changeNameUseCase: ChangeNameUseCase,
  addHardwareUseCase: AddHardwareUseCase,
  editHardwareUseCase: EditHardwareUseCase,
  removeHardwareUseCase: RemoveHardwareUseCase,
}

const authService = new AuthService();
const authRepository = new AuthRepository();
const userRepository = new UserRepository();
const postsRepository = new PostsRepository();
const commentsRepository = new CommentsRepository();
const hardwareRepository = new HardwareRepository();
const editProfileRepository = new EditProfileRepository();
const registerUseCase = new RegisterUseCase(authService);
const loginUseCase = new LoginUseCase(authService, authRepository, userRepository);
const logoutUseCase = new LogoutUseCase(authService, authRepository);
const refreshUseCase = new RefreshUseCase(authService, authRepository, userRepository)
const resetPasswordUseCase = new ResetPasswordUseCase(authService);
const sendResetPasswordEmailUseCase = new SendResetPasswordEmailUseCase(authService);
const addReactionUseCase = new AddReactionUseCase(authRepository, postsRepository);
const removeReactionUseCase = new RemoveReactionUseCase(authRepository, postsRepository);
const createPostUseCase = new CreatePostUseCase(authRepository, postsRepository);
const reportPostUseCase = new ReportPostUseCase(postsRepository);
const removePostUseCase = new RemovePostUseCase(postsRepository);
const createCommentUseCase = new CreateCommentUseCase(commentsRepository);
const reportCommentUseCase = new ReportCommentUseCase(commentsRepository);
const removeCommentUseCase = new RemoveCommentUseCase(commentsRepository);
const reportUserUseCase = new ReportUserUseCase(userRepository);
const banUserUseCase = new BanUserUseCase(userRepository);
const changeAvatarUseCase = new ChangeAvatarUseCase(editProfileRepository)
const deleteAvatarUseCase = new DeleteAvatarUseCase(editProfileRepository);
const changeNameUseCase = new ChangeNameUseCase(editProfileRepository);
const addHardwareUseCase = new AddHardwareUseCase(hardwareRepository);
const editHardwareUseCase = new EditHardwareUseCase(hardwareRepository);
const removeHardwareUseCase = new RemoveHardwareUseCase(hardwareRepository);

const defaultContext:CoreContextType = {
  authService,
  authRepository,
  userRepository,
  postsRepository,
  commentsRepository,
  hardwareRepository,
  editProfileRepository,
  registerUseCase,
  loginUseCase,
  logoutUseCase,
  refreshUseCase,
  resetPasswordUseCase,
  sendResetPasswordEmailUseCase,
  addReactionUseCase,
  removeReactionUseCase,
  createPostUseCase,
  reportPostUseCase,
  removePostUseCase,
  createCommentUseCase,
  reportCommentUseCase,
  removeCommentUseCase,
  reportUserUseCase,
  banUserUseCase,
  changeAvatarUseCase,
  deleteAvatarUseCase,
  changeNameUseCase,
  addHardwareUseCase,
  editHardwareUseCase,
  removeHardwareUseCase,
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