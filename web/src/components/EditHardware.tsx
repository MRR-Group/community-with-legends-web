import Input from "./Input.tsx";
import {useEffect, useState} from "react";
import AcceptButton from "./AcceptButton.tsx";
import DeclineButton from "./DeclineButton.tsx";

interface EditHardwareProps {
  title: string,
  value: string,
  errors: { [p: string]: string[] },
  onAccept: (title: string, value: string) => void,
  onDecline: () => void,
}

export default function EditHardware({title, value, errors, onAccept, onDecline}: EditHardwareProps) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentTitle(title);
    setCurrentValue(value);
  }, [title, value]);

  function handleAcceptClick() {
    onAccept(currentTitle, currentValue);
  }

  function handleDeclineClick() {
    setCurrentTitle(title);
    setCurrentValue(value);
    onDecline();
  }

  return (
    <div className='w-full max-w-72'>
      <div className='flex justify-end items-center gap-1'>
        <div className='w-full'>
          <Input errors={errors} placeholder='Component' type='text' value={currentTitle} onChange={setCurrentTitle} name='title'/>
        </div>
        <div className='mt-2'>
          <AcceptButton onClick={handleAcceptClick}/>
        </div>
        <div className='mt-2'>
          <DeclineButton onClick={handleDeclineClick}/>
        </div>
      </div>
      <Input errors={errors} placeholder='Item' type='text' value={currentValue} onChange={setCurrentValue} name='value'/>
    </div>
  )
}