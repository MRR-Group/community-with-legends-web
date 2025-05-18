import {SubmitHandler, useForm} from "react-hook-form";
import twitchLogo from './assets/Twitch.svg';
import AuthRedirectText from "./components/AuthRedirectText.tsx";
import {useNavigate} from "react-router";
import {useCore} from "./providers/coreProvider.tsx";

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

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    await registerUseCase.register(data.name, data.email, data.password, data.confirmPassword)
    navigate("/login")
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px]'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col bg-background px-5 rounded-lg min-w-80'>
          <h1 className='text-4xl text-center pb-5'>Register</h1>
          <label className='flex flex-col text-xl'>
            Enter your name
            <input className='bg-background-light rounded text-sm p-2 outline-none mt-2'
                   placeholder='name' type='name' {...register('name')}/>
          </label>

          <label className='flex flex-col text-xl'>
            Enter your email
            <input className='bg-background-light rounded text-sm p-2 outline-none mt-2'
                   placeholder='email' type='email' {...register('email')}/>
          </label>

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

          <AuthRedirectText message={"Already have an account?"} actionText={"to login"} link={"/"}/>

          <div className='flex justify-center w-full pb-4 pt-1'>
            <input className='p-0.5 bg-primary rounded-lg max-w-28 w-full text-xl cursor-pointer' type='submit' value='Register'/>
          </div>

          <div>
            <h1 className='text-2xl text-center'>OR</h1>
            <h2 className='text-lg text-center'> Register via</h2>
            <img src={twitchLogo} alt='TwitchLogo' className='mx-auto pb-5 pt-5 cursor-pointer'/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
