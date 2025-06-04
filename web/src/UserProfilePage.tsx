import {useParams} from "react-router";
import NavigationBar from "./components/NavigationBar.tsx";
import Button from "./components/Button.tsx";
import {useCore} from "./providers/coreProvider.tsx";
import useErrorHandler from "./utils/useErrorHandler.ts";
import UserProfile from "./components/UserProfile.tsx";
import {User} from "../../core/src/entities/user.ts";
import {useEffect, useState} from "react";
import Loading from "./components/Loading.tsx";
import Show from "./components/Show.tsx";
import EditProfile from "./components/EditProfile.tsx";

function UserProfilePage() {
  const {userRepository} = useCore();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const {handleError, clearErrors} = useErrorHandler();
  const [inEditMode, setInEditMode] = useState<boolean>(false);

  async function showUser() {
    try {
      clearErrors();
      const user = await userRepository.byId(Number(id));
      setUser(user);
    }
    catch (e: any) {
      handleError(e);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    showUser()
  }, [id]);

  if (loading) {
    return <Loading isLoading={loading} active='profile' text='Loading user profile...'/>
  }

  return (
    <div>
      <NavigationBar active='profile'/>
      
      <div className='p-4 md:p-0'>
        <Show when={!inEditMode}>
          <UserProfile user={user!} onEdit={() => setInEditMode(true)}/>
        </Show>
        <Show when={inEditMode}>
          <EditProfile username={user!.name} avatar={user!.avatar} onHide={() => setInEditMode(false)}/>
        </Show>
      </div>

      <div className='flex justify-center pt-3'>
        <a href={`/user/${id}/posts`}>
          <Button value='See Posts'/>
        </a>
      </div>


    </div>
  )
}

export default UserProfilePage