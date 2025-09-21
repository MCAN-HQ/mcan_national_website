-- Migration: Add State of Origin field to users table
-- Date: 2024
-- Description: Add state_of_origin field to store user's state of origin

-- Add state_of_origin column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS state_of_origin VARCHAR(100);

-- Add comment to describe the field
COMMENT ON COLUMN users.state_of_origin IS 'State where the user originates from';
