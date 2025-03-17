CREATE TABLE players (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE days (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  day_of_week TEXT NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  CHECK (day_of_week IN ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'))
);

CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  player_id TEXT NOT NULL,
  day_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  FOREIGN KEY (player_id) REFERENCES players(id),
  FOREIGN KEY (day_id) REFERENCES days(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  CHECK (type IN ('daily', 'weekly')),
  CHECK (status IN ('pending', 'pass', 'missed', 'completed'))
);
