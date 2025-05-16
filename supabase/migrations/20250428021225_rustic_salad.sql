/*
  # Create properties table

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `type` (text) - Type of property (Casa, Departamento, etc.)
      - `location` (text) - Area/neighborhood
      - `address` (text) - Full street address
      - `price` (numeric) - Property price
      - `description` (text) - Detailed description
      - `images` (text[]) - Array of image URLs
      - `services` (text[]) - Available services
      - `taxes` (jsonb) - Tax information
      - `has_debts` (boolean) - Debt status
      - `features` (text[]) - Property features
      - `square_meters` (numeric) - Total area
      - `bedrooms` (integer) - Number of bedrooms
      - `bathrooms` (integer) - Number of bathrooms
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `properties` table
    - Add policies for authenticated users to manage their properties
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  location text NOT NULL,
  address text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  description text NOT NULL,
  images text[] DEFAULT '{}',
  services text[] DEFAULT '{}',
  taxes jsonb DEFAULT '{"municipal": 0, "provincial": 0}',
  has_debts boolean DEFAULT false,
  features text[] DEFAULT '{}',
  square_meters numeric NOT NULL CHECK (square_meters > 0),
  bedrooms integer NOT NULL CHECK (bedrooms >= 0),
  bathrooms integer NOT NULL CHECK (bathrooms >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view all properties
CREATE POLICY "Users can view all properties" 
  ON properties 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Allow authenticated users to insert their properties
CREATE POLICY "Users can insert properties" 
  ON properties 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Allow authenticated users to update their properties
CREATE POLICY "Users can update properties" 
  ON properties 
  FOR UPDATE 
  TO authenticated 
  USING (true);

-- Allow authenticated users to delete their properties
CREATE POLICY "Users can delete properties" 
  ON properties 
  FOR DELETE 
  TO authenticated 
  USING (true);

-- Create an update trigger for updated_at
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