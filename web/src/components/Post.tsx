import PostModel from "../../../core/src/entities/post.ts";
import Show from "./Show.tsx";
import ReactionButton from "./ReactionButton.tsx";
import ReplyButton from "./ReplyButton.tsx";
import {useCore} from "../providers/coreProvider.tsx";
import {useEffect, useState} from "react";
import AssetViewer from "./AssetViewer.tsx";
import Options from "./Options.tsx";
import useErrorHandler from "../utils/useErrorHandler.ts";
import toast from "react-hot-toast";
import {useAuth} from "../providers/authProvider.tsx";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

interface PostProps {
  data: PostModel,
  onHide: (post: PostModel) => void,
  isInPreview?: boolean,
}

export default function Post({data, onHide, isInPreview}: PostProps) {
  const {addReactionUseCase, removeReactionUseCase, reportPostUseCase, removePostUseCase, authRepository} = useCore();
  const {isLoggedIn} = useAuth();
  const [reactions, setReactions] = useState(data.reactions);
  const [clicked, setClicked] = useState(data.userReacted);
  const {handleError} = useErrorHandler();
  const navigate = useNavigate();
  const {t} = useTranslation('feedPage');

  useEffect(() => {
    setReactions(data.reactions);
    setClicked(data.userReacted);
  }, [data]);

  async function addReaction() {
    try {
      await addReactionUseCase.addReaction(data.id);
      setReactions(reactions + 1);
      setClicked(true);
    } catch (e: any) {
      handleError(e);
    }
  }

  async function removeReaction() {
    try {
      await removeReactionUseCase.removeReaction(data.id);
      setReactions(reactions - 1);
      setClicked(false);
    } catch (e: any) {
      handleError(e);
    }
  }

  async function reportPost() {
    try {
      await reportPostUseCase.reportPost(data.id);
      toast('Post has been reported');
      onHide(data);
    } catch (e: any) {
      handleError(e);
    }
  }

  async function removePost() {
    try {
      await removePostUseCase.removePost(data.id);
      toast('Post has been deleted');
      onHide(data);
    } catch (e: any) {
      handleError(e);
    }
  }

  async function handleReactionButtonClick() {
    if (clicked) {
      await removeReaction();
    } else {
      await addReaction();
    }
  }

  function handleCommentClick() {
    navigate(`/post/${data.id}`);
  }

  return (
    <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px] max-w-96 md:max-w-128'>
      <div
        className='flex flex-col gap-4 bg-background px-5 rounded-lg max-w-96 md:min-w-96 md:max-w-128 pb-4 relative box-border'>
        <div className='flex pt-4'>
          <a href={`/user/${data.user.id}`}>
            <img src={data.user.avatar} className='h-14 w-14 rounded-full bg-text object-cover cursor-pointer'
                 alt='User Avatar'/>
          </a>
          <div className='flex flex-col ml-4'>
            <a className='text-xl hover:underline cursor-pointer' href={`/user/${data.user.id}`}>
              {data.user.name}
            </a>
            <Show when={data.game !== undefined}>
              <div className='text-primary -mt-2'>
                {data.game?.name}
              </div>
            </Show>
            <div className='text-text-hover text-xs -mt-1'>
              {data.createdAt.toDateString()}
            </div>
          </div>
          <Show when={authRepository.User?.id !== data.user.id && isLoggedIn}>
            <Options>
              <div className="hover:text-text-disabled cursor-pointer" onClick={reportPost}>
                {t('Report post')}
              </div>
              <Show when={authRepository.User?.can('deletePosts')}>
                <div className="hover:text-text-disabled cursor-pointer" onClick={removePost}>
                  {t('Delete post')}
                </div>
              </Show>
            </Options>
          </Show>
        </div>
        <Show when={data.tags !== undefined && data.tags.length > 0}>
          <div className='flex flex-wrap'>
            {data.tags.map((tag) => (
              <div className='p-1.5 bg-primary rounded-lg text-xs max-w-fit m-1'>
                {tag.name}
              </div>
            ))}
          </div>
        </Show>
        <div className='break-words whitespace-pre-line'>
          {data.content}
        </div>
        <div>
          <AssetViewer asset={data.asset}/>
        </div>
        <div>
          <ReactionButton text={`👍 x ${reactions}`} onClick={handleReactionButtonClick} hasReacted={clicked}/>
        </div>
        <Show when={!isInPreview}>
          <div className='absolute -bottom-6 right-7' onClick={handleCommentClick}>
            <ReplyButton text={t('Comment')}/>
          </div>
        </Show>
      </div>
    </div>
  )
}