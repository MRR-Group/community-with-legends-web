import EditButton from "./EditButton.tsx";
import {useState} from "react";
import EditHardware from "./EditHardware.tsx";
import TrashButton from "./TrashButton.tsx";
import Show from "./Show.tsx";

interface HardwareItemProps {
  id: number,
  title: string,
  value: string,
  onEdit: (id: number, title: string, value: string) => void,
  errors: { [p: string]: string[] },
  onDelete: (id: number) => void,
  clearErrors: () => void,
  canEdit: boolean,
}

export default function HardwareItem({id, title, value, onEdit, errors, onDelete, clearErrors, canEdit}: HardwareItemProps) {
  const [isInEdit, setIsInEdit] = useState(false);

  function handleAccept(title: string, value: string) {
    setIsInEdit(false);
    onEdit(id, title, value);
  }

  function handleDecline() {
    setIsInEdit(false);
    clearErrors();
  }

  function handleDelete() {
    onDelete(id);
  }

  if (isInEdit) {
    return (
      <EditHardware errors={errors} title={title} value={value} onAccept={handleAccept} onDecline={handleDecline}/>
    )
  }

  return (
    <div className='w-full px-4'>
      <div className='flex justify-between text-sm w-full'>
        {title}
      <div className='flex gap-1.5'>
        <Show when={canEdit}>
          <EditButton onClick={() => setIsInEdit(true)}/>
          <TrashButton onClick={handleDelete}/>
        </Show>
      </div>
      </div>
      <div className='text-xl w-full'>
        {value}
      </div>
    </div>
  )
}