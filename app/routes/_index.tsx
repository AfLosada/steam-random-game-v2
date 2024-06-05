import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { LoginPage } from "~/pages/login";
import clsx from "clsx"
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes"
import { themeSessionResolver } from "~/sessions.server";
import { useLoaderData } from "@remix-run/react";
import { Header } from "~/components/header";
import { authenticator } from "~/auth.server";

 
// Return the theme from the session storage using the loader
export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request)
	//https://github.com/Andreychik32/remix-auth-steam#file-structure
  const user = await authenticator.isAuthenticated(request)
  return {
    theme: getTheme(),
    user
  }
}


// Wrap your app with ThemeProvider.
// `specifiedTheme` is the stored theme in the session storage.
// `themeAction` is the action name that's used to change the theme in the session storage.
export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>()
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <LoginPage user={data.user}/>
    </ThemeProvider>
  )
}

export const meta: MetaFunction = () => {
	return [
		{ title: "Random Steam Game App" },
		{ name: "description", content: "Random Game of your Steam!" },
	];
};
