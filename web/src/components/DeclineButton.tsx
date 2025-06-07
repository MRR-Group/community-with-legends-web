interface DeclineButtonProps {
  onClick?: () => void,
}

export default function DeclineButton({onClick}:DeclineButtonProps) {
  return (
    <div onClick={onClick} className='cursor-pointer group'>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className='group-hover:stroke-primary' d="M7.19667 6.1967L17.8033 16.8033M17.8033 6.1967L7.19667 16.8033" stroke="#FDFEFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  )
}