import { createPlayer, getAllPlayers, updatePlayer } from './index.js'
import { authenticate } from '../../utlis/auth.js'

export const playerRoutes = {
  '/players': {
    POST: async (req) => {
      // I feel like I'm repeting this try/catch block a lot
      // I wonder if I can handle this further up???
      try {
        const decoded = await authenticate(req)
        const userId = decoded.id
        const { name, age, gender } = await req.json()

        const newPlayer = await createPlayer(name, age, gender, userId)
        return Response.json(newPlayer)
      } catch (err) {
        return new Response(err.message, { status: 401 })
      }
    },
    GET: async (req) => {
      try {
        const decoded = await authenticate(req)
        const userId = decoded.id

        const players = await getAllPlayers(userId)
        return Response.json(players)
      } catch (err) {
        return new Response(err.message, { status: 401 })
      }
    },
    PUT: async (req) => {
      try {
        await authenticate(req)
        const { playerId, name, age, gender } = await req.json()
        console.log('\n---\nplayerId:', playerId)
        console.log('name:', name)
        console.log('age:', age)
        console.log('gender:', gender, '\n---\n')

        const updatedPlayer = await updatePlayer(playerId, {
          name,
          age,
          gender,
        })

        return Response.json(updatedPlayer)
      } catch (err) {
        return new Response(err.message, { status: 401 })
      }
    },
    DELETE: async () => {
      return Response.json({ message: 'DELETE request to /players' })
    },
  },
}
