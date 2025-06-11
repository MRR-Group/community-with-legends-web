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
import ProposalsList from "./components/ProposalsList.tsx";
import Proposal from "../../core/src/entities/proposal.ts";
import {useTranslation} from "react-i18next";
import {useLoadDefaultLanguage} from "./translations.ts";

function UserProfilePage() {
  const {userRepository, gameOnListRepository, addGameToListUseCase, removeGameFromListUseCase, proposalRepository, createProposalUseCase, acceptProposalUseCase, rejectProposalUseCase} = useCore();
  const {loggedUser} = useAuth();
  const [user, setUser] = useState<User>();
  const [userGames, setUserGames] = useState<GameOnList[]>([]);
  const [gameProposals, setGameProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const {errors, handleError, clearErrors} = useErrorHandler();
  const [inEditMode, setInEditMode] = useState<boolean>(false);
  const {t} = useTranslation('profilePage');

  useLoadDefaultLanguage();

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

  async function getUserProposals() {
    const proposals = await proposalRepository.byUser(Number(id));
    setGameProposals(proposals);
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

  async function handleAddProposal(receiverId: number, gameId: number) {
    const proposedGame = await createProposalUseCase.createProposal(receiverId, gameId);

    addProposalToList(proposedGame);
  }

  function addProposalToList(proposedGame: Proposal) {
    setGameProposals((proposals) => [...proposals.filter((item) => item.game.id !== proposedGame.game.id), proposedGame])
  }

  async function handleAcceptProposal(proposalId: number) {
    const gameOnList = await acceptProposalUseCase.acceptProposal(proposalId);

    addGameToList(gameOnList);
    removeProposalFromList(proposalId);
  }

  async function handleRejectProposal(proposalId: number) {
    await rejectProposalUseCase.rejectProposal(proposalId);

    removeProposalFromList(proposalId);
  }

  function removeProposalFromList(proposalId: number) {
    setGameProposals((proposals) => proposals.filter((item) => item.id !== proposalId));
  }

  useEffect(() => {
    showUser();
    getUserGames();
    getUserProposals();
  }, [id]);

  if (loading) {
    return <Loading isLoading={loading} active='profile' text={t('Loading user profile...')}/>
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
          <Button value={t('See posts')}/>
        </a>


      </div>

      <UserHardware user={user!}/>

      <Show when={loggedUser?.id === Number(id) || userGames.length > 0}>
        <div className='flex flex-col 2.5xl:flex-row gap-6 pt-4 p-4 md:px-0'>
          <GamesList listName={t('Want to play')} listType='to_play' games={userGames} canEdit={loggedUser?.id === Number(id)} errors={errors} onAdd={handleAddGameToList} onDelete={handleRemoveGameFromList}/>
          <GamesList listName={t('Playing')} listType='playing' games={userGames} canEdit={loggedUser?.id === Number(id)} errors={errors} onAdd={handleAddGameToList} onDelete={handleRemoveGameFromList}/>
          <GamesList listName={t('Played')} listType='played' games={userGames} canEdit={loggedUser?.id === Number(id)} errors={errors} onAdd={handleAddGameToList} onDelete={handleRemoveGameFromList}/>
        </div>
      </Show>

      <div className='pt-4 p-4 md:px-0'>
        <ProposalsList
          proposals={gameProposals}
          addProposal={handleAddProposal}
          acceptProposal={handleAcceptProposal}
          rejectProposal={handleRejectProposal}
          user={user!}
        />
      </div>

      <div className='md:pb-4 pb-16'>
      </div>
    </div>
  )
}

export default UserProfilePage