import {cn} from "../utils/cn.ts";

interface ReactionButtonProps {
  text: string,
  onClick: () => void,
  hasReacted: boolean,
}

export default function ReactionButton({text, onClick, hasReacted}: ReactionButtonProps) {
  return (
    <div
      className={cn('p-2 rounded-lg text-xs max-w-fit m-1 cursor-pointer hover:bg-primary-hover hover:scale-110 active:scale-90 transition-transform', hasReacted ? "bg-primary-hover" : "bg-primary")} onClick={onClick}>
      {text}
    </div>
  )
}