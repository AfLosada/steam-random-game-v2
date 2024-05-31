import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { LoginPage } from "~/pages/login";
import clsx from "clsx"
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes"
import { themeSessionResolver } from "~/sessions.server";
import { useLoaderData } from "@remix-run/react";
import { Header } from "~/components/header";
 
// Return the theme from the session storage using the loader
export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request)
  return {
    theme: getTheme(),
  }
}
// Wrap your app with ThemeProvider.
// `specifiedTheme` is the stored theme in the session storage.
// `themeAction` is the action name that's used to change the theme in the session storage.
export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>()
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <LoginPage />
    </ThemeProvider>
  )
}

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};
