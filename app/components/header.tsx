import { json, useLoaderData } from "@remix-run/react";
import { ModeToggle } from "./mode-toggle";
import type { LoaderFunctionArgs } from "@remix-run/node";

export type Player = {
	steamid: string;
	communityvisibilitystate: number;
	profilestate: number;
	personaname: string;
	profileurl: string;
	avatar: string;
	avatarmedium: string;
	avatarfull: string;
	avatarhash: string;
	personastate: string;
	realname: string;
	primaryclanid: string;
	timecreated: number;
	personastateflags: number;
	loccountrycode: string;
	locstatecode: string;
	loccityid: number;
};

export async function loader({ params, request }: LoaderFunctionArgs) {
	const steamId = params.steamId;
	const steamKey = process.env.STEAM_KEY;
	const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamKey}&steamids=${steamId}`;
	const res = await fetch(url);
	const {
		response: { players },
	} = await res.json();
	return json(
		players.first() || {
			avatarmedium:
				"https://th.bing.com/th?id=OSK.2aeea85494562513165ee6986eceda50&w=102&h=102&c=7&o=6&oif=webp&pid=SANGAM",
			personaname: "Please login",
			personastate: "You must",
		},
	);
}

export function Header() {

	const steamPlayer: Player = useLoaderData<typeof loader>();

	return (
		<header className="flex items-center justify-between px-4 py-2 md:py-4 absolute">
			<ModeToggle/>
		</header>
	);
}
