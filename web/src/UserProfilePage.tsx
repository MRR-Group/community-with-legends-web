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
import {useAuth} from "./providers/authProvider.tsx";

function UserProfilePage() {
  const {userRepository, gameOnListRepository, addGameToListUseCase, removeGameFromListUseCase} = useCore();
  const {loggedUser} = useAuth();
  const [user, setUser] = useState<User>();
  const [userGames, setUserGames] = useState<GameOnList[]>([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const {errors, handleError, clearErrors} = useErrorHandler();
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

  async function handleAddGameToList(gameId?: number, listType?: 'to_play'|'playing'|'played') {
    const chosenGame = await addGameToListUseCase.addGameToList(gameId, listType);

    addGameToList(chosenGame);
  }

  function addGameToList(chosenGame: GameOnList) {
    setUserGames((games) => [...games.filter((item) => item.game.id !== chosenGame.game.id), chosenGame])
  }

  async function handleRemoveGameFromList(gameId: number) {
    await removeGameFromListUseCase.removeGameFromList(gameId);

    removeGameFromList(gameId);
  }

  function removeGameFromList(gameId: number) {
    setUserGames((games) => games.filter((item) => item.id !== gameId));
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

      <UserHardware user={user!}/>

      <Show when={loggedUser?.id === Number(id) || userGames.length > 0}>
        <div className='flex flex-col 2.5xl:flex-row gap-6 pt-4 p-4 md:px-0'>
          <GamesList listName='Want to play' listType='to_play' games={userGames} canEdit={loggedUser?.id === Number(id)} errors={errors} onAdd={handleAddGameToList} onDelete={handleRemoveGameFromList}/>
          <GamesList listName='Playing' listType='playing' games={userGames} canEdit={loggedUser?.id === Number(id)} errors={errors} onAdd={handleAddGameToList} onDelete={handleRemoveGameFromList}/>
          <GamesList listName='Played' listType='played' games={userGames} canEdit={loggedUser?.id === Number(id)} errors={errors} onAdd={handleAddGameToList} onDelete={handleRemoveGameFromList}/>
        </div>
      </Show>

      <div className='md:pb-4 pb-16'>

      </div>
    </div>
  )
}

export default UserProfilePage