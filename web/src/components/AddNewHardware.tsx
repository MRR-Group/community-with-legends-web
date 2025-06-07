import {useState} from "react";
import EditHardware from "./EditHardware.tsx";
import AddButton from "./AddButton.tsx";

interface AddNewHardwareProps {
  errors: { [p: string]: string[] },
  onSave: (title: string, value: string) => void,
}

export default function AddNewHardware({errors, onSave}: AddNewHardwareProps) {
  const [isInEdit, setIsInEdit] = useState(false);

  function handleSave(title: string, value: string) {
    onSave(title, value);
    setIsInEdit(false);
  }

  function handleDecline() {
    setIsInEdit(false);
  }

  if (!isInEdit) {
    return (
      <AddButton onClick={() => setIsInEdit(true)}/>
    )
  }

  return (
    <EditHardware title='' value='' errors={errors} onAccept={handleSave} onDecline={handleDecline}/>
  )
}