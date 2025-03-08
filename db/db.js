import { Database } from 'bun:sqlite'
import { join } from 'node:path'

const dbPath = join(__dirname, 'mydb.sqlite')
const db = new Database(dbPath)

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )
`)

export default db
