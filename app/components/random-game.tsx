import { useState } from "react";
import type { Game } from "./game-list";
import { Button } from "./ui/button";
import { GameRow } from "./game-row";
import { TableHeader, TableRow, TableHead, Table, TableBody } from "./ui/table";

export type RandomGameSelectorProps = {
	games: Game[];
};

const SelectedGameRow = ({ randomGame }: { randomGame?: Game }) => {
	return (
		randomGame && (
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="hidden w-[100px] sm:table-cell">
							<span className="sr-only">Image</span>
						</TableHead>
						<TableHead>Name</TableHead>
						<TableHead className="hidden md:table-cell">Playtime</TableHead>
						<TableHead className="hidden md:table-cell">
							Last played at
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>{<GameRow game={randomGame} />}</TableBody>
			</Table>
		)
	);
};

export const RandomGameSelector = ({ games }: RandomGameSelectorProps) => {
	const [randomGame, setRandomGame] = useState<Game>();

	const selectRandomGame = () => {
		const randomGamePosition = Math.floor(Math.random() * games.length - 1);
		console.log(randomGamePosition);
		setRandomGame(games[randomGamePosition]);
	};

	return (
		<div className="justify-evenly items-center flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
			<SelectedGameRow randomGame={randomGame} />
			<div  className="justify-end items-end w-full flex p-4">
				<Button onClick={selectRandomGame}>Pick a random game</Button>
			</div>
		</div>
	);
};
