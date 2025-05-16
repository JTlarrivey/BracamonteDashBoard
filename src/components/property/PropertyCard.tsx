import React from "react";
import {
  Edit,
  Trash2,
  Heart,
  Home,
  MapPin,
  BedDouble,
  Bath,
  Square as SquareFeet,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { Property } from "../../types/property";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const statusColors = {
    disponible: "bg-green-100 text-green-800",
    pendiente: "bg-yellow-100 text-yellow-800",
    vendido: "bg-blue-100 text-blue-800",
    alquilado: "bg-purple-100 text-purple-800",
  };

  const statusTranslations = {
    disponible: "Disponible",
    pendiente: "Pendiente",
    vendido: "Vendido",
    alquilado: "Alquilado",
  };

  const formatLocation = () => {
    const parts = [];
    if (property.location) parts.push(property.location);
    if (property.city) parts.push(property.city);
    if (property.state) parts.push(property.state);
    return parts.join(", ") || "Ubicación no especificada";
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg group">
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="absolute top-2 right-2 z-10">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              statusColors[property.status]
            }`}
          >
            {statusTranslations[property.status]}
          </span>
        </div>
        <div className="h-48 overflow-hidden relative">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Home className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-white">
            <p className="text-xl font-bold">
              ${Number(property.price).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="cursor-pointer" onClick={handleCardClick}>
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">
            {property.title}
          </h3>

          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">{formatLocation()}</span>
          </div>

          <div className="flex justify-between mt-3 text-sm">
            <div className="flex items-center text-gray-700">
              <BedDouble className="w-4 h-4 mr-1" />
              <span>{property.bedrooms} </span>
            </div>
            <div className="flex items-center text-gray-700">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.bathrooms} </span>
            </div>
            <div className="flex items-center text-gray-700">
              <SquareFeet className="w-4 h-4 mr-1" />
              <span>{property.square_meters} m²</span>
            </div>
          </div>

          <p className="text-gray-600 mt-2 text-sm line-clamp-2">
            {property.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Edit className="w-4 h-4" />}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit-property/${property.id}`);
          }}
        ></Button>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Trash2 className="w-4 h-4 text-red-500" />}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(property.id);
          }}
          className="text-red-500 hover:bg-red-50"
        ></Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
