import db from '../../../db/db.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

async function registerUser(name, email, password) {
  const passwordHash = await bcrypt.hash(password, 10)
  const userId = uuidv4()
  db.run(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?, ?)',
    userId,
    name,
    email,
    passwordHash,
  )
  console.log('User registered:', { userId, name, email })
}

async function loginUser(email, password) {
  const user = db.query('SELECT * FROM users WHERE email = ?', email).get()
  if (user && (await bcrypt.compare(password, user.password_hash))) {
    console.log('Login successful:', { email })
    return true
  } else {
    console.log('Login failed:', { email })
    return false
  }
}

module.exports = {
  registerUser,
  loginUser,
}
