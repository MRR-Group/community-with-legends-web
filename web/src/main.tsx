import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegisterPage from './RegisterPage.tsx'
import LoginPage from "./LoginPage.tsx";
import ForgotPasswordPage from "./ForgotPasswordPage.tsx";
import ResetPasswordPage from "./ResetPasswordPage.tsx";
import FeedPage from "./FeedPage.tsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import {CoreProvider} from "./providers/coreProvider.tsx";
import { Toaster } from 'react-hot-toast';
import {AuthProvider} from "./providers/authProvider.tsx";

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
