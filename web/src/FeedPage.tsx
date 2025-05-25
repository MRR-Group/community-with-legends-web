import NavigationBar from "./components/NavigationBar.tsx";
import {useCore} from "./providers/coreProvider.tsx";
import {useEffect} from "react";
import {useAsync} from "@react-hook/async";
import Show from "./components/Show.tsx";
import Post from "./components/Post.tsx";
import PostModel from "../../core/src/entities/post.ts";

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

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    const columns = posts.status === "success" ? splitIntoColumns(posts.value!, 3) : [];

    return (
        <div>
          <NavigationBar active="feed"/>
            <div className='flex flex-wrap justify-evenly'>
                <Show when={posts.status === "idle"}>
                    Loading
                </Show>
                <Show when={posts.status === "success"}>
                    {columns.map((columnPosts, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-6">
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