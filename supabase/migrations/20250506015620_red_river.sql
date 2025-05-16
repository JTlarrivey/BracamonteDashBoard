/*
  # Simplify properties table structure

  1. Changes
    - Drop existing properties table
    - Create new simplified properties table
    - Simplify location handling
    - Ensure proper data types for all fields

  2. New Structure
    - Simplified location fields
    - Direct numeric fields for rooms
    - Proper constraints and defaults
*/

-- Drop existing table and type
DROP TABLE IF EXISTS properties;
DROP TYPE IF EXISTS property_status;

-- Create property status enum
CREATE TYPE property_status AS ENUM ('disponible', 'pendiente', 'vendido', 'alquilado');

-- Create new properties table
CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  property_type text NOT NULL,
  location text NOT NULL,
  city text,
  state text,
  price numeric NOT NULL CHECK (price >= 0),
  description text NOT NULL,
  images text[] DEFAULT '{}',
  square_meters numeric NOT NULL CHECK (square_meters > 0),
  bedrooms integer NOT NULL CHECK (bedrooms >= 0),
  bathrooms integer NOT NULL CHECK (bathrooms >= 0),
  amenities text[] DEFAULT '{}',
  status property_status NOT NULL DEFAULT 'disponible',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view all properties" 
  ON properties FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Users can insert properties" 
  ON properties FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Users can update properties" 
  ON properties FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Users can delete properties" 
  ON properties FOR DELETE 
  TO authenticated 
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();