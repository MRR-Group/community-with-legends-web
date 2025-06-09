import {User} from "../../../core/src/entities/user.ts";
import Game from "../../../core/src/entities/game.ts";
import GameItem from "./GameItem.tsx";
import Button from "./Button.tsx";
import Show from "./Show.tsx";
import {useAuth} from "../providers/authProvider.tsx";
import {useEffect, useState} from "react";
import {useCore} from "../providers/coreProvider.tsx";

interface ProposalItemProps {
  id: number,
  sender: User,
  receiver: User,
  game: Game,
  startVotes: number,
  acceptProposal: (proposalId: number) => void,
  rejectProposal: (proposalId: number) => void,
  startUserVoteType: number,
}

export default function ProposalItem({id, sender, receiver, game, startVotes, acceptProposal, rejectProposal, startUserVoteType}: ProposalItemProps) {
  const {likeProposalUseCase, dislikeProposalUseCase, removeProposalReactionUseCase} = useCore();
  const {loggedUser} = useAuth();
  const [votes, setVotes] = useState<number>(startVotes - startUserVoteType);
  const [voteType, setVoteType] = useState(startUserVoteType);

  async function handleLikeProposal() {
    await likeProposalUseCase.likeProposal(id);
    setVoteType(+1);
  }

  async function handleDislikeProposal() {
    await dislikeProposalUseCase.dislikeProposal(id);
    setVoteType(-1);
  }

  async function handleRemoveReaction() {
    await removeProposalReactionUseCase.removeReactionToProposal(id);
    setVoteType(0);
  }

  useEffect(() => {
    setVotes(startVotes - startUserVoteType);
    setVoteType(startUserVoteType);
  }, [startVotes]);

  return (
    <div className='flex flex-row'>
      <div className='max-w-28 md:max-w-41'>
        <GameItem game={game}/>
      </div>
      <div className='pl-4 pr-4'>
        <div className='pb-6 md:pb-12'>
          Suggester:
        </div>
        <div className='flex flex-col gap-2'>
          <Show when={loggedUser && loggedUser?.id === receiver.id}>
            <Button value='Accept' onClick={() => acceptProposal(id)}/>
            <Button value='Reject' onClick={() => rejectProposal(id)}/>
          </Show>
          <Show when={loggedUser && loggedUser?.id !== receiver.id && loggedUser?.id !== sender.id && voteType === 0}>
            <Button value='Vote for' onClick={handleLikeProposal}/>
            <Button value='Vote against' onClick={handleDislikeProposal}/>
          </Show>
          <Show when={loggedUser && loggedUser?.id !== receiver.id && loggedUser?.id !== sender.id && voteType !== 0}>
            <Button value='Revoke vote' onClick={handleRemoveReaction}/>
          </Show>
        </div>
        <div className='pt-3 md:pt-8'>
          Votes: {votes + voteType}
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <img src={sender.avatar} alt='Suggester Avatar' className='h-10 w-10 md:h-12 md:w-12 rounded-full bg-text object-cover'/>
        <div className='text-xs md:text-sm text-wrap text-center w-12 md:w-24'>
          {sender.name}
        </div>
      </div>
    </div>
  )
}