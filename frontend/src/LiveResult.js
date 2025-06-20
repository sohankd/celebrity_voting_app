
export default function LiveResult (props){
	const {professions} = props;

	return (
		<div className="layout-content-container flex flex-col w-[360px]">
			<h2 className="text-yellow-500 text-[32px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Live Results</h2>
			{
				professions.map(profession => {
					const {celebrities = [], title, voteCount} = profession;

					return (
						<div key={title} className="flex flex-col gap-3 p-4">
							<h3 className="mb-2 text-white text-xl font-bold">Best {title}</h3>
							{
								celebrities.map((celeb, index, _celebrities) => {
									let percentge = parseFloat(voteCount > 0 ? ((100 * celeb['vote']) / voteCount) : 0).toFixed(2);

									return (
										<div key={celeb.id} data-nomination-title={title}>
											<div className="flex gap-6 justify-between">
												<p className="text-white text-base font-medium leading-normal">{celeb.name}</p>
												<p className="text-white text-sm font-normal leading-normal">{percentge}%</p>
											</div>
											<div className="rounded bg-[#3d4d5c]">
												<div className={ `w-0 h-2 rounded bg-yellow-500 transition-[width] duration-250 ease-in-out` } style={{width: `${percentge}%`}}></div>
											</div>
										</div>
									);
								})
							}
						</div>
					);
				})
			}
		</div>
	);
}