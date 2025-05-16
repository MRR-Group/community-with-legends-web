import Logo from '../assets/logo.png'
import FeedIcon from '../assets/Icons/World.svg'
import FollowingIcon from '../assets/Icons/Heart.svg'
import NotificationIcon from '../assets/Icons/Notification.svg'
import ProfileIcon from '../assets/Icons/User.svg'

interface NavigationBarProps {

}

export default function NavigationBar({}: NavigationBarProps) {
  return (
    <nav className='w-full p-6 flex justify-between items-center'>
      <img src={Logo} alt='Logo' className='object-contain object-center'/>
      <ul className='flex w-full justify-end ml-auto'>
        <li className='flex flex-row gap-1 items-center h-10'>
          <img src={FeedIcon} alt='Feed' className='object-contain object-center'/>
          Feed
        </li>
        <li className='flex flex-row gap-1 items-center h-10 ml-12'>
          <img src={FollowingIcon} alt='Following' className='object-contain object-center'/>
          Following
        </li>
        <li className='flex flex-row gap-1 items-center h-10 ml-12'>
          <img src={NotificationIcon} alt='Notifications' className='object-contain object-center'/>
          Notifications
        </li>
        <li className='flex flex-row gap-1 items-center h-10 ml-12'>
          <img src={ProfileIcon} alt='Profile' className='object-contain object-center'/>
          Profile
        </li>
        <li className='flex justify-center ml-12'>
          <div className='flex items-center border-1 rounded-xl p-1.5 px-4'>
            Log out
          </div>
        </li>
      </ul>
    </nav>
  );
}