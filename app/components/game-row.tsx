import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { Game } from "./game-list";
import { Button } from "./ui/button";
import { TableRow, TableCell } from "./ui/table";

export function GameRow({ game }: { game: Game }) {
  
	return (
		<TableRow>
			<TableCell className="hidden sm:table-cell">
				<img
					alt={`${game.name} icon`}
					className="aspect-square rounded-md object-cover"
					height="64"
					src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
					width="64"
				/>
			</TableCell>
			<TableCell className="font-medium sm:table-cell">{game.name}</TableCell>
			<TableCell className="hidden md:table-cell">
				{/* game.playtime_forever */}
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{/* new Date(game.rtime_last_played).toUTCString() */}
			</TableCell>
			<TableCell>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button aria-haspopup="true" size="icon" variant="ghost">
							<MoreHorizontal className="h-4 w-4" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
}
