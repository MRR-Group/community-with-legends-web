import {configureEcho, useEchoPublic} from "@laravel/echo-react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export function InitNotification() {
  configureEcho({
    broadcaster: "pusher",
    key: import.meta.env.VITE_REVERB_APP_KEY,
    cluster: "eu",
    forceTLS: true,
    authEndpoint: '/api/broadcasting/auth',
    auth: {
      headers: {
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') ?? '',
      }
    }
  });
}

export function useNotification() {
  useEchoPublic("posts", ".post.created", (data: any) => {
    toast(`${data.author_name} has published a new post!`);
  })
}



