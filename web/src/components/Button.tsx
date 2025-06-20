interface ButtonProps {
  value: string,
  onClick?: () => void,
}

export default function Button({value, onClick}: ButtonProps) {
  return (
    <input
      className='p-0.5 px-5 bg-primary rounded-lg w-fit text-xl cursor-pointer hover:bg-primary-hover hover:scale-110 active:scale-90 transition-transform'
      type='submit'
      value={value}
      onClick={onClick}
    />
  )
}