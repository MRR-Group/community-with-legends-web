import NavigationBar from "./components/NavigationBar.tsx";
import {useCore} from "./providers/coreProvider.tsx";
import {useEffect, useMemo} from "react";
import {useAsync} from "@react-hook/async";
import Show from "./components/Show.tsx";
import Post from "./components/Post.tsx";
import PostModel from "../../core/src/entities/post.ts";
import {useMediaQuery} from "usehooks-ts";
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
    const screen = useWindowSize();

    useMediaQuery('(min-width: )')

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
          <NavigationBar active="feed"/>
            <div className='flex flex-wrap justify-evenly'>
                <Show when={posts.status === "idle"}>
                    Loading
                </Show>
                <Show when={posts.status === "success"}>
                    {columns.map((columnPosts, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-8 p-4 md:p-0">
                            {columnPosts.map(post => (
                                <Post data={post}/>
                            ))}
                        </div>
                    ))}
                </Show>
            </div>
        </div>
    )
}

export default FeedPage