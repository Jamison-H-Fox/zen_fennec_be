import db from '../../db/db.js'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

export async function createPlayer(name, age, gender, userId) {
  const playerId = uuidv4()

  const createPlayerQuery =
    'INSERT INTO players (id, name, age, gender, user_id) VALUES (?, ?, ?, ?, ?)'
  const createPlayer = db.prepare(createPlayerQuery)
  await createPlayer.run(playerId, name, age, gender, userId)

  const getPlayerQuery = 'SELECT name, age, gender FROM players WHERE id = ?'
  const getPlayer = db.prepare(getPlayerQuery)
  const player = await getPlayer.get(playerId)

  return player
}

export async function getAllPlayers(userId) {
  const getPlayersQuery =
    'SELECT id, name, age, gender from players WHERE user_id = ?'
  const getPlayers = db.prepare(getPlayersQuery)
  const players = await getPlayers.all(userId)

  return players
}

export async function getPlayer(playerId) {
  const getPlayerQuery = 'SELECT * FROM players WHERE id = ?'
  const getPlayer = db.prepare(getPlayerQuery)
  const player = await getPlayer.get(playerId)

  if (!player) {
    throw new Error(`Player with id: ${playerId} not found`)
  }

  return player
}

export async function updatePlayer(playerId, updates) {
  const player = await getPlayer(playerId)
  const filteredUpdates = _.omitBy(updates, _.isUndefined)
  const updatedValues = { ...player, ...filteredUpdates }

  const updatePlayerQuery = `UPDATE players SET name = ?,
                         age = ?,
                         gender = ?
                         WHERE id = ?`

  const updatePlayer = db.prepare(updatePlayerQuery)
  await updatePlayer.run(
    updatedValues.name,
    updatedValues.age,
    updatedValues.gender,
    playerId,
  )

  const updatedPlayer = await getPlayer(playerId)

  return updatedPlayer
}
