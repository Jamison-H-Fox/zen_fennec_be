import { registerUser, loginUser, getAllUsers } from './index.js'
import { jsonResponse } from '../../utils.js'

export const userRoutes = [
  {
    pattern: '/users',
    handlers: {
      POST: async (req) => {
        const { name, email, password } = await req.json()
        const newUser = await registerUser(name, email, password)
        console.log('New user:', newUser)
        return jsonResponse(newUser)
      },
      GET: async (req) => {
        const allUsers = await getAllUsers()
        return jsonResponse(allUsers)
      },
      PUT: async (req) => {
        return new Response('PUT /users')
      },
      DELETE: async (req) => {
        return new Response('DELETE /users')
      },
    },
  },
  {
    pattern: '/users/register',
    handlers: {
      POST: async (req) => {},
    },
  },
  {
    pattern: '/users/login',
    handlers: {
      POST: async (req) => {
        const { email, password } = await req.json()
        const loginSuccessful = await loginUser(email, password)
        return new Response(
          loginSuccessful ? 'Login successful' : 'Login failed',
        )
      },
    },
  },
]
