interface AuthRedirectTextProps{
  message: string;
  actionText: string;
}
export default function AuthRedirectText({message, actionText}: AuthRedirectTextProps) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex-1 text-xs text-wrap max-w-32'>{message}</div>
      <div className='text-end ml-auto'>
        <div className='text-xs text-primary'>Click here</div>
        <div className='text-xs'>{actionText}</div>
      </div>
    </div>
  );
}