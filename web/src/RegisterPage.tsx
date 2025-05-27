import {SubmitHandler, useForm} from "react-hook-form";
import twitchLogo from './assets/Twitch.svg';
import AuthRedirectText from "./components/AuthRedirectText.tsx";
import {useNavigate} from "react-router";
import {useCore} from "./providers/coreProvider.tsx";
import useErrorHandler from "./utils/useErrorHandler.ts";
import Input from "./components/Input.tsx";

type RegisterForm = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

function RegisterPage() {
  const {register, handleSubmit} = useForm<RegisterForm>();
  const {registerUseCase} = useCore();
  const navigate = useNavigate();
  const {errors, handleError, clearErrors} = useErrorHandler();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      clearErrors();
      console.log(data);
      await registerUseCase.register(data.name, data.email, data.password, data.confirmPassword)
      navigate("/login")
    }
    catch (e: any) {
      handleError(e);
    }
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px]'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col bg-background px-5 rounded-lg min-w-80'>
          <h1 className='text-4xl text-center pb-5'>Register</h1>
          <Input
              register={register}
              errors={errors}
              title='Enter your name'
              type='text'
              placeholder='name'
              name='name'
          />

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

          <AuthRedirectText message={"Already have an account?"} actionText={"to login"} link={"/login"}/>

          <div className='flex justify-center w-full pb-4 pt-1'>
            <input className='p-0.5 bg-primary rounded-lg max-w-28 w-full text-xl cursor-pointer hover:bg-primary-hover hover:scale-110 active:scale-90 transition-transform' type='submit' value='Register'/>
          </div>

          <div>
            <h1 className='text-2xl text-center'>OR</h1>
            <h2 className='text-lg text-center'> Register via</h2>
            <a href={import.meta.env.VITE_TWITCH_REGISTER_URL}>
              <img src={twitchLogo} alt='TwitchLogo' className='mx-auto pb-5 pt-5 cursor-pointer'/>
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
