
CREATE TABLE IF NOT EXISTS campus_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id TEXT NOT NULL,
  reporter_role TEXT NOT NULL,
  reporter_name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  technician_id TEXT,
  technician_note TEXT,
  grade INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
