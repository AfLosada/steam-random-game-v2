import type { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  console.log("request")
  console.log(request)
  await authenticator.authenticate('steam', request, {});
};
//auth/steam/callback
//auth/steam