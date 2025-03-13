import db from '../../db/db.js'
import { v4 as uuidv4 } from 'uuid'

export async function registerUser(name, email, password) {
  const passwordHash = await Bun.password.hash(password)
  const userId = uuidv4()

  const createUserQuery =
    'INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)'
  const createUser = db.prepare(createUserQuery)
  await createUser.run(userId, name, email, passwordHash)

  const getUserQuery = 'SELECT * FROM users WHERE id = ?'
  const getUser = db.prepare(getUserQuery)
  const user = await getUser.get(userId)

  return user
}

export async function loginUser() {
  // wip
}

export async function getAllUsers() {
  const getAllUsersQuery = 'SELECT * FROM users'
  const getAllUsers = db.prepare(getAllUsersQuery)
  const allUsers = await getAllUsers.all()

  return allUsers
}
