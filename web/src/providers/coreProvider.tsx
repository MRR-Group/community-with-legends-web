import {AuthService} from "../../../core/src/services/authService.ts";
import {LoginUseCase} from "../../../core/src/useCases/login.ts";
import {RegisterUseCase} from "../../../core/src/useCases/register.ts";
import {createContext, PropsWithChildren, useContext} from "react";
import AuthRepository from "../../../core/src/repositories/authRepository.ts";
import UserRepository from "../../../core/src/repositories/userRepository.ts";
import {LogoutUseCase} from "../../../core/src/useCases/logout.ts";
import {RefreshUseCase} from "../../../core/src/useCases/refreshUseCase.ts";

interface CoreContextType {
  authService: AuthService,
  authRepository: AuthRepository,
  userRepository: UserRepository,
  registerUseCase: RegisterUseCase,
  loginUseCase: LoginUseCase,
  logoutUseCase: LogoutUseCase,
  refreshUseCase: RefreshUseCase,
}

const authService = new AuthService();
const authRepository = new AuthRepository();
const userRepository = new UserRepository();
const registerUseCase = new RegisterUseCase(authService);
const loginUseCase = new LoginUseCase(authService, authRepository, userRepository);
const logoutUseCase = new LogoutUseCase(authService, authRepository);
const refreshUseCase = new RefreshUseCase(authService, authRepository, userRepository)

const defaultContext:CoreContextType = {
  authService,
  authRepository,
  userRepository,
  registerUseCase,
  loginUseCase,
  logoutUseCase,
  refreshUseCase,
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