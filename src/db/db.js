import { Database } from 'bun:sqlite'
import { join } from 'node:path'

const dbPath = join(__dirname, 'mydb.sqlite')
const db = new Database(dbPath)

export default db
