
export default function Candidate (props) {
    const {candidate = {}, handleVoting} = props;

    const fallbackImge = function(event) {
        event.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuB5F4VbADlFcmJi-XCOeuSzZfaqUoj2MLEylFGjf0nV0B-ho4VzSmmrMlnSYovIRAbK0kDMEw9qUREs3Mvvv8V2BSMMSl26fFQSneaHWwSxOwK-JIeVyZH8N_37teQgcAXhZuYubOV97hF3b9BkFxWJSRuu89EN6R6hNqrXP_DDJJEnZIeH18LzmH7j1NzniugkSmMdx3lNEoOD9fuSnwEzkjasLDDAU0jG6U8PI_cb2VxrrfmRLjSYKkuGPq5_Xv8LF61-FtNpgr4";
    };

    return (
        <>
            <div className="flex flex-col gap-3 text-center pb-3">
                <div className="px-4 cursor-pointer" onClick={handleVoting} data-id={candidate._id} role="button">
                    <img className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" src={candidate.thumbnail} alt={candidate.name} onError={fallbackImge} />
                </div>
                <p className="text-white text-base font-medium leading-normal">{candidate.name}</p>
            </div>
        </>
    );
};