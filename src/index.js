import { handleRequest } from './routes.js'

// https://bun.sh/docs/api/http
// I think I can simplify my routing patterns using Bun
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
