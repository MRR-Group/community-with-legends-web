import {PropsWithChildren} from "react";
import {cn} from "../utils/cn.ts";

interface ToggleButtonProps {
    isClicked: boolean,
    onClick: () => void,
}

export default function ToggleButton({children, isClicked, onClick}:PropsWithChildren<ToggleButtonProps>) {
    return (
        <div className={cn('p-1 rounded-lg text-sm text-center w-full max-w-20 m-1 cursor-pointer hover:bg-primary-hover hover:scale-110 active:scale-90 transition-transform', isClicked ? "bg-primary-hover" : "bg-primary")} onClick={onClick}>
            {children}
        </div>
    )
}