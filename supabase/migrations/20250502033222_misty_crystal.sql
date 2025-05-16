/*
  # Update properties table schema

  1. Changes
    - Add new columns for property details
    - Add constraints for data integrity
    - Add amenities support

  2. New Columns
    - title (text, not null)
    - city (text)
    - state (text)
    - zipCode (text)
    - country (text, default 'Argentina')
    - amenities (jsonb[])
    - propertyType (text, not null)
*/

-- Add new columns
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS propertyType text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS state text,
ADD COLUMN IF NOT EXISTS zipCode text,
ADD COLUMN IF NOT EXISTS country text DEFAULT 'Argentina',
ADD COLUMN IF NOT EXISTS amenities jsonb[] DEFAULT '{}';

-- Make sure all columns have appropriate constraints
ALTER TABLE properties
ALTER COLUMN title SET NOT NULL,
ALTER COLUMN propertyType SET NOT NULL,
ALTER COLUMN location SET NOT NULL,
ALTER COLUMN address SET NOT NULL,
ALTER COLUMN price SET NOT NULL,
ALTER COLUMN description SET NOT NULL,
ALTER COLUMN square_meters SET NOT NULL,
ALTER COLUMN bedrooms SET NOT NULL,
ALTER COLUMN bathrooms SET NOT NULL;

-- Add check constraints
ALTER TABLE properties
ADD CONSTRAINT price_positive CHECK (price >= 0),
ADD CONSTRAINT square_meters_positive CHECK (square_meters > 0),
ADD CONSTRAINT bedrooms_non_negative CHECK (bedrooms >= 0),
ADD CONSTRAINT bathrooms_non_negative CHECK (bathrooms >= 0);