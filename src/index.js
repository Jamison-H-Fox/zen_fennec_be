import { handleRequest } from './routes.js'

const serverOptions = {
  port: 4000,
  fetch(req) {
    return handleRequest(req)
  },
}

const main = async () => {
  Bun.serve(serverOptions)
  console.log(`Listening on http://localhost:${serverOptions.port} ...`)
}

main()
