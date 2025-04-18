import {SubmitHandler, useForm} from "react-hook-form";
import {AuthService} from '../../core/src/services/authService';

type RegisterForm = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

function RegisterPage() {
  const {register, handleSubmit} = useForm<RegisterForm>();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    const auth = new AuthService();

    const result = await auth.register(data.name, data.email, data.password, data.confirmPassword);
    console.log(result);
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
          <div className='flex justify-center w-full pb-4 pt-1'>
            <input className='p-0.5 bg-primary rounded-lg max-w-28 w-full text-xl' type='submit' value='Register'/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
