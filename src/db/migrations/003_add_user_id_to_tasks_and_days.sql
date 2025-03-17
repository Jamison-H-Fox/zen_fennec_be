ALTER TABLE days ADD COLUMN user_id TEXT NOT NULL DEFAULT 'default_user_id';
ALTER TABLE tasks ADD COLUMN user_id TEXT NOT NULL DEFAULT 'default_user_id';