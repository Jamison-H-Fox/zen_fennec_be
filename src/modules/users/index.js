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

export async function loginUser(email, password) {
  const getUserByEmailQuery = 'SELECT * FROM users WHERE email = ?'
  const getUserByEmail = db.prepare(getUserByEmailQuery)
  const user = await getUserByEmail.get(email)

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isPasswordValid = await Bun.password.verify(
    password,
    user.password_hash,
  )

  if (!isPasswordValid) {
    throw new Error('Invalid email or password')
  }

  const { password_hash, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function getAllUsers() {
  const getAllUsersQuery = 'SELECT name, email FROM users'
  const getAllUsers = db.prepare(getAllUsersQuery)
  const allUsers = await getAllUsers.all()

  return allUsers
}
