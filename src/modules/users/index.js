import db from '../../db/db.js'
import { v4 as uuidv4 } from 'uuid'

export async function registerUser(name, email, password) {
  const passwordHash = await Bun.password.hash(password)
  const userId = uuidv4()

  // I should abstract a prepareQuery() function tho
  const createUserQuery =
    'INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)'
  const createUser = db.prepare(createUserQuery)
  await createUser.run(userId, name, email, passwordHash)

  // it seems like sqlite can't return * from insert
  // so we have to do a separate query to get the user
  const getUserQuery = 'SELECT * FROM users WHERE id = ?'
  const getUser = db.prepare(getUserQuery)
  const user = await getUser.get(userId)

  return user
}

export async function loginUser(email, password) {
  const user = db.query('SELECT * FROM users WHERE email = ?', email).get()
  if (user && (await bcrypt.compare(password, user.password_hash))) {
    console.log('Login successful:', { email })
    return true
  } else {
    console.log('Login failed:', { email })
    return false
  }
}

export async function getAllUsers() {
  const getAllUsersQuery = 'SELECT * FROM users'
  const getAllUsers = db.prepare(getAllUsersQuery)
  const allUsers = await getAllUsers.all()

  return allUsers
}
