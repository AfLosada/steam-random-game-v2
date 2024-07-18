import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === "production";

const calculateExpirationDate = (days: number) => {
  const expDate = new Date()
  expDate.setDate(expDate.getDate() + days)
  return expDate
}

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "_session",
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		secrets: ["s3cr3t"],
		// Set domain and secure only if in production
		...(isProduction
			? { domain: "https://steam-random-game-v2.vercel.app", secure: true }
			: {}),
    expires: calculateExpirationDate(7) // expire cookie after 7 days
	},
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);

export const { getSession, commitSession, destroySession } = sessionStorage;