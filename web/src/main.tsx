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
      <RouterProvider router={router}/>
    </CoreProvider>
  </StrictMode>,

)
