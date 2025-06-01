import {SubmitHandler, useForm} from "react-hook-form";
import twitchLogo from './assets/Twitch.svg';
import AuthRedirectText from "./components/AuthRedirectText.tsx";
import {useNavigate} from "react-router";
import {useCore} from "./providers/coreProvider.tsx";
import useErrorHandler from "./utils/useErrorHandler.ts";
import Input from "./components/Input.tsx";
import Button from "./components/Button.tsx";
import {useTranslation} from "react-i18next";

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
  const {t} = useTranslation('register');

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
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col bg-background px-5 py-4 rounded-lg min-w-80'>
          <h1 className='text-4xl text-center pb-5'>{t('RegisterTitle')}</h1>
          <Input
              register={register}
              errors={errors}
              title={t('Enter your name')}
              type='text'
              placeholder={t('name')}
              name='name'
          />

          <Input
              register={register}
              errors={errors}
              title={t('Enter your email')}
              type='email'
              placeholder={t('email')}
              name='email'
          />

          <Input
              register={register}
              errors={errors}
              title={t('Enter your password')}
              type='password'
              placeholder={t('password')}
              name='password'
          />

          <Input
              register={register}
              errors={errors}
              title={t('Confirm your password')}
              type='password'
              placeholder={t('repeat password')}
              name='confirmPassword'
          />

          <AuthRedirectText message={t('Already have an account?')} actionText={t('to login')} link={"/login"}/>

          <div className='flex justify-center w-full pb-4 pt-1'>
            <Button value={t('Register')}/>
          </div>

          <div>
            <h1 className='text-2xl text-center'>{t('OR')}</h1>
            <h2 className='text-lg text-center'> {t('Register via')}</h2>
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
