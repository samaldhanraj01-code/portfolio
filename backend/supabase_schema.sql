-- Run this SQL in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard → Your Project → SQL Editor

-- Step 1: Create table (skip if already exists)
CREATE TABLE IF NOT EXISTS contact_messages (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT DEFAULT '',
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop old policies if any
DROP POLICY IF EXISTS "Allow public insert" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated select" ON contact_messages;

-- Step 4: Allow anyone (anon) to INSERT
CREATE POLICY "Allow public insert"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Step 5: Allow authenticated users to SELECT (admin)
CREATE POLICY "Allow authenticated select"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Step 6: Also allow anon to select (for testing, remove in production)
CREATE POLICY "Allow anon select"
  ON contact_messages
  FOR SELECT
  TO anon
  USING (true);
