import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY

export async function authenticate(req) {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized: Missing or invalid token')
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    return decoded
  } catch {
    throw new Error('Unauthorized: Invalid token')
  }
}
