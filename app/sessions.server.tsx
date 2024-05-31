import { createCookieSessionStorage } from "@remix-run/node"
import { createThemeSessionResolver } from "remix-themes"


//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
//https://aarongodin.dev/blog/adding-oauth-oidc-to-a-remix-app
import { Issuer } from "openid-client"
import type { Client } from "openid-client"

let client: Client

async function getClient(): Promise<Client> {
  if (client !== undefined) {
    return client
  }
  
  const issuer = await Issuer.discover(config.oidcIssuer)
  client = new issuer.Client({
    client_id: config.oidcClientID,
    client_secret: config.oidcClientSecret,
    redirect_uris: [`${config.oidcRedirectBase}/auth/callback`],
    response_types: ['code'],
  })
  return client
}

// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === "production"

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    // Set domain and secure only if in production
    ...(isProduction
      ? { domain: "your-production-domain.com", secure: true }
      : {}),
  },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)
