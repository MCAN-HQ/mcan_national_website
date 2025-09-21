-- Migration: Remove NYSC Number field from users and members tables
-- Date: 2024
-- Description: Remove nysc_number field as it's no longer required

-- Remove nysc_number column from users table
ALTER TABLE users DROP COLUMN IF EXISTS nysc_number;

-- Remove nysc_number column from members table
ALTER TABLE members DROP COLUMN IF EXISTS nysc_number;

-- Drop the index on nysc_number in members table
DROP INDEX IF EXISTS idx_members_nysc_number;

-- Update any existing data if needed (this is optional since we're dropping the column)
-- No data migration needed as we're removing the field entirely
