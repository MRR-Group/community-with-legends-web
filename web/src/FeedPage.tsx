import NavigationBar from "./components/NavigationBar.tsx";
import {useCore} from "./providers/coreProvider.tsx";
import {useEffect} from "react";
import {useAsync} from "@react-hook/async";

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
          <NavigationBar active="feed">
          </NavigationBar>
        </div>
    )
}

export default FeedPage