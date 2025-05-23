import {SubmitHandler, useForm} from "react-hook-form";
import AuthRedirectText from "./components/AuthRedirectText.tsx";
import Input from "./components/Input.tsx";
import useErrorHandler from "./utils/useErrorHandler.ts";

type ResetPasswordForm = {
  email: string,
  token: string,
  password: string,
  confirmPassword: string,
}

function ResetPasswordPage() {
  const {register, handleSubmit} = useForm<ResetPasswordForm>();
  const {errors} = useErrorHandler();

  const onSubmit: SubmitHandler<ResetPasswordForm> = async () => {
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px]'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col bg-background px-5 rounded-lg min-w-80'>
          <h1 className='text-4xl text-center pb-5 text-wrap max-w-72 leading-tight'>Reset your password</h1>
          <Input
              register={register}
              errors={errors}
              title='Enter your email'
              type='email'
              placeholder='email'
              name='email'
          />

          <Input
              register={register}
              errors={errors}
              title='Enter your token'
              type='text'
              placeholder='token'
              name='token'
          />

          <AuthRedirectText message={"You don't have a reset token?"} actionText={"to get one"} link={"/forgot-password"}/>

          <Input
              register={register}
              errors={errors}
              title='Enter your password'
              type='password'
              placeholder='password'
              name='password'
          />

          <Input
              register={register}
              errors={errors}
              title='Confirm your password'
              type='password'
              placeholder='repeat password'
              name='confirmPassword'
          />

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
