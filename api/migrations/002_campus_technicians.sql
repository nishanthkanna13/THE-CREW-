
CREATE TABLE IF NOT EXISTS campus_technicians (
  login_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  grade NUMERIC(3,1) NOT NULL DEFAULT 5.0,
  completed_count INTEGER NOT NULL DEFAULT 0
);
