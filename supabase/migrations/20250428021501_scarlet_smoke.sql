/*
  # Add status field to properties table

  1. Changes
    - Add `status` column to properties table with allowed values:
      - 'disponible' (available)
      - 'pendiente' (pending)
      - 'vendido' (sold)
      - 'alquilado' (rented)
*/

DO $$ BEGIN
  -- Create enum type for property status
  CREATE TYPE property_status AS ENUM ('disponible', 'pendiente', 'vendido', 'alquilado');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add status column with default value
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS status property_status DEFAULT 'disponible' NOT NULL;