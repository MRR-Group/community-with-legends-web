import {ChangeEvent} from "react";
import {useTranslation} from "react-i18next";

interface UploadButtonProps {
  onClick?: (file: File) => void,
}

export default function UploadButton({onClick}: UploadButtonProps) {
  const {t} = useTranslation('profilePage');
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file !== undefined && onClick) {
      onClick(file);
    }
  }

  return (
    <label className='p-0.5 px-5 bg-primary rounded-lg w-fit text-xl cursor-pointer hover:bg-primary-hover hover:scale-110 active:scale-90 transition-transform'>
      {t('Upload avatar')}
      <input className='hidden'
        type='file'
        accept='image/png,image/jpg'
        onChange={handleChange}
      />
    </label>
  )
}