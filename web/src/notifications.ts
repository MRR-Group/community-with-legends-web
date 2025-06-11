import {configureEcho, useEchoPublic} from "@laravel/echo-react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export function InitNotification() {
  configureEcho({
    broadcaster: "pusher",
    key: "a2bdddc8bb42d53f5e2b",
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



