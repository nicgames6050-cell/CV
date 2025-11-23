/*
  # Create Access Control Table

  1. New Tables
    - `access_control`
      - `id` (uuid, primary key) - Unique identifier for each record
      - `person_name` (text, unique, not null) - Name of the person (Brendan, Ethan, Jackson, Hunter, Bryson, Nic)
      - `status` (text, not null) - Access status ('approved' or 'denied')
      - `updated_at` (timestamptz) - Timestamp of last update
      - `created_at` (timestamptz) - Timestamp of creation

  2. Security
    - Enable RLS on `access_control` table
    - Add policy for public read access (anyone can check access status)
    - Add policy for authenticated users to update status (for admin functionality)

  3. Initial Data
    - Insert initial records for all 6 people with 'approved' status
*/

-- Create access_control table
CREATE TABLE IF NOT EXISTS access_control (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_name text UNIQUE NOT NULL,
  status text NOT NULL CHECK (status IN ('approved', 'denied')),
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE access_control ENABLE ROW LEVEL SECURITY;

-- Policy for public read access (anyone can check if they're approved/denied)
CREATE POLICY "Anyone can read access status"
  ON access_control
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy for authenticated users to update (admin functionality)
CREATE POLICY "Authenticated users can update access status"
  ON access_control
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial data for all 6 people
INSERT INTO access_control (person_name, status)
VALUES
  ('Brendan', 'approved'),
  ('Ethan', 'approved'),
  ('Jackson', 'approved'),
  ('Hunter', 'approved'),
  ('Bryson', 'approved'),
  ('Nic', 'approved')
ON CONFLICT (person_name) DO NOTHING;