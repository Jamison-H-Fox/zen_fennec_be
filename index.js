import figlet from 'figlet'
import db from './db/db.js'

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const body = figlet.textSync('Bun!')
    return new Response(body)
  },
})

console.log(`Listening on http://localhost:${server.port} ...`)

db.run(
  'INSERT INTO users (name, email) VALUES (?, ?)',
  'John Doe',
  'john@example.com',
)
const users = db.query('SELECT * FROM users').all()
console.log(users)
