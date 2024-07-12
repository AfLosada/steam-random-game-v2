import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "./ui/card";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import { TableHeader, TableRow, TableHead, TableBody, Table } from "./ui/table";
import { useState } from "react";
import { GameRow } from "./game-row";

export type Game = {
	appid: number;
	name: string;
	playtime_forever: number;
	img_icon_url: string;
	has_community_visible_stats: boolean;
	content_descriptorids: string[];
	rtime_last_played: number;
};

export const GameList = ({ games }: { games: Game[] }) => {
	const [page, setPage] = useState(0);
	const pageSize = 5;
	const gamesWindow = games.slice(page * pageSize, (page + 1) * pageSize);
	return (
		<div className="grid flex-1 items-start gap-4 p-4 md:gap-16">
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
										<TableHead className="hidden md:table-cell">
											Playtime
										</TableHead>
										<TableHead className="hidden md:table-cell">
											Last played at
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
								Showing{" "}
								<strong>
									{page * pageSize}-{page * pageSize + pageSize}
								</strong>{" "}
								of <strong>{games.length}</strong> products
							</div>

							<Pagination className="mr-0 w-auto">
								<PaginationContent>
									<PaginationItem>
										<Button
											size="icon"
											variant="outline"
											className="h-6 w-6"
											onClick={() =>
												setPage((prev) => (prev - 1) % games.length)
											}
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
											onClick={() =>
												setPage((prev) => (prev + 1) % games.length)
											}
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
		</div>
	);
};
