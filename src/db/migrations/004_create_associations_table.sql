-- Create the associations table
CREATE TABLE associations (
  id TEXT PRIMARY KEY,
  player_id TEXT NOT NULL,
  task_id TEXT NOT NULL,
  day_id TEXT NOT NULL,
  FOREIGN KEY (player_id) REFERENCES players(id),
  FOREIGN KEY (task_id) REFERENCES tasks(id),
  FOREIGN KEY (day_id) REFERENCES days(id)
);

-- Remove the player_id, day_id, and type fields from the tasks table
CREATE TABLE tasks_new (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  user_id TEXT NOT NULL,
  status TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  CHECK (status IN ('pending', 'pass', 'missed', 'completed'))
);

-- Copy data from the old tasks table to the new tasks table
INSERT INTO tasks_new (id, name, user_id, status)
SELECT id, name, user_id, status
FROM tasks;

-- Drop the old tasks table
DROP TABLE tasks;

-- Rename the new tasks table to tasks
ALTER TABLE tasks_new RENAME TO tasks;