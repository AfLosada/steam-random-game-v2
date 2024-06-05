import { json } from "@remix-run/node"; // or cloudflare/deno
import type { LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { GameList } from "~/pages/gameList";

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

export async function loader({ params, request }: LoaderFunctionArgs) {
  return {}
	const steamId = params.steamId;
	const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?steamid=${steamId}&format=json&include_appinfo=true`;
	const res = await fetch(url);
	const {
		response: { games },
	} = await res.json();
	return json(games);
}

export default function Products() {
	useLoaderData<typeof loader>();
	
	return (
		<Suspense>
			<GameList/>
		</Suspense>
	);
}
