import { useState } from "react";
import type { Game } from "./game-list";
import { Button } from "./ui/button";
import { GameRow } from "./game-row";

export type RandomGameSelectorProps = {
	games: Game[];
};

export const RandomGameSelector = ({ games }: RandomGameSelectorProps) => {
	const [randomGame, setRandomGame] = useState<Game>();

	const selectRandomGame = () => {
		const randomGamePosition = Math.random() * games.length - 1;
		setRandomGame(games[randomGamePosition]);
	};

	return (
		<div>
			<Button onClick={selectRandomGame}>Click to pick a random game</Button>
			{randomGame && <GameRow game={randomGame} />}
		</div>
	);
};
