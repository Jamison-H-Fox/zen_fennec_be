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

// TODO: implement this helper function prepareQuery()

export default db

// To manage database migrations without using an ORM or query builder tools, you can write your own migration scripts using plain SQL and the built-in Bun SQLite drivers. Here is a step-by-step guide on how to manage migrations:

// 1. **Create a Migration Directory**: Create a directory to store your migration scripts. Each script will be a separate SQL file.

//    ```sh
//    mkdir migrations
//    ```

// 2. **Write Migration Scripts**: Create migration scripts in the `migrations` directory. Name them sequentially or with timestamps to keep track of the order. For example:

//    ```sh
//    touch migrations/001_create_users_table.sql
//    touch migrations/002_add_email_to_users.sql
//    ```

//    In `001_create_users_table.sql`:

//    ```sql
//    CREATE TABLE users (
//        id INTEGER PRIMARY KEY AUTOINCREMENT,
//        name TEXT NOT NULL
//    );
//    ```

//    In `002_add_email_to_users.sql`:

//    ```sql
//    ALTER TABLE users ADD COLUMN email TEXT;
//    ```

// 3. **Create a Migration Runner Script**: Write a script to run the migrations in order. This script will read each migration file and execute the SQL statements.

//    Create a file `migrate.js`:

//    ```javascript
//    import { Database } from 'bun:sqlite';
//    import fs from 'fs';
//    import path from 'path';

//    const db = new Database('path/to/your/database.sqlite');

//    const migrationDir = './migrations';
//    const appliedMigrationsTable = `
//    CREATE TABLE IF NOT EXISTS applied_migrations (
//        id INTEGER PRIMARY KEY AUTOINCREMENT,
//        name TEXT NOT NULL,
//        applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
//    );`;

//    db.run(appliedMigrationsTable);

//    const getAppliedMigrations = db.query('SELECT name FROM applied_migrations').all().map(row => row.name);
//    const migrationFiles = fs.readdirSync(migrationDir).filter(file => !getAppliedMigrations.includes(file));

//    for (const file of migrationFiles) {
//        const filePath = path.join(migrationDir, file);
//        const sql = fs.readFileSync(filePath, 'utf-8');
//        db.exec(sql);
//        db.run('INSERT INTO applied_migrations (name) VALUES (?)', file);
//        console.log(`Applied migration: ${file}`);
//    }

//    console.log('All migrations applied.');
//    ```

// 4. **Run Migrations**: Execute the migration runner script whenever you need to apply new migrations.

//    ```sh
//    bun migrate.js
//    ```

// ### Explanation

// - **Migration Directory**: Stores SQL files for each migration.
// - **Migration Files**: Each file contains SQL statements for a specific migration.
// - **Migration Runner Script**:
//   - Initializes the database connection.
//   - Ensures the `applied_migrations` table exists to keep track of applied migrations.
//   - Reads all migration files and filters out those that have already been applied.
//   - Reads and executes the SQL statements in each migration file.
//   - Records the applied migration in the `applied_migrations` table.

// By following these steps, you can manage database migrations using plain SQL and Bun's built-in SQLite drivers without relying on an ORM or query builder.
