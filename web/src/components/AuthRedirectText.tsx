interface AuthRedirectTextProps{
  message: string;
  actionText: string;
}
export default function AuthRedirectText({message, actionText}: AuthRedirectTextProps) {
  return (
    <div className='flex items-center'>
      <div className='flex-1 text-xs'>{message}</div>
      <div className='text-center'>
        <div className='text-xs text-primary'>Click here</div>
        <div className='text-xs'>{actionText}</div>
      </div>
    </div>
  );
}