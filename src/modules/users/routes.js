const userRoutes = [
  {
    pattern: '/users',
    handlers: {
      GET: async (req) => {
        return new Response('GET /users')
      },
      POST: async (req) => {
        return new Response('POST /users')
      },
    },
  },
]

module.exports = {
  userRoutes,
}
