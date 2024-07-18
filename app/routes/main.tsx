import { json } from "@remix-run/node"; // or cloudflare/deno
import type { LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { authenticator } from "~/services/auth.server";
import { GameList } from "~/components/game-list";
import type { User } from "~/pages/login";
import { Main } from "~/pages/main";

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
	const steamKey = process.env.STEAM_KEY;

	console.log("main loader");
	const user = await authenticator.isAuthenticated(request);
	console.log(user);
	console.log(request);
	//TODO: https://steamapi.xpaw.me/#ISteamWebAPIUtil/GetSupportedAPIList
	const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamKey}&steamid=${user?.user.steamID || ""}&format=json&include_appinfo=true`;
	const res = await fetch(url);
	if (res.ok) {
		const {
			response: { games },
		} = await res.json();
		return json({ games, user });
	}
	return { games: [], user };
}

export default function Products() {
	const { games = [] } = useLoaderData<typeof loader>();

	return (
		<Suspense>
			<Main games={games} />
		</Suspense>
	);
}
