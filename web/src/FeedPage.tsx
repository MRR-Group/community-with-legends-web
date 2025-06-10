import NavigationBar from "./components/NavigationBar.tsx";
import {useCore} from "./providers/coreProvider.tsx";
import {useEffect, useMemo, useState} from "react";
import Show from "./components/Show.tsx";
import Post from "./components/Post.tsx";
import PostModel from "../../core/src/entities/post.ts";
import {useWindowSize} from "react-use";
import CreatePost, {SubmitProp} from "./components/CreatePost.tsx";
import useErrorHandler from "./utils/useErrorHandler.ts";
import {useAuth} from "./providers/authProvider.tsx";
import InfiniteScroll from "react-infinite-scroll-component";

const splitIntoColumns = (posts: PostModel[], columns: number): PostModel[][] => {
  const result: PostModel[][] = Array.from({length: columns}, () => []);

  if (posts.length < columns) {
    return [posts];
  }

  posts.forEach((post, index) => {
    result[index % columns].push(post);
  });

  return result;
};

function FeedPage() {
  const {postsRepository, createPostUseCase} = useCore();
  const {isLoggedIn} = useAuth();
  const [posts, setPosts] = useState<PostModel[]>([]);
  const screen = useWindowSize();
  const {errors, handleError, clearErrors} = useErrorHandler();
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);

  function handlePostHide(post: PostModel) {
    const id = post.id;

    setPosts((posts) => posts.filter((post) => post.id !== id));
  }

  async function reloadPosts() {
    const {posts, reachedEnd} = await postsRepository.all(page);
    setPosts(posts);
    setReachedEnd(reachedEnd);
  }

  async function loadMorePosts() {
    const {posts, reachedEnd} = await postsRepository.all(page+1);
    setPage(page+1);
    setPosts((loadedPosts) => [...loadedPosts, ...posts]);
    setReachedEnd(reachedEnd);
  }

  function addNewPost(post: PostModel) {
    setPosts([post, ...posts]);
  }

  const columns = useMemo(() => {
    const postSize = 576;

    return splitIntoColumns(posts, Math.max(Math.floor(screen.width/postSize), 1));
  }, [screen, posts]);

  async function onCreatePost(data: SubmitProp) {
    try {
      clearErrors();
      const post = await createPostUseCase.createPost(data.content, data.tags, data.gameId, data.asset?.type, data.asset?.value);
      addNewPost(post);
    }
    catch (e: any) {
      handleError(e);
    }
  };

  useEffect(() => {
    reloadPosts();
  }, []);

  return (
    <InfiniteScroll dataLength={posts.length} next={loadMorePosts} hasMore={!reachedEnd} loader='' className='h-full'>
      <div className='overflow-y-hidden h-full'>
        <NavigationBar active="feed"/>
        <Show when={isLoggedIn}>
          <div className='flex justify-center mb-8 w-full px-4'>
            <CreatePost onSubmit={onCreatePost} errors={errors}/>
          </div>
        </Show>
        <div className='flex flex-wrap justify-evenly'>
          {columns.map((columnPosts, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-8 p-4 md:p-0 md:pb-10 pb-24">
              {columnPosts.map(post => (
                <Post data={post} key={post.id} onHide={handlePostHide}/>
              ))}
            </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  )
}

export default FeedPage