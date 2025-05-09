import {SubmitHandler, useForm} from "react-hook-form";
import twitchLogo from "./assets/Twitch.svg";
import AuthRedirectText from "./components/AuthRedirectText.tsx";
import {AuthService} from "../../core/src/services/authService.ts";
import {LoginUseCase} from "../../core/src/useCases/login.ts";

type LoginForm = {
  email: string,
  password: string,
}

function LoginPage() {
  const {register, handleSubmit} = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const auth = new AuthService();

    const useCase = new LoginUseCase(auth);
    const userId = await useCase.login(data.email, data.password);
    console.log(userId);
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px]'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col bg-background px-5 rounded-lg min-w-80'>
          <h1 className='text-4xl text-center pb-5'>Login</h1>

          <label className='flex flex-col text-xl'>
            Enter your email
            <input className='bg-background-light rounded text-sm p-2 outline-none mt-2'
                   placeholder='email' type='email' {...register('email')}/>
          </label>

          <AuthRedirectText message={"You don't have an account?"} actionText={"to register"} link={"/register"}/>

          <label className='flex flex-col text-xl'>
            Enter your password
            <input className='bg-background-light rounded text-sm p-2 outline-none mt-2'
                   placeholder='password' type='password' {...register('password')}/>
          </label>

          <AuthRedirectText message={"You don't remember?"} actionText={"to reset it"} link={"/forgot-password"}/>

          <div className='flex justify-center w-full pb-4 pt-1'>
            <input className='p-0.5 bg-primary rounded-lg max-w-28 w-full text-xl' type='submit' value='Login'/>
          </div>
          <div>
            <h1 className='text-2xl text-center'>OR</h1>
            <h2 className='text-lg text-center'> Log in via</h2>
            <img src={twitchLogo} alt='TwitchLogo' className='mx-auto pb-5 pt-5'/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
