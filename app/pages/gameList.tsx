import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
	ChevronLeft,
	ChevronRight,
	File,
	Home,
	LineChart,
	ListFilter,
	MoreHorizontal,
	Package,
	Package2,
	PanelLeft,
	PlusCircle,
	Search,
	Settings,
	ShoppingCart,
	Users2,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { Tabs, TabsContent } from "~/components/ui/tabs";
import { TooltipProvider } from "~/components/ui/tooltip";
import { useState } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "~/components/ui/pagination";
import type { User } from "./login";

function GameRow({ game }: { game: Game }) {
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
			<TableCell>
				<Badge variant="outline">Draft</Badge>
			</TableCell>
			<TableCell className="hidden md:table-cell">$499.99</TableCell>
			<TableCell className="hidden md:table-cell">25</TableCell>
			<TableCell className="hidden md:table-cell">
				2023-07-12 10:42 AM
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

export type Game = {
	appid: number;
	name: string;
	playtime_forever: number;
	img_icon_url: string;
	has_community_visible_stats: boolean;
	content_descriptorids: string[];
	rtime_last_played: number;
};

export type Response = {
	response: {
		game_count: number;
		games: Game[];
	};
};

export function GameList({ games, user }: { games: Game[]; user: User }) {
	const [page, setPage] = useState(0);
	const gamesWindow = games.slice(page, page + 10);
	return (
		<TooltipProvider>
			<div className="flex min-h-screen w-full flex-col">
				<div className="flex flex-col sm:gap-4">
					<main className="grid flex-1 items-start gap-4 p-4 sm:py-0 md:gap-16">
						<Tabs defaultValue="all">
							<TabsContent value="all">
								<Card x-chunk="dashboard-06-chunk-0">
									<CardHeader>
										<CardTitle>Games</CardTitle>
										<CardDescription>See your games</CardDescription>
									</CardHeader>
									<CardContent>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead className="hidden w-[100px] sm:table-cell">
														<span className="sr-only">Image</span>
													</TableHead>
													<TableHead>Name</TableHead>
													<TableHead>Status</TableHead>
													<TableHead className="hidden md:table-cell">
														Price
													</TableHead>
													<TableHead className="hidden md:table-cell">
														Total Sales
													</TableHead>
													<TableHead className="hidden md:table-cell">
														Created at
													</TableHead>
													<TableHead>
														<span className="sr-only">Actions</span>
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{gamesWindow.map((game) => (
													<GameRow key={game.appid} game={game} />
												))}
											</TableBody>
										</Table>
									</CardContent>
									<CardFooter>
										<div className="text-xs text-muted-foreground">
											Showing <strong>1-10</strong> of <strong>32</strong>{" "}
											products
										</div>

										<Pagination className="mr-0 w-auto">
											<PaginationContent>
												<PaginationItem>
													<Button
														size="icon"
														variant="outline"
														className="h-6 w-6"
														onClick={() => setPage((prev)=>(prev-1)%games.length)}
													>
														<ChevronLeft className="h-3.5 w-3.5" />
														<span className="sr-only">Previous Order</span>
													</Button>
												</PaginationItem>
												<PaginationItem>
													<Button
														size="icon"
														variant="outline"
														className="h-6 w-6"
														onClick={() => setPage((prev)=>(prev+1)%games.length)}
													>
														<ChevronRight className="h-3.5 w-3.5" />
														<span className="sr-only">Next Order</span>
													</Button>
												</PaginationItem>
											</PaginationContent>
										</Pagination>
									</CardFooter>
								</Card>
							</TabsContent>
						</Tabs>
					</main>
				</div>
			</div>
		</TooltipProvider>
	);
}
