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
import UserHardware from "./components/UserHardware.tsx";
import GamesList from "./components/GamesList.tsx";
import GameOnList from "../../core/src/entities/gameOnList.ts";

function UserProfilePage() {
  const {userRepository, gameOnListRepository, authRepository} = useCore();
  const [user, setUser] = useState<User>();
  const [userGames, setUserGames] = useState<GameOnList[]>([]);
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

  async function getUserGames() {
    const games = await gameOnListRepository.byUser(Number(id));
    setUserGames(games);
  }

  async function refreshUser() {
    setUser(await userRepository.byId(Number(id)));
  }

  useEffect(() => {
    showUser();
    getUserGames();
  }, [id]);

  if (loading) {
    return <Loading isLoading={loading} active='profile' text='Loading user profile...'/>
  }

  return (
    <div>
      <NavigationBar active='profile'/>
      
      <div className='p-4 md:px-0'>
        <Show when={!inEditMode}>
          <UserProfile user={user!} onEdit={() => setInEditMode(true)}/>
        </Show>
        <Show when={inEditMode}>
          <EditProfile data={user!} onHide={() => setInEditMode(false)} onChange={refreshUser}/>
        </Show>
      </div>

      <div className='flex justify-center'>
        <a href={`/user/${id}/posts`}>
          <Button value='See Posts'/>
        </a>
      </div>

      <div className='pt-4 p-4 md:px-0'>
        <UserHardware user={user!}/>
      </div>

      <div className='flex flex-col 2.5xl:flex-row gap-6 pt-4 p-4 md:px-0 md:pb-4 pb-16'>
        <GamesList listName='Want to play' listType='to_play' games={userGames} canEdit={authRepository.User?.id === user!.id}/>
        <GamesList listName='Playing' listType='playing' games={userGames} canEdit={authRepository.User?.id === user!.id}/>
        <GamesList listName='Played' listType='played' games={userGames} canEdit={authRepository.User?.id === user!.id}/>
      </div>
    </div>
  )
}

export default UserProfilePage