import type { Game } from "~/routes/main";
import { GameList } from "~/components/game-list";
import { RandomGameSelector } from "~/components/random-game";

export type Response = {
	response: {
		game_count: number;
		games: Game[];
	};
};

export function Main({ games }: { games: Game[] }) {
	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="grid-column-2 grid flex-1 items-center gap-4 p-4 md:gap-16">
				<RandomGameSelector games={games} />
			</div>
			<div className="grid-column-2">
				<GameList games={games} />
			</div>
		</div>
	);
}
