import {useTranslation} from "react-i18next";

interface AuthRedirectTextProps{
  message: string;
  actionText: string;
  link: string;
}
export default function AuthRedirectText({message, actionText, link}: AuthRedirectTextProps) {
  const {t} = useTranslation('login');

  return (
    <div className='flex items-center justify-between'>
      <div className='flex-1 text-xs text-wrap max-w-32'>{message}</div>
      <a className='text-end ml-auto' href={link}>
        <div className='text-xs text-primary'>{t('Click here')}</div>
        <div className='text-xs'>{actionText}</div>
      </a>
    </div>
  );
}