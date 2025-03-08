import { matchPath, jsonResponse } from './utils'
import { userRoutes } from './modules/users/routes.js'

const routes = [
  {
    pattern: '/',
    handlers: {
      GET: () => jsonResponse({ message: 'Hello, world!' }),
    },
  },
  ...userRoutes,
]

export async function handleRequest(req) {
  const url = new URL(req.url)
  const path = url.pathname
  const method = req.method
  console.log(`Request: ${method} ${path}`)

  for (const route of routes) {
    const params = matchPath(route.pattern, path)
    console.log('Params:', params)

    if (params !== null) {
      const handler = route.handlers[method]

      if (handler) {
        return await handler(req, params)
      } else {
        return new Response('Method not allowed', {
          status: 405,
          headers: {
            Allow: Object.keys(route.handlers).join(', '),
            'Content-Type': 'text/plain',
          },
        })
      }
    }
  }

  return new Response('Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
