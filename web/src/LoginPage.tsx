import {SubmitHandler, useForm} from "react-hook-form";
import twitchLogo from "./assets/Twitch.svg";
import AuthRedirectText from "./components/AuthRedirectText.tsx";
import {useNavigate, useSearchParams} from "react-router";
import useErrorHandler from "./utils/useErrorHandler.ts";
import Input from "./components/Input.tsx";
import {useEffect} from "react";
import toast from "react-hot-toast";
import {useAuth} from "./providers/authProvider.tsx";
import Button from "./components/Button.tsx";
import {useTranslation} from "react-i18next";
import LangButton from "./components/LangButton.tsx";
import {useLoadDefaultLanguage} from "./translations.ts";


type LoginForm = {
  email: string,
  password: string,
}

function LoginPage() {
  const {register, handleSubmit} = useForm<LoginForm>();
  const {logIn} = useAuth();
  const navigate = useNavigate();
  const {errors, handleError, clearErrors} = useErrorHandler();
  const [params] = useSearchParams();
  const {t} = useTranslation('login');

  useLoadDefaultLanguage();

  useEffect(() => {
    const message = params.get('message');

    if (message !== null) {
      toast.error(message);
    }
  }, [params]);

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      clearErrors();
      await logIn(data.email, data.password);
      navigate("/");
    }
    catch (e: any) {
      handleError(e);
    }
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px]'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col bg-background px-5 py-4 rounded-lg min-w-80'>
          <h1 className='text-4xl text-center pb-5'>{t('LoginTitle')}</h1>
          <Input
            register={register}
            errors={errors}
            title={t('Enter your email')}
            type='email'
            placeholder={t('email')}
            name='email'
          />
          <AuthRedirectText message={t("You don't have an account?")} actionText={t('to register')} link={"/register"}/>
          <Input
            register={register}
            errors={errors}
            title={t('Enter your password')}
            type='password'
            placeholder={t('password')}
            name='password'
          />
          <AuthRedirectText message={t("You don't remember?")} actionText={t('to reset it')} link={"/forgot-password"}/>
          <div className='flex justify-center w-full pb-4 pt-1'>
            <Button value={t('Login')}/>
          </div>
          <div>
            <h1 className='text-2xl text-center'>{t('OR')}</h1>
            <h2 className='text-lg text-center'> {t('Log in via')}</h2>
            <a href={import.meta.env.VITE_TWITCH_LOGIN_URL}>
              <img src={twitchLogo} alt='TwitchLogo' className='mx-auto pb-5 pt-5 cursor-pointer'/>
            </a>
          </div>
          <a href="/" className='flex justify-center w-full pb-4 pt-1'>
            <div className='flex justify-center text-lg text-center cursor-pointer'>
              {t('View as a')} <p className='text-primary pl-1'>{t('guest')}</p>
            </div>
          </a>
        </form>
      </div>
      <div className='absolute -left-6 top-0'>
        <LangButton/>
      </div>
    </div>
  )
}

export default LoginPage
