import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { LoginPage } from "~/pages/login";
import {
	ThemeProvider,
} from "remix-themes";
import { themeSessionResolver } from "~/sessions";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { authenticator } from "~/auth.server";
import { useEffect } from "react";

// Return the theme from the session storage using the loader
export async function loader({ request }: LoaderFunctionArgs) {
	const { getTheme } = await themeSessionResolver(request);
	//https://github.com/Andreychik32/remix-auth-steam#file-structure
	const user = await authenticator.isAuthenticated(request);
	return {
		theme: getTheme(),
		user,
	};
}

// Wrap your app with ThemeProvider.
// `specifiedTheme` is the stored theme in the session storage.
// `themeAction` is the action name that's used to change the theme in the session storage.
export default function AppWithProviders() {
	const { user, theme } = useLoaderData<typeof loader>();

	console.log(user)

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/main");
		}
	}, [user, navigate]);

	return (
		<ThemeProvider specifiedTheme={theme} themeAction="/action/set-theme">
			<LoginPage />
		</ThemeProvider>
	);
}

export const meta: MetaFunction = () => {
	return [
		{ title: "Random Steam Game App" },
		{ name: "description", content: "Random Game of your Steam!" },
	];
};
