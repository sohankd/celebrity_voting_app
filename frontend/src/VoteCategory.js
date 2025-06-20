import Candidate from "./Candidate";

export default function VoteCategory (props) {
    const {profession, celebrities: candidates, handleVoting} = props;

    return (
        <section className="nomination-category-wrapper">
            <h1 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Best {profession}</h1>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4 mb-5">
                {
                    candidates.map(candidate => <Candidate key={candidate.id} candidate={candidate} handleVoting={handleVoting} />)
                }
            </div>
        </section>
    );
};