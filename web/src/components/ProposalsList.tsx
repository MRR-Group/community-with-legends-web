import Proposal from "../../../core/src/entities/proposal.ts";
import ProposalItem from "./ProposalItem.tsx";
import {User} from "../../../core/src/entities/user.ts";

interface ProposalsListProps {
  sender: User,
  receiver: User,
  proposals: Proposal[],
  addProposal: () => void,
  acceptProposal: () => void,
  rejectProposal: () => void,
  likeProposal: () => void,
  dislikeProposal: () => void,
  removeReaction: () => void,
}

export default function ProposalsList({sender, receiver, proposals, addProposal, acceptProposal, rejectProposal, likeProposal, dislikeProposal, removeReaction}: ProposalsListProps) {
  return (
    <div className='max-w-96 md:max-w-128 mx-auto w-full'>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px]'>
        <div className='relative flex gap-4 bg-background rounded-lg max-w-96 md:min-w-96 md:max-w-128 pb-4 pt-4 items-center box-border'>
          <div className='flex justify-evenly text-3xl w-full'>
            Proposals
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 justify-evenly max-w-96 md:min-w-96 md:max-w-128 pt-3'>
        {proposals.map((item) => (
          <ProposalItem
            key={item.id}
            sender={sender}
            receiver={receiver}
            game={item.game}
            likeProposal={likeProposal}
            dislikeProposal={dislikeProposal}
            removeReaction={removeReaction}
            acceptProposal={acceptProposal}
            rejectProposal={rejectProposal}
          />
        ))}
      </div>
    </div>
  )
}