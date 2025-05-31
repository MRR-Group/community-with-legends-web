import {useParams} from "react-router";
import NavigationBar from "./components/NavigationBar.tsx";
import Button from "./components/Button.tsx";

function UserProfilePage() {
    const {id} = useParams();

    return (
        <div>
            <NavigationBar active='profile'/>
            <a href={`/user/${id}/posts`}>
                <Button value='See Posts'/>
            </a>
        </div>
    )
}

export default UserProfilePage