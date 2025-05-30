import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react";
import {PropsWithChildren} from "react";

export default function Options({children}: PropsWithChildren<{}>) {
    return (
        <Popover className='relative ml-auto flex'>
            <PopoverButton className='outline-none'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="24"
                    height="24"
                    x="0"
                    y="0"
                    viewBox="0 0 32 32"
                    className="group cursor-pointer"
                >
                    <g>
                        <path
                            d="M16 13c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zM6 13c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zM26 13c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z"
                            fill="#ffffff"
                            opacity="1"
                            data-original="#000000"
                            className='group-hover:fill-primary group-data-[active=true]:fill-primary group-hover:scale-105 group-active:scale-100 transition-transform'
                        />
                    </g>
                </svg>
            </PopoverButton>
            <PopoverPanel anchor='bottom end' className='flex flex-col gap-2 bg-background-light p-2.5 border-1 rounded-lg border-primary z-200'>
                {children}
            </PopoverPanel>
        </Popover>
    )
}