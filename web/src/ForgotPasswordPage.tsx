import {SubmitHandler, useForm} from "react-hook-form";
import AuthRedirectText from "./components/AuthRedirectText.tsx";
import Input from "./components/Input.tsx";
import useErrorHandler from "./utils/useErrorHandler.ts";
import {useCore} from "./providers/coreProvider.tsx";
import {useNavigate} from "react-router";

type ForgotPasswordForm = {
  email: string,
}

function ForgotPasswordPage() {
  const {register, handleSubmit} = useForm<ForgotPasswordForm>();
  const {errors, handleError, clearErrors} = useErrorHandler();
  const {sendResetPasswordEmailUseCase} = useCore();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    try {
      clearErrors();
      await sendResetPasswordEmailUseCase.sendEmail(data.email);
      navigate("/reset-password");
    }
    catch (e: any) {
      handleError(e);
    }
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px]'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col bg-background px-5 rounded-lg min-w-80'>
          <h1 className='text-4xl text-center pb-5 text-wrap max-w-72 leading-tight'>Forgot your password</h1>
          <Input
              register={register}
              errors={errors}
              title='Enter your email'
              type='email'
              placeholder='email'
              name='email'
          />

          <AuthRedirectText message={"You already have a reset token?"} actionText={"to reset password"} link={"/reset-password"}/>

          <AuthRedirectText message={"Did you remember your password?"} actionText={"to login"} link={"/login"}/>

          <div className='flex justify-center w-full pb-4 pt-1'>
            <input className='p-0.5 bg-primary rounded-lg max-w-32 w-full text-xl' type='submit' value='Send code'/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
