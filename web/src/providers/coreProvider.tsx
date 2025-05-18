import {AuthService} from "../../../core/src/services/authService.ts";
import {LoginUseCase} from "../../../core/src/useCases/login.ts";
import {RegisterUseCase} from "../../../core/src/useCases/register.ts";
import {createContext, PropsWithChildren, useContext} from "react";
import AuthRepository from "../../../core/src/repositories/authRepository.ts";
import UserRepository from "../../../core/src/repositories/userRepository.ts";

interface CoreContextType {
  authService: AuthService,
  authRepository: AuthRepository,
  userRepository: UserRepository,
  loginUseCase: LoginUseCase,
  registerUseCase: RegisterUseCase,
}

const authService = new AuthService();
const authRepository = new AuthRepository();
const userRepository = new UserRepository();
const loginUseCase = new LoginUseCase(authService, authRepository, userRepository);
const registerUseCase = new RegisterUseCase(authService);
const defaultContext:CoreContextType = {authService, authRepository, userRepository, loginUseCase, registerUseCase}

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