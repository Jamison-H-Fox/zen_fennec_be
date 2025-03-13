import { Database } from 'bun:sqlite'
import fs from 'bun:fs'
import path from 'bun:path'

const db = new Database('src/db/mydb.sqlite')

const migrationDir = 'src/db/migrations'
const appliedMigrationsTable = `
   CREATE TABLE IF NOT EXISTS applied_migrations (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );`

db.run(appliedMigrationsTable)

const getAppliedMigrations = db
  .query('SELECT name FROM applied_migrations')
  .all()
  .map((row) => row.name)
const migrationFiles = fs
  .readdirSync(migrationDir)
  .filter((file) => !getAppliedMigrations.includes(file))

for (const file of migrationFiles) {
  const filePath = path.join(migrationDir, file)
  const sql = fs.readFileSync(filePath, 'utf-8')
  db.exec(sql)
  db.run('INSERT INTO applied_migrations (name) VALUES (?)', file)
  console.log(`Applied migration: ${file}`)
}

console.log('All migrations applied.')
