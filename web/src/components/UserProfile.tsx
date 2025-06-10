import {User} from "../../../core/src/entities/user.ts";
import Show from "./Show.tsx";
import {useAuth} from "../providers/authProvider.tsx";
import {useCore} from "../providers/coreProvider.tsx";
import Options from "./Options.tsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";
import useErrorHandler from "../utils/useErrorHandler.ts";
import VerifiedIcon from "../assets/verified.png";
import {useTranslation} from "react-i18next";

interface UserProfileProps {
  user: User,
  onEdit: () => void,
}

export default function UserProfile({user, onEdit}: UserProfileProps) {
  const {authRepository, reportUserUseCase, banUserUseCase} = useCore();
  const {isLoggedIn} = useAuth();
  const {handleError} = useErrorHandler();
  const navigate = useNavigate();
  const {t} = useTranslation('profilePage');

  async function reportUser() {
    try {
      await reportUserUseCase.reportUser(user.id);
      toast('User has been reported');
      handleUserHide();
    }
    catch (e: any) {
      handleError(e);
    }
  }

  async function banUser() {
    try {
      await banUserUseCase.banUser(user.id);
      toast('User has been banned');
      handleUserHide();
    }
    catch (e: any) {
      handleError(e);
    }
  }

  function handleUserHide() {
    navigate('/');
  }

  return (
    <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px] max-w-96 md:max-w-128 mx-auto'>
      <div className='relative flex flex-col gap-0.5 bg-background rounded-lg max-w-96 md:min-w-96 md:max-w-128 pb-4 pt-4 items-center box-border'>
        <div className='absolute top-2 right-2'>
          <Show when={isLoggedIn}>
            <Options>
              <Show when={authRepository.User?.id === user.id}>
                <div className="hover:text-text-disabled cursor-pointer" onClick={onEdit}>
                  {t('Edit profile')}
                </div>
              </Show>
              <Show when={isLoggedIn && authRepository.User?.id !== user.id}>
                <div className="hover:text-text-disabled cursor-pointer" onClick={reportUser}>
                  {t('Report user')}
                </div>
              </Show>
              <Show when={authRepository.User?.can('banUsers') && authRepository.User?.id !== user.id}>
                <div className="hover:text-text-disabled cursor-pointer" onClick={banUser}>
                  {t('Ban user')}
                </div>
              </Show>
            </Options>
          </Show>
        </div>
        <img
          src={`${user.avatar}?${Date.now()}`}
          className='h-28 w-28 rounded-full bg-text object-cover'
          alt='User Avatar'
        />
        <div className="pt-2 relative w-full flex justify-center">
          <div className="text-3xl relative">
            <span className="block text-center w-full">{user.name}</span>
            <Show when={user.hasTwitchAccount}>
              <img
                src={VerifiedIcon}
                alt='Verified icon'
                className="h-6 w-6 absolute top-1/2 -translate-y-1/2 left-full ml-2"
              />
            </Show>
          </div>
        </div>
        <div className='text-xl'>
          {user.email.value}
        </div>
      </div>
    </div>
  )
}