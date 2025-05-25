import NavigationBar from "./components/NavigationBar.tsx";
import {useCore} from "./providers/coreProvider.tsx";
import {useEffect} from "react";
import {useAsync} from "@react-hook/async";
import Show from "./components/Show.tsx";
import Post from "./components/Post.tsx";

function FeedPage() {
    const {postsRepository} = useCore();
    const [posts, getPosts] = useAsync(() => postsRepository.all());

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    return (
        <div>
          <NavigationBar active="feed"/>
            <div className='flex flex-wrap gap-24'>
                <Show when={posts.status === "idle"}>
                    Loading
                </Show>
                <Show when={posts.status === "success"}>
                    <div className='flex flex-col gap-8'>
                        {posts.value?.map((post) => (
                            <Post data={post}/>
                        ))}
                    </div>
                </Show>
                <Show when={posts.status === "success"}>
                    <div className='flex flex-col gap-8'>
                        {posts.value?.map((post) => (
                            <Post data={post}/>
                        ))}
                    </div>
                </Show>
                <Show when={posts.status === "success"}>
                    <div className='flex flex-col gap-8'>
                        {posts.value?.map((post) => (
                            <Post data={post}/>
                        ))}
                    </div>
                </Show>
            </div>
        </div>
    )
}

export default FeedPage