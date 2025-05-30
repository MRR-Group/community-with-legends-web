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

const splitIntoColumns = (posts: PostModel[], columns: number): PostModel[][] => {
    const result: PostModel[][] = Array.from({length: columns}, () => []);

    posts.forEach((post, index) => {
        result[index % columns].push(post);
    });

    return result;
};

function FeedPage() {
    const {postsRepository, createPostUseCase} = useCore();
    const {isLoggedIn} = useAuth();
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [currentPost, setCurrentPost] = useState<PostModel>();
    const screen = useWindowSize();
    const {errors, handleError, clearErrors} = useErrorHandler();

    function handleCurrentPost(post: PostModel) {
        setCurrentPost(post);
    }

    function handlePostHide(post: PostModel) {
        const id = post.id;

        setPosts((posts) => posts.filter((post) => post.id !== id));

        if (currentPost?.id === id) {
            setCurrentPost(undefined);
        }
    }

    async function reloadPosts() {
        const posts = await postsRepository.all();
        setPosts(posts);
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
        <div>
            <div className={currentPost ? "blur-xs" : ""}>
               <NavigationBar active="feed"/>
                    <Show when={isLoggedIn}>
                        <div className='mx-auto w-fit mb-8'>
                            <CreatePost onSubmit={onCreatePost} errors={errors}/>
                        </div>
                    </Show>
               <div className='flex flex-wrap justify-evenly'>
                   {columns.map((columnPosts, colIdx) => (
                       <div key={colIdx} className="flex flex-col gap-8 p-4 md:p-0">
                           {columnPosts.map(post => (
                               <Post data={post} onPostPreview={() => handleCurrentPost(post)} key={post.id} onHide={handlePostHide}/>
                           ))}
                       </div>
                   ))}
               </div>
            </div>

            <Show when={currentPost !== undefined}>
                <div className='fixed inset-0 bg-background/50 flex justify-center z-50 h-full w-full'
                onClick={() => setCurrentPost(undefined)}>
                    <div className='mt-4'
                    onClick={(e) => e.stopPropagation()}>
                        <Post data={currentPost!} onHide={handlePostHide}/>
                    </div>
                </div>
            </Show>
        </div>
    )
}

export default FeedPage