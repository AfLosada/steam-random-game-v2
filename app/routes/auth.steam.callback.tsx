import type { LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.authenticate('steam', request, {
    successRedirect: '/main',
    failureRedirect: '/',
  })
}