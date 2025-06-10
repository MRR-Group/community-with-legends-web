import Proposal from "../../../core/src/entities/proposal.ts";
import ProposalItem from "./ProposalItem.tsx";
import GameDto from "../../../core/src/dto/gameDto.ts";
import {SelectFetch} from "react-select-fetch";
import {useState} from "react";
import Button from "./Button.tsx";
import {useAuth} from "../providers/authProvider.tsx";
import Show from "./Show.tsx";
import {User} from "../../../core/src/entities/user.ts";
import toast from "react-hot-toast";
import {useTranslation} from "react-i18next";

interface ProposalsListProps {
  proposals: Proposal[],
  addProposal: (receiverId: number, gameId: number) => void,
  acceptProposal: (proposalId: number) => void,
  rejectProposal: (proposalId: number) => void,
  user: User,
}

interface SelectElement {
  value: number,
  label: string,
}

export default function ProposalsList({proposals, addProposal, acceptProposal, rejectProposal, user}: ProposalsListProps) {
  const [selectedGame, setGame] = useState<SelectElement|null>(null);
  const {loggedUser} = useAuth();
  const {t} = useTranslation('profilePage');

  async function handleAddProposal() {
    if(selectedGame) {
      setGame(null);
      addProposal(user.id, selectedGame?.value);
    }
    else {
      toast.error('Please select game');
    }
  }

  return (
    <div className='max-w-96 md:max-w-128 mx-auto w-full'>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px]'>
        <div className='relative flex gap-4 bg-background rounded-lg max-w-96 md:min-w-96 md:max-w-128 pb-4 pt-4 items-center box-border'>
          <div className='flex justify-evenly text-3xl w-full'>
            {t('Suggestions')}
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 justify-evenly max-w-96 md:min-w-96 md:max-w-128 pt-3'>
        {proposals.map((item) => (
          <ProposalItem
            key={item.id}
            id={item.id}
            sender={item.sender}
            receiver={item.receiver}
            game={item.game}
            startVotes={item.votes}
            acceptProposal={acceptProposal}
            rejectProposal={rejectProposal}
            startUserVoteType={item.user_vote_type}
          />
        ))}
      </div>
      <Show when={loggedUser?.id !== user.id}>
        <div className='flex flex-col items-center w-full px-4 pt-3'>
          <SelectFetch
            styles={{
              control: (styles) => ({...styles, backgroundColor: '#212023', color: '#FFF', border: 'none', boxShadow: 'none'}),
              option: (styles) => ({...styles, backgroundColor: '#212023', color: '#FFF'}),
              placeholder: (styles) => ({...styles, color: '#8e8f90' , fontSize: '14px', fontWeight: '400'}),
              singleValue: (styles) => ({...styles, color: '#FFF'}),
              input: (styles) => ({...styles, color: '#FFF'}),
              loadingMessage: (styles) => ({...styles, backgroundColor: '#212023', color: '#FFF'}),
            }}
            className='text-text w-full'
            placeholder={t('Select game')}
            url="/api/games/search"
            value={selectedGame}
            onChange={setGame}
            mapResponse={(response: any) => ({
              options: response.data.map((game: GameDto) => ({
                value: game.id,
                label: game.name,
              })),
              hasMore: response.links.next !== null,
            })}
            queryParams={{
              limit: 10
            }}
          />
          <div className='pt-3'>
            <Button value={t('Recommend')} onClick={handleAddProposal}/>
          </div>
        </div>
      </Show>
    </div>
  )
}