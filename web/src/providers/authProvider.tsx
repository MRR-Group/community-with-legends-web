import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {useCore} from "./coreProvider.tsx";
import {User} from "../../../core/src/entities/user.ts";

interface AuthContextType {
    isLoggedIn: boolean,
    logIn: (email: string, password: string) => Promise<void>,
    logOut: () => void,
    loggedUser?: User,
}

const defaultContext:AuthContextType = {
    isLoggedIn: false,
    logIn: async () => {},
    logOut: () => {},
}

const Context = createContext<AuthContextType>(defaultContext);

export function AuthProvider({children}:PropsWithChildren) {
    const {authRepository, logoutUseCase, loginUseCase, refreshUseCase} = useCore();
    const [isLoggedIn, setIsLoggedIn] = useState(authRepository.isLogged);
    const [loggedUser, setLoggedUser] = useState<User>();

    useEffect(() => {
        if(!authRepository.isLogged) {
            refreshUseCase.refresh().then(() => setIsLoggedIn(authRepository.isLogged));
        }
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            setLoggedUser(authRepository.User);
        }
    }, [isLoggedIn]);

    async function logIn(email: string, password: string) {
        await loginUseCase.login(email, password);
        setIsLoggedIn(true);
    }

    function logOut() {
        logoutUseCase.logout();
        setIsLoggedIn(false);
    }

    return (
        <Context.Provider value={{isLoggedIn, logIn, logOut, loggedUser}}>
            {children}
        </Context.Provider>
    )
}

export function useAuth() {
    const context = useContext(Context);

    if(!context) {
        throw new Error('Use auth must be used within AuthProvider');
    }

    return context;
}