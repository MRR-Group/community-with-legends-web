import NavigationBar from "./components/NavigationBar.tsx";
import {useCore} from "./providers/coreProvider.tsx";
import {useEffect, useMemo, useState} from "react";
import Post from "./components/Post.tsx";
import PostModel from "../../core/src/entities/post.ts";
import {useWindowSize} from "react-use";
import {useParams} from "react-router";
import {useLoadDefaultLanguage} from "./translations.ts";

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

function UserPostsPage() {
  const {postsRepository} = useCore();
  const [posts, setPosts] = useState<PostModel[]>([]);
  const screen = useWindowSize();
  const {id} = useParams();

  useLoadDefaultLanguage();

  function handlePostHide(post: PostModel) {
    const id = post.id;

    setPosts((posts) => posts.filter((post) => post.id !== id));
  }

  async function reloadPosts() {
    const posts = await postsRepository.byUser(Number(id));
    setPosts(posts);
  }

  const columns = useMemo(() => {
    const postSize = 576;

    return splitIntoColumns(posts, Math.max(Math.floor(screen.width/postSize), 1));
  }, [screen, posts]);

  useEffect(() => {
    reloadPosts();
  }, []);

  return (
    <div>
      <NavigationBar active="userPosts"/>
      <div className='flex flex-wrap justify-evenly'>
        {columns.map((columnPosts, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-8 p-4 md:p-0 md:pb-4 pb-16">
            {columnPosts.map(post => (
              <Post data={post} key={post.id} onHide={handlePostHide}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPostsPage