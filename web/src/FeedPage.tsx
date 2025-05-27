import NavigationBar from "./components/NavigationBar.tsx";
import {useCore} from "./providers/coreProvider.tsx";
import {useEffect, useMemo, useState} from "react";
import Show from "./components/Show.tsx";
import Post from "./components/Post.tsx";
import PostModel from "../../core/src/entities/post.ts";
import {useWindowSize} from "react-use";
import CreatePost, {SubmitProp} from "./components/CreatePost.tsx";
import useErrorHandler from "./utils/useErrorHandler.ts";

const splitIntoColumns = (posts: PostModel[], columns: number): PostModel[][] => {
    const result: PostModel[][] = Array.from({length: columns}, () => []);

    posts.forEach((post, index) => {
        result[index % columns].push(post);
    });

    return result;
};

function FeedPage() {
    const {postsRepository, createPostUseCase} = useCore();
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [currentPost, setCurrentPost] = useState<PostModel>();
    const screen = useWindowSize();
    const {errors, handleError, clearErrors} = useErrorHandler();

    function handleCurrentPost(post: PostModel) {
        setCurrentPost(post);
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
            const post = await createPostUseCase.createPost(data.content, undefined, data.gameId, undefined, undefined);
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
                <div className='mx-auto w-fit'>
                    <CreatePost onSubmit={onCreatePost} errors={errors}/>
                </div>
               <div className='flex flex-wrap justify-evenly'>
                   {columns.map((columnPosts, colIdx) => (
                       <div key={colIdx} className="flex flex-col gap-8 p-4 md:p-0">
                           {columnPosts.map(post => (
                               <Post data={post} onPostPreview={() => handleCurrentPost(post)} key={post.id}/>
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
                        <Post data={currentPost!}/>
                    </div>
                </div>
            </Show>
        </div>
    )
}

export default FeedPage