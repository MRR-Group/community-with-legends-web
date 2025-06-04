import Input from "./Input.tsx";
import useErrorHandler from "../utils/useErrorHandler.ts";
import {useState} from "react";
import Button from "./Button.tsx";

interface  EditProfileProps {
  username: string,
  avatar: string,
  onHide?: () => void,
}

export default function EditProfile({username, avatar, onHide}:EditProfileProps) {
  const {errors} = useErrorHandler();
  const [name, setName] = useState<string>();

  function handleNameChange() {

  }

  function handleDeleteAvatar() {

  }

  function handleNewAvatar() {

  }

  return (
    <div>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px] max-w-96 md:max-w-128 mx-auto'>
        <div className='relative flex flex-col gap-4 bg-background rounded-lg max-w-96 md:min-w-96 md:max-w-128 pb-4 pt-4 items-center box-border'>
          <div className='flex gap-3'>
            <img src={avatar} className='h-14 w-14 rounded-full bg-text object-cover' alt='User Avatar'/>
            <div className='flex flex-col items-center'>
              <Button value='Upload avatar' onClick={handleNewAvatar}/>
              <Button value='Delete avatar' onClick={handleDeleteAvatar}/>
            </div>
          </div>
          <div className='flex gap-5'>
            <Input
              onChange={setName}
              value={name}
              errors={errors}
              type='text'
              placeholder={username}
              name='name'
            />
            <Button value='Change nickname' onClick={handleNameChange}/>
          </div>
          <Button value='Done' onClick={onHide}/>
        </div>
      </div>
    </div>
  )
}