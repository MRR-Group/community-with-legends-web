import {cn} from "../utils/cn.ts";

interface NavButtonProps {
  active: boolean,
  text: string,
  icon: string,
  onClick: () => void,
}
export default function NavButton({active, text, icon, onClick}: NavButtonProps) {
  return (
    <li
      className={cn('flex flex-row gap-1 items-center h-10 transition-colors delay-100 hover:text-primary group cursor-pointer ml-10', active ? "text-primary" : "text-text")} onClick={onClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('transition-colors delay-100 group-hover:stroke-primary', active ? "stroke-primary" : "stroke-text")}>
        <path
          d={icon} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <div className="hidden lg:block">
        {text}
      </div>
    </li>
  )
}