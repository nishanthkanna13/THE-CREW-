
INSERT INTO campus_reports (
  reporter_id,
  reporter_role,
  reporter_name,
  category,
  location,
  description,
  status,
  technician_id,
  technician_note,
  grade
)
SELECT
  'student@123',
  'student',
  'Demo Student',
  'Electrical',
  'Block A · Room 204',
  'Classroom light is not working.',
  'Assigned',
  '@rathinamtech1',
  'Task received. Will inspect the classroom lighting.',
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM campus_reports
  WHERE description='Classroom light is not working.'
);
