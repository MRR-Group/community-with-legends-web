import NavigationBar from "./components/NavigationBar.tsx";
import {useCore} from "./providers/coreProvider.tsx";
import {useEffect, useMemo, useState} from "react";
import {useAsync} from "@react-hook/async";
import Show from "./components/Show.tsx";
import Post from "./components/Post.tsx";
import PostModel from "../../core/src/entities/post.ts";
import {useWindowSize} from "react-use";

const splitIntoColumns = (posts: PostModel[], columns: number): PostModel[][] => {
    const result: PostModel[][] = Array.from({length: columns}, () => []);

    posts.forEach((post, index) => {
        result[index % columns].push(post);
    });

    return result;
};

function FeedPage() {
    const {postsRepository} = useCore();
    const [posts, getPosts] = useAsync(() => postsRepository.all());
    const [currentPost, setCurrentPost] = useState<PostModel|null>(null);
    const screen = useWindowSize();

    function handleCurrentPost(post: PostModel) {
        setCurrentPost(post);
    }

    const columns = useMemo(() => {
        if (posts.status !== "success") {
            return [];
        }
        const postSize = 576;

        return splitIntoColumns(posts.value!, Math.max(Math.floor(screen.width/postSize), 1));
    }, [screen, posts]);

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            <div className={currentPost ? "blur-xs" : ""}>
               <NavigationBar active="feed"/>
               <div className='flex flex-wrap justify-evenly'>
                   <Show when={posts.status === "idle"}>
                       Loading
                   </Show>
                   <Show when={posts.status === "success"}>
                       {columns.map((columnPosts, colIdx) => (
                           <div key={colIdx} className="flex flex-col gap-8 p-4 md:p-0">
                               {columnPosts.map(post => (
                                   <Post data={post} onPostPreview={() => handleCurrentPost(post)}/>
                               ))}
                           </div>
                       ))}
                   </Show>
               </div>
            </div>

            <Show when={currentPost !== null}>
                <div className='fixed inset-0 bg-background/50 flex justify-center z-50 h-full w-full'
                onClick={() => setCurrentPost(null)}>
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