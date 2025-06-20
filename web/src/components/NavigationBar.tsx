import Logo from '../assets/logo.png'
import NavButton from "./NavButton.tsx";
import Show from "./Show.tsx";
import {useAuth} from "../providers/authProvider.tsx";
import {useNavigate} from "react-router";
import {useCore} from "../providers/coreProvider.tsx";
import {useTranslation} from "react-i18next";
import LangButton from "./LangButton.tsx";

interface NavigationBarProps {
  active: string,
}

export default function NavigationBar({active}: NavigationBarProps) {
  const {isLoggedIn, logOut} = useAuth();
  const {authRepository} = useCore();
  const navigate = useNavigate();
  const {t} = useTranslation('navigationBar');

  return (
    <nav className='w-full p-6 flex justify-between items-center'>
      <a href='/' className='mx-auto'>
        <img src={Logo} alt='Logo' className='object-contain object-center'/>
      </a>
      <ul className='flex w-full justify-center md:justify-end ml-auto fixed bottom-0 left-0 md:static bg-background p-2 md:p-0 md:bg-transparent z-100'>
        <LangButton/>

        <NavButton
          active={active === "feed"}
          onClick={() => navigate('/')}
          text={t('Feed')}
          icon="M20.893 13.393L19.758 12.258C19.5872 12.0869 19.445 11.8893 19.337 11.673L18.257 9.513C18.2276 9.45438 18.1847 9.40358 18.1318 9.36478C18.0789 9.32599 18.0176 9.30031 17.9529 9.28986C17.8881 9.27941 17.8218 9.28449 17.7594 9.30469C17.697 9.32488 17.6403 9.35961 17.594 9.40601C17.4897 9.51023 17.3594 9.58466 17.2166 9.62158C17.0738 9.6585 16.9238 9.65658 16.782 9.61601L15.509 9.25301C15.3053 9.19575 15.0879 9.21292 14.8957 9.30144C14.7036 9.38996 14.5492 9.54405 14.4604 9.73606C14.3716 9.92807 14.354 10.1455 14.4109 10.3492C14.4679 10.553 14.5955 10.7298 14.771 10.848L15.358 11.238C15.948 11.633 16.032 12.468 15.53 12.97L15.33 13.17C15.118 13.382 15 13.668 15 13.966V14.376C15 14.785 14.89 15.185 14.68 15.534L13.365 17.725C13.1775 18.0377 12.9123 18.2964 12.5951 18.476C12.2779 18.6557 11.9195 18.7501 11.555 18.75C11.2752 18.75 11.0068 18.6389 10.809 18.441C10.6111 18.2432 10.5 17.9748 10.5 17.695V16.523C10.5 15.603 9.93999 14.776 9.08599 14.434L8.43099 14.173C7.95443 13.9822 7.55743 13.6342 7.30587 13.1868C7.05431 12.7393 6.96331 12.2193 7.04799 11.713L7.05499 11.671C7.10147 11.3928 7.19985 11.1258 7.34499 10.884L7.43499 10.734C7.67381 10.3363 8.02971 10.0222 8.45397 9.83456C8.87823 9.64695 9.3501 9.59507 9.80499 9.68601L10.983 9.92201C11.2602 9.9773 11.5481 9.92621 11.7893 9.7789C12.0306 9.63159 12.2075 9.39886 12.285 9.12701L12.493 8.39701C12.565 8.14481 12.5467 7.87536 12.4412 7.63525C12.3356 7.39513 12.1495 7.19944 11.915 7.08201L11.25 6.75001L11.159 6.84101C10.9501 7.04994 10.702 7.21567 10.429 7.32874C10.156 7.44181 9.86347 7.50001 9.56799 7.50001H9.38799C9.13899 7.50001 8.90099 7.60001 8.72599 7.77401C8.56561 7.93584 8.35144 8.03325 8.12406 8.04777C7.89668 8.06229 7.67186 7.99293 7.49219 7.85282C7.31252 7.7127 7.19047 7.51157 7.14915 7.2875C7.10783 7.06343 7.15011 6.83199 7.26799 6.63701L8.67899 4.284C8.81963 4.05011 8.91654 3.79259 8.96499 3.524M20.893 13.393C21.1352 11.8501 20.9718 10.2708 20.4188 8.81023C19.8657 7.34966 18.9422 6.05814 17.7388 5.06261C16.5355 4.06709 15.0938 3.40184 13.5555 3.13225C12.0171 2.86266 10.4352 2.99801 8.96499 3.52501C7.46931 4.06114 6.14222 4.98368 5.11859 6.19886C4.09496 7.41405 3.41126 8.87856 3.137 10.4436C2.86273 12.0086 3.00766 13.6183 3.55706 15.1092C4.10646 16.6 5.04075 17.9189 6.26497 18.9317C7.4892 19.9445 8.95973 20.6151 10.5271 20.8755C12.0945 21.1359 13.7029 20.9766 15.1888 20.414C16.6747 19.8514 17.9852 18.9054 18.9871 17.6722C19.989 16.4391 20.6466 14.9626 20.893 13.393Z"
        />
        <Show when={isLoggedIn}>
          <NavButton
            active={active === "profile"}
            onClick={() => navigate(`/user/${authRepository.User?.id}`)}
            text={t('Profile')}
            icon="M16.249 5.75C16.249 6.74456 15.8539 7.69839 15.1507 8.40165C14.4474 9.10491 13.4936 9.5 12.499 9.5C11.5044 9.5 10.5506 9.10491 9.84735 8.40165C9.14409 7.69839 8.749 6.74456 8.749 5.75C8.749 4.75544 9.14409 3.80161 9.84735 3.09835C10.5506 2.39509 11.5044 2 12.499 2C13.4936 2 14.4474 2.39509 15.1507 3.09835C15.8539 3.80161 16.249 4.75544 16.249 5.75ZM5 19.868C5.03213 17.9004 5.83634 16.0242 7.23918 14.644C8.64202 13.2639 10.5311 12.4905 12.499 12.4905C14.4669 12.4905 16.356 13.2639 17.7588 14.644C19.1617 16.0242 19.9659 17.9004 19.998 19.868C17.6454 20.9468 15.0871 21.5035 12.499 21.5C9.823 21.5 7.283 20.916 5 19.868Z"
          />
        </Show>
        <li className='flex justify-center ml-8'>
          <Show when={!isLoggedIn}>
            <a href="/login">
              <div
                className='flex items-center border-1 rounded-xl p-1.5 px-4 text-text transition-all delay-100 hover:bg-primary hover:scale-105 active:scale-90 cursor-pointer'>
                {t('Log in')}
              </div>
            </a>
          </Show>
          <Show when={isLoggedIn}>
            <div
              onClick={logOut}
              className='flex items-center border-1 rounded-xl p-1.5 px-4 text-text transition-all delay-100 hover:bg-primary hover:scale-105 active:scale-90 cursor-pointer text-nowrap'>
              {t('Log out')}
            </div>
          </Show>
        </li>
      </ul>
    </nav>
  );
}