import NavigationBar from "./components/NavigationBar.tsx";
import {useCore} from "./providers/coreProvider.tsx";
import {useEffect, useState} from "react";
import Post from "./components/Post.tsx";
import PostModel from "../../core/src/entities/post.ts";
import useErrorHandler from "./utils/useErrorHandler.ts";
import {useAuth} from "./providers/authProvider.tsx";
import {useNavigate, useParams} from "react-router";
import Show from "./components/Show.tsx";
import CreateComment from "./components/CreateComment.tsx";
import CommentModel from "../../core/src/entities/comment.ts";
import Comment from "./components/Comment.tsx";
import {useLoadDefaultLanguage} from "./translations.ts";

function PostPage() {
  const {postsRepository, createCommentUseCase} = useCore();
  const {isLoggedIn} = useAuth();
  const [post, setPost] = useState<PostModel>();
  const [comments, setComments] = useState<CommentModel[]>([]);
  const {errors, handleError, clearErrors} = useErrorHandler();
  const {id} = useParams();
  const navigate = useNavigate();

  useLoadDefaultLanguage();

  async function reloadPost() {
    const post = await postsRepository.byId(Number(id));
    setComments(post.comments);
    setPost(post);
  }

  useEffect(() => {
    reloadPost();
  }, [id])

  function handlePostHide() {
    navigate('/');
  }

  function handleCommentHide(comment: CommentModel) {
    const id = comment.id;

    setComments((comments) => comments.filter((comment) => comment.id !== id));
  }

  async function handleCreateComment(content: string) {
    try {
      clearErrors();
      const comment = await createCommentUseCase.createComment(post!, content);
      addNewComment(comment);
    }
    catch (e: any) {
      handleError(e);
    }
  }

  function addNewComment(comment: CommentModel) {
    setComments([comment, ...comments]);
  }

  return (
    <div>
      <NavigationBar active="post"/>
      <Show when={post !== undefined}>
        <div className='flex flex-col gap-4 px-4 sm:px-0 items-center md:pb-4 pb-16'>
          <Post
            data={post!}
            onHide={handlePostHide}
            isInPreview={true}
          />
          <Show when={isLoggedIn}>
            <CreateComment errors={errors} onSubmit={handleCreateComment}/>
          </Show>
          {comments.map((comment) => (
            <Comment key={comment.id} data={comment} onHide={handleCommentHide}/>
          ))}
        </div>
      </Show>
    </div>
  )
}

export default PostPage