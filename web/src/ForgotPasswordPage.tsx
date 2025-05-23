import {SubmitHandler, useForm} from "react-hook-form";
import AuthRedirectText from "./components/AuthRedirectText.tsx";

type ForgotPasswordForm = {
  email: string,
}

function ForgotPasswordPage() {
  const {register, handleSubmit} = useForm<ForgotPasswordForm>();

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async () => {
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px]'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col bg-background px-5 rounded-lg min-w-80'>
          <h1 className='text-4xl text-center pb-5 text-wrap max-w-72 leading-tight'>Forgot your password</h1>

          <label className='flex flex-col text-xl'>
            Enter your email
            <input className='bg-background-light rounded text-sm p-2 outline-none mt-2'
                   placeholder='email' type='email' {...register('email')}/>
          </label>

          <AuthRedirectText message={"You already have a reset token?"} actionText={"to reset password"} link={"/reset-password"}/>

          <AuthRedirectText message={"Did you remember your password?"} actionText={"to login"} link={"/"}/>

          <div className='flex justify-center w-full pb-4 pt-1'>
            <input className='p-0.5 bg-primary rounded-lg max-w-32 w-full text-xl' type='submit' value='Send code'/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
