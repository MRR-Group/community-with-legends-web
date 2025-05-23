import {SubmitHandler, useForm} from "react-hook-form";
import twitchLogo from "./assets/Twitch.svg";
import AuthRedirectText from "./components/AuthRedirectText.tsx";
import {useCore} from "./providers/coreProvider.tsx";
import {useNavigate} from "react-router";
import useErrorHandler from "./utils/useErrorHandler.ts";
import Input from "./components/Input.tsx";

type LoginForm = {
  email: string,
  password: string,
}

function LoginPage() {
  const {register, handleSubmit} = useForm<LoginForm>();
  const {loginUseCase} = useCore();
  const navigate = useNavigate();
  const {errors, handleError, clearErrors} = useErrorHandler();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      clearErrors();
      await loginUseCase.login(data.email, data.password);
      navigate("/");
    }
    catch (e: any) {
      handleError(e);
    }
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px]'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col bg-background px-5 rounded-lg min-w-80'>
          <h1 className='text-4xl text-center pb-5'>Login</h1>
          <Input
              register={register}
              errors={errors}
              title='Enter your email'
              type='email'
              placeholder='email'
              name='email'
          />

          <AuthRedirectText message={"You don't have an account?"} actionText={"to register"} link={"/register"}/>

          <Input
              register={register}
              errors={errors}
              title='Enter your password'
              type='password'
              placeholder='password'
              name='password'
          />

          <AuthRedirectText message={"You don't remember?"} actionText={"to reset it"} link={"/forgot-password"}/>

          <div className='flex justify-center w-full pb-4 pt-1'>
            <input className='p-0.5 bg-primary rounded-lg max-w-28 w-full text-xl cursor-pointer' type='submit' value='Login'/>
          </div>
          <div>
            <h1 className='text-2xl text-center'>OR</h1>
            <h2 className='text-lg text-center'> Log in via</h2>
            <a href={import.meta.env.VITE_TWITCH_LOGIN_URL}>
              <img src={twitchLogo} alt='TwitchLogo' className='mx-auto pb-5 pt-5 cursor-pointer'/>
            </a>
          </div>
          <a href="/" className='flex justify-center w-full pb-4 pt-1'>
            <div className='flex justify-center text-lg text-center cursor-pointer'>
              View as a <p className='text-primary pl-1'>guest</p>
            </div>
          </a>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
