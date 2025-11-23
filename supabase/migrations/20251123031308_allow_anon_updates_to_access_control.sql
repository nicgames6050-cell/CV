/*
  # Allow Anonymous Updates to Access Control

  1. Changes
    - Add policy to allow anonymous users to update access_control table
    - This enables the admin page to work without authentication
  
  2. Security
    - Policy allows anyone with anon key to update status
    - In production, you may want to add additional checks (like verifying admin cookie)
*/

-- Drop the existing update policy
DROP POLICY IF EXISTS "Authenticated users can update access status" ON access_control;

-- Create new policy that allows both authenticated and anonymous users to update
CREATE POLICY "Anyone can update access status"
  ON access_control
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);