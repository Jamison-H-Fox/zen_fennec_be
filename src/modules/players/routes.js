import { createPlayer } from './index.js'
import { authenticate } from '../../utlis/auth.js'

export const playerRoutes = {
  '/players': {
    POST: async (req) => {
      try {
        const decoded = await authenticate(req)
        const { name, age, gender } = await req.json()
        const user_id = decoded.id

        const newPlayer = await createPlayer(name, age, gender, user_id)
        return Response.json(newPlayer)
      } catch (err) {
        return new Response(err.message, { status: 401 })
      }
    },
    GET: async () => {
      return Response.json({ message: 'GET request to /players' })
    },
    PUT: async () => {
      return Response.json({ message: 'PUT request to /players' })
    },
    DELETE: async () => {
      return Response.json({ message: 'DELETE request to /players' })
    },
  },
}
