import { Authenticator } from "remix-auth";
import { SteamStrategy, type SteamStrategyVerifyParams } from "@ianlucas/remix-auth-steam";
import { sessionStorage } from "~/sessions.server";

export type User = SteamStrategyVerifyParams;

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:5173/auth/steam/callback",
      apiKey: process.env.STEAM_KEY || "", // you can get it here: https://steamcommunity.com/dev/apikey
    },
    async (user) => user // perform additional checks for user here, I just leave this to SteamStrategyVerifyParams value
  )
);