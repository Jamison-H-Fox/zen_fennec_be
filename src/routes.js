import { userRoutes } from './modules/users/routes.js'
import { playerRoutes } from './modules/players/routes.js'

export const routes = {
  '/': {
    GET: () => Response.json({ message: 'Hello, world!' }),
  },
  ...userRoutes,
  ...playerRoutes,
}
