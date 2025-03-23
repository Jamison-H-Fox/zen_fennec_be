import { registerUser, loginUser, getAllUsers } from './index.js'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY

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
  '/users/login': {
    POST: async (req) => {
      const { email, password } = await req.json()
      const user = await loginUser(email, password)

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: '1y',
      })

      console.log('Logged in user:', user)
      return Response.json({ user, token })
    },
  },
}
