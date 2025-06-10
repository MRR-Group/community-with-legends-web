import {SubmitHandler, useForm} from "react-hook-form";
import Input from "./components/Input.tsx";
import useErrorHandler from "./utils/useErrorHandler.ts";
import {useCore} from "./providers/coreProvider.tsx";
import {useNavigate, useParams} from "react-router";
import {useTranslation} from "react-i18next";
import Button from "./components/Button.tsx";

type SetPasswordForm = {
  password: string,
  confirmPassword: string,
}

function SetPasswordTwitchPage() {
  const {register, handleSubmit} = useForm<SetPasswordForm>();
  const {errors, handleError, clearErrors} = useErrorHandler();
  const {setPasswordTwitchUseCase} = useCore();
  const navigate = useNavigate();
  const {id} = useParams();
  const {t} = useTranslation('setPasswordTwitch');

  const onSubmit: SubmitHandler<SetPasswordForm> = async (data) => {
    try {
      clearErrors();
      await setPasswordTwitchUseCase.setPasswordTwitch(data.password, data.confirmPassword);
      navigate(`/user/${id}`);
    }
    catch (e: any) {
      handleError(e);
    }
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px]'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col bg-background px-5 py-4 rounded-lg min-w-80'>
          <h1 className='text-4xl text-center pb-5 text-wrap max-w-72 leading-tight'>{t('Set password to your account')}</h1>
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

          <div className='flex justify-center w-full pb-4 pt-3'>
            <Button value={t('Confirm')}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SetPasswordTwitchPage
