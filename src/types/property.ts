export type PropertyStatus =
  | "disponible"
  | "pendiente"
  | "vendido"
  | "alquilado";

export interface Property {
  type: string;
  id: string;
  title: string;
  property_type: string;
  location: string;
  city?: string;
  state?: string;
  price: number;
  description: string;
  images: string[];
  square_meters: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  status: PropertyStatus;
  created_at?: string;
  updated_at?: string;
}

export interface PropertyFormData {
  title: string;
  property_type: string;
  location: string;
  city?: string;
  state?: string;
  price: number;
  description: string;
  images: string[];
  square_meters: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  status: PropertyStatus;
}

export const propertyStatusLabels: Record<PropertyStatus, string> = {
  disponible: "Disponible",
  pendiente: "Pendiente",
  vendido: "Vendido",
  alquilado: "Alquilado",
};

export const mapDatabasePropertyToProperty = (dbProperty: any): Property => ({
  id: dbProperty.id,
  title: dbProperty.title,
  property_type: dbProperty.property_type,
  location: dbProperty.location,
  city: dbProperty.city,
  state: dbProperty.state,
  price: dbProperty.price,
  description: dbProperty.description,
  images: dbProperty.images,
  square_meters: dbProperty.square_meters,
  bedrooms: dbProperty.bedrooms,
  bathrooms: dbProperty.bathrooms,
  amenities: dbProperty.amenities,
  status: dbProperty.status as PropertyStatus,
  created_at: dbProperty.created_at,
  updated_at: dbProperty.updated_at,
  type: "",
});

export const mapPropertyToDatabaseProperty = (
  property: PropertyFormData
): any => ({
  title: property.title,
  property_type: property.property_type,
  location: property.location,
  city: property.city,
  state: property.state,
  price: property.price,
  description: property.description,
  images: property.images,
  square_meters: property.square_meters,
  bedrooms: property.bedrooms,
  bathrooms: property.bathrooms,
  amenities: property.amenities,
  status: property.status,
});
