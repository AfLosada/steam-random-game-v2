import type { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  console.log("request")
  console.log(request)
  await authenticator.authenticate('steam', request, {
    successRedirect: '/main',
    failureRedirect: '/',
  });
};
//auth/steam/callback
//auth/steam