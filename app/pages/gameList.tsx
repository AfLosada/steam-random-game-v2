import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
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
import { authenticator } from "~/auth.server";

import { Badge } from "~/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
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
import { Input } from "~/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "~/components/ui/tooltip";

function Row(game: Game) {
  return (<TableRow>
    <TableCell className="hidden sm:table-cell">
      <img
        alt={`${game.name} icon`}
        className="aspect-square rounded-md object-cover"
        height="64"
        src={game.img_icon_url}
        width="64"
      />
    </TableCell>
    <TableCell className="font-medium">
      {game.name}
    </TableCell>
    <TableCell>
      <Badge variant="outline">Draft</Badge>
    </TableCell>
    <TableCell className="hidden md:table-cell">
      $499.99
    </TableCell>
    <TableCell className="hidden md:table-cell">
      25
    </TableCell>
    <TableCell className="hidden md:table-cell">
      2023-07-12 10:42 AM
    </TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-haspopup="true"
            size="icon"
            variant="ghost"
          >
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
  </TableRow>)
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

export async function loader({ request }: LoaderFunctionArgs) {
	const steamKey = import.meta.env.STEAM_KEY;
  const user = await authenticator.isAuthenticated(request)
	const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamKey}&steamid=${user?.user.steamID}&format=json&include_appinfo=true`;
	const res = await fetch(url);
	const {
		response: { games },
	} = await res.json();
	return json(games);
}

export function GameList() {
	const games: Game[] = useLoaderData<typeof loader>();
	return (
		<TooltipProvider>
			<div className="flex min-h-screen w-full flex-col bg-muted/40">
				<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
					<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 flex-row-reverse">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									className="overflow-hidden rounded-full"
								>
									<img
										src="/placeholder-user.jpg"
										width={36}
										height={36}
										alt="Avatar"
										className="overflow-hidden rounded-full"
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem>Support</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</header>
					<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
						<Tabs defaultValue="all">
							<TabsContent value="all">
								<Card x-chunk="dashboard-06-chunk-0">
									<CardHeader>
										<CardTitle>Games</CardTitle>
										<CardDescription>
											See your games
										</CardDescription>
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
                        {games.map(()=><Row/>)}
                      </TableBody>
										</Table>
									</CardContent>
									<CardFooter>
										<div className="text-xs text-muted-foreground">
											Showing <strong>1-10</strong> of <strong>32</strong>{" "}
											products
										</div>
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
