import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegisterPage from './RegisterPage.tsx'
import LoginPage from "./LoginPage.tsx";
import ForgotPasswordPage from "./ForgotPasswordPage.tsx";
import ResetPasswordPage from "./ResetPasswordPage.tsx";
import FeedPage from "./FeedPage.tsx";
import PostPage from "./PostPage.tsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import {CoreProvider} from "./providers/coreProvider.tsx";
import { Toaster } from 'react-hot-toast';
import {AuthProvider} from "./providers/authProvider.tsx";
import UserPostsPage from "./UserPostsPage.tsx";
import UserProfilePage from "./UserProfilePage.tsx";
import {InitTranslation} from "./translations.ts";

InitTranslation();

const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordPage,
  },
  {
    path: "/reset-password",
    Component: ResetPasswordPage,
  },
  {
    path: "/",
    Component: FeedPage,
  },
  {
    path: "/post/:id",
    Component: PostPage,
  },
  {
    path: "/user/:id",
    Component: UserProfilePage,
  },
  {
    path: "/user/:id/posts",
    Component: UserPostsPage,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CoreProvider>
      <AuthProvider>
        <Toaster position='bottom-left' toastOptions={{className: "toast-message", style: {}, duration: 7000}}></Toaster>
        <RouterProvider router={router}/>
      </AuthProvider>
    </CoreProvider>
  </StrictMode>,

)
