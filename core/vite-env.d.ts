/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_TWITCH_LOGIN_URL: string
  readonly VITE_TWITCH_REGISTER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}