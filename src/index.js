import { routes } from './routes.js'

const serverOptions = {
  port: 4000,
  routes: {
    ...routes,
  },
}

const main = async () => {
  Bun.serve(serverOptions)
  console.log(`Listening on http://localhost:${serverOptions.port} ...`)
}

main()
