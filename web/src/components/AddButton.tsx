interface AddButtonProps {
  onClick?: () => void,
}

export default function AddButton({onClick}:AddButtonProps) {
  return (
    <div onClick={onClick} className='cursor-pointer group'>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className='group-hover:stroke-primary' d="M12.5 4V19M20 11.5H5" stroke="#FDFEFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  )
}