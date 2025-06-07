import {User} from "../../../core/src/entities/user.ts";
import {useCore} from "../providers/coreProvider.tsx";
import {useEffect, useState} from "react";
import Hardware from "../../../core/src/entities/hardware.ts";
import HardwareItem from "./HardwareItem.tsx";
import useErrorHandler from "../utils/useErrorHandler.ts";
import AddNewHardware from "./AddNewHardware.tsx";
import Show from "./Show.tsx";

interface UserHardwareProps {
  user: User,
}

export default function UserHardware({user}: UserHardwareProps) {
  const {hardwareRepository, addHardwareUseCase, editHardwareUseCase, removeHardwareUseCase, authRepository} = useCore();
  const [hardwareList, setHardwareList] = useState<Hardware[]>([]);
  const {errors, handleError, clearErrors} = useErrorHandler();

  async function refreshHardwareList() {
    const items = await hardwareRepository.byUser(user.id);
    setHardwareList(items.toSorted(sortById));
  }

  async function handleEdit(id: number, title: string, value: string) {
    try {
      await editHardwareUseCase.editHardware(id, title, value);
      editItem(id, title, value);
    }
    catch (e: any) {
      handleError(e);
    }
  }

  function editItem(id: number, title: string, value: string) {
    setHardwareList((items) => {
      const others = items.filter((item) => item.id !== id);
      return [...others, {id, title, value}].toSorted(sortById);
    })
  }

  async function handleDelete(id: number) {
    try {
      await removeHardwareUseCase.removeHardware(id);
      deleteItem(id);
    }
    catch (e: any) {
      handleError(e);
    }
  }

  function deleteItem(id: number) {
    setHardwareList((items) => items.filter((item) => item.id !== id));
  }

  async function handleAddItem(title: string, value: string) {
    try {
      const item = await addHardwareUseCase.addHardware(title, value);
      addItem(item);
    }
    catch (e: any) {
      handleError(e);
    }
  }

  function addItem(item: Hardware) {
    setHardwareList((items) => [...items, item].toSorted(sortById));
  }

  function sortById(a: Hardware, b: Hardware) {
    return a.id - b.id;
  }

  useEffect(() => {
    refreshHardwareList();
  }, [user]);

  return (
    <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px] max-w-96 md:max-w-128 mx-auto'>
      <div className='flex flex-col gap-4 bg-background rounded-lg max-w-96 md:min-w-96 md:max-w-128 pb-4 pt-4 items-center box-border'>
        <div className='text-3xl'>
          Hardware
        </div>
        {hardwareList.map((hardware) => (
          <HardwareItem
            key={hardware.id}
            id={hardware.id}
            errors={errors}
            title={hardware.title}
            value={hardware.value}
            onEdit={handleEdit}
            onDelete={handleDelete}
            clearErrors={clearErrors}
            canEdit={authRepository.User?.id === user.id}
          />
        ))}
        <Show when={authRepository.User?.id === user.id}>
          <AddNewHardware errors={errors} onSave={handleAddItem}/>
        </Show>
      </div>
    </div>
  )
}