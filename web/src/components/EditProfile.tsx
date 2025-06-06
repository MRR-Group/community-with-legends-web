import Input from "./Input.tsx";
import useErrorHandler from "../utils/useErrorHandler.ts";
import {useEffect, useState} from "react";
import Button from "./Button.tsx";
import {useCore} from "../providers/coreProvider.tsx";
import {User} from "../../../core/src/entities/user.ts";
import UploadButton from "./UploadButton.tsx";

interface  EditProfileProps {
  data: User,
  onHide?: () => void,
  onChange: () => void,
}

export default function EditProfile({data, onHide, onChange}:EditProfileProps) {
  const {changeNameUseCase, changeAvatarUseCase, deleteAvatarUseCase} = useCore();
  const {errors} = useErrorHandler();
  const [name, setName] = useState<string>();

  useEffect(() => {
  }, [data]);

  async function handleNameChange() {
    await changeNameUseCase.changeName(name!);
    onChange();
  }

  async function handleDeleteAvatar() {
    await deleteAvatarUseCase.deleteAvatar();
    onChange();
  }

  async function handleNewAvatar(avatar: File) {
    await changeAvatarUseCase.changeAvatar(avatar);
    onChange();
  }

  return (
    <div>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px] max-w-96 md:max-w-128 mx-auto'>
        <div className='relative flex flex-col gap-4 bg-background rounded-lg max-w-96 md:min-w-96 md:max-w-128 pb-4 pt-4 items-center box-border'>
          <div className='flex justify-between max-w-72 w-full'>
            <img
              src={`${data.avatar}?${Date.now()}`}
              className='h-18 w-18 rounded-full bg-text object-cover my-auto'
              alt='User Avatar'
            />
            <div className='flex flex-col items-center gap-2.5'>
              <UploadButton onClick={handleNewAvatar}/>
              <Button value='Delete avatar' onClick={handleDeleteAvatar}/>
            </div>
          </div>
          <div className='text-xl'>
            Nickname
            <div className='flex gap-4'>
              <Input
                onChange={setName}
                value={name}
                errors={errors}
                type='text'
                placeholder={data.name}
                name='name'
              />
              <div className='my-auto mt-2.5'>
                <Button value='Change' onClick={handleNameChange}/>
              </div>
            </div>
          </div>
          <Button value='Go back' onClick={onHide}/>
        </div>
      </div>
    </div>
  )
}