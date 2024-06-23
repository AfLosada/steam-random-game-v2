import type { Game } from "~/routes/main";
import { GameList } from "~/components/game-list";

export type Response = {
	response: {
		game_count: number;
		games: Game[];
	};
};

export function Main({ games }: { games: Game[] }) {
	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="grid-column-2">
				<GameList games={games}/>
			</div>
		</div>
	);
}
