import db from '../../db/db.js'
import { v4 as uuidv4 } from 'uuid'

export async function createPlayer(name, age, gender, user_id) {
  const playerId = uuidv4()

  const createPlayerQuery =
    'INSERT INTO players (id, name, age, gender, user_id) VALUES (?, ?, ?, ?, ?)'
  const createPlayer = db.prepare(createPlayerQuery)
  await createPlayer.run(playerId, name, age, gender, user_id)

  const getPlayerQuery = 'SELECT name, age, gender FROM players WHERE id = ?'
  const getPlayer = db.prepare(getPlayerQuery)
  const player = await getPlayer.get(playerId)

  return player
}
