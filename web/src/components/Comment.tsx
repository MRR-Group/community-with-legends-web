import CommentModel from "../../../core/src/entities/comment.ts";
import Show from "./Show.tsx";
import {useCore} from "../providers/coreProvider.tsx";
import Options from "./Options.tsx";
import useErrorHandler from "../utils/useErrorHandler.ts";
import toast from "react-hot-toast";
import {useAuth} from "../providers/authProvider.tsx";
import {useTranslation} from "react-i18next";

interface CommentProps {
  data: CommentModel,
  onHide: (comment: CommentModel) => void,
}

export default function Comment({data, onHide}: CommentProps) {
  const {reportCommentUseCase, removeCommentUseCase, authRepository} = useCore();
  const {isLoggedIn} = useAuth();
  const {handleError} = useErrorHandler();
  const {t} = useTranslation('postPage');

  async function reportComment() {
    try {
      await reportCommentUseCase.reportComment(data);
      toast('Comment has been reported');
      onHide(data);
    }
    catch (e: any) {
      handleError(e);
    }
  }

  async function removeComment() {
    try {
      await removeCommentUseCase.removeComment(data);
      toast('Comment has been deleted');
      onHide(data);
    }
    catch (e: any) {
      handleError(e);
    }
  }

  return(
    <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px] max-w-96 md:max-w-128'>
      <div className='flex flex-col gap-4 bg-background px-5 rounded-lg max-w-96 md:min-w-96 md:max-w-128 pb-4 relative box-border'>
        <div className='flex pt-4'>
          <img src={data.user.avatar} className='h-14 w-14 rounded-full bg-text object-cover' alt='User Avatar'/>
          <div className='flex flex-col ml-4'>
            <div className='text-xl hover:underline cursor-pointer'>
              {data.user.name}
            </div>
            <div className='text-text-hover text-xs -mt-1'>
              {data.createdAt.toDateString()}
            </div>
          </div>
          <Show when={authRepository.User?.id !== data.user.id && isLoggedIn}>
            <Options>
              <div className="hover:text-text-disabled cursor-pointer" onClick={reportComment}>
                {t('Report comment')}
              </div>
              <Show when={authRepository.User?.can('deletePosts')}>
                <div className="hover:text-text-disabled cursor-pointer" onClick={removeComment}>
                  {t('Delete comment')}
                </div>
              </Show>
            </Options>
          </Show>
        </div>
        <div className='break-all'>
          {data.content}
        </div>
      </div>
    </div>
  )
}