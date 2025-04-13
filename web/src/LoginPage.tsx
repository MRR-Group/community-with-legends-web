import {SubmitHandler, useForm} from "react-hook-form";

type LoginForm = {
  email: string,
  password: string,
}

function LoginPage() {
  const {register, handleSubmit} = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async () => {
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

          <label className='flex flex-col text-xl'>
            Enter your password
            <input className='bg-background-light rounded text-sm p-2 outline-none mt-2'
                   placeholder='password' type='password' {...register('password')}/>
          </label>

          <div className='flex justify-center w-full pb-4 pt-1'>
            <input className='p-0.5 bg-primary rounded-lg max-w-28 w-full text-xl' type='submit' value='Login'/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
