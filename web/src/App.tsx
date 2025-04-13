import './App.css'
import {SubmitHandler, useForm} from "react-hook-form";
import {AuthService} from '../../core/src/services/authService';

type RegisterForm = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

function App() {
  const {register, handleSubmit} = useForm<RegisterForm>();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    const auth = new AuthService();

    const result = await auth.register(data.name, data.email, data.password, data.confirmPassword);
    console.log(result);
  }

  return (
    <div className=''>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col bg-background'>
        <input placeholder='name' type='name' {...register('name')}/>
        <input placeholder='email' type='email' {...register('email')}/>
        <input placeholder='password' type='password' {...register('password')}/>
        <input placeholder='repeat password' type='password' {...register('confirmPassword')}/>
        <input type='submit' value='register'/>
      </form>
    </div>
  )
}

export default App
