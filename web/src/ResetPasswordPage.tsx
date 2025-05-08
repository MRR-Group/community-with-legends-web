import {SubmitHandler, useForm} from "react-hook-form";
import AuthRedirectText from "./components/AuthRedirectText.tsx";

type ResetPasswordForm = {
  email: string,
  token: string,
  password: string,
  confirmPassword: string,
}

function ResetPasswordPage() {
  const {register, handleSubmit} = useForm<ResetPasswordForm>();

  const onSubmit: SubmitHandler<ResetPasswordForm> = async () => {
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px]'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col bg-background px-5 rounded-lg min-w-80'>
          <h1 className='text-4xl text-center pb-5 text-wrap max-w-72 leading-tight'>Reset your password</h1>

          <label className='flex flex-col text-xl'>
            Enter your email
            <input className='bg-background-light rounded text-sm p-2 outline-none mt-2'
                   placeholder='email' type='email' {...register('email')}/>
          </label>

          <label className='flex flex-col text-xl'>
            Enter your token
            <input className='bg-background-light rounded text-sm p-2 outline-none mt-2'
                   placeholder='token' type='token' {...register('token')}/>
          </label>

          <AuthRedirectText message={"You don't have a reset token?"} actionText={"to get one"} link={"/forgot-password"}/>

          <label className='flex flex-col text-xl'>
            Enter your password
            <input className='bg-background-light rounded text-sm p-2 outline-none mt-2'
                   placeholder='password' type='password' {...register('password')}/>
          </label>

          <label className='flex flex-col text-xl'>
            Confirm your password
            <input className='bg-background-light rounded text-sm p-2 outline-none mt-2'
                   placeholder='repeat password' type='password' {...register('confirmPassword')}/>
          </label>

          <AuthRedirectText message={"Did you remember your password?"} actionText={"to login"} link={"/"}/>

          <div className='flex justify-center w-full pb-4 pt-1'>
            <input className='p-0.5 bg-primary rounded-lg max-w-44 w-full text-xl' type='submit' value='Reset password'/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage
