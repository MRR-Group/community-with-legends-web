import {PropsWithChildren} from "react";

interface ShowProps{
  when: boolean|undefined
}
export default function Show({when, children}: PropsWithChildren<ShowProps>) {
  if(when) {
    return children;
  }

  return null;
}