import { userRoutes } from './modules/users/routes.js'

export const routes = {
  '/': {
    GET: () => Response.json({ message: 'Hello, world!' }),
  },
  ...userRoutes,
}
