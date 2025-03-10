import { Database } from 'bun:sqlite'
import { join } from 'node:path'

const dbPath = join(__dirname, 'mydb.sqlite')
const db = new Database(dbPath)

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  )
`)

// prepareQuery()

export default db
