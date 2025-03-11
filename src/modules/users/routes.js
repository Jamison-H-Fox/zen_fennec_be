import { registerUser, loginUser, getAllUsers } from './index.js'
import { jsonResponse } from '../../utils.js'

export const userRoutes = {
  '/users': {
    POST: async (req) => {
      const { name, email, password } = await req.json()
      // TODO: add error handling for duplicate email
      const newUser = await registerUser(name, email, password)
      console.log('New user:', newUser)

      return Response.json(newUser)
    },
    GET: async () => {
      const allUsers = await getAllUsers()

      return Response.json(allUsers)
    },
    PUT: async () => {
      return Response.json({ message: 'POST request to /users' })
    },
    DELETE: async () => {
      return Response.json({ message: 'DELETE request to /users' })
    },
  },
}
