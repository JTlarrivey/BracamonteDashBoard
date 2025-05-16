import React, { useState } from "react";
import {
  Home,
  DollarSign,
  MapPin,
  BedDouble,
  Bath,
  Square as SquareFeet,
  PlusCircle,
  Trash2,
} from "lucide-react";
import Button from "../ui/Button";
import { PropertyFormData, PropertyStatus } from "../../types/property";

interface PropertyFormProps {
  initialData?: PropertyFormData;
  onSubmit: (data: PropertyFormData) => void;
  onCancel: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const defaultFormData: PropertyFormData = {
    title: "",
    property_type: "Casa",
    location: "",
    city: "",
    state: "",
    price: 0,
    description: "",
    images: [],
    square_meters: 0,
    bedrooms: 0,
    bathrooms: 0,
    amenities: [],
    status: "disponible",
  };

  const [formData, setFormData] = useState<PropertyFormData>(
    initialData || defaultFormData
  );
  const [newAmenity, setNewAmenity] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleAddAmenity = () => {
    if (
      newAmenity.trim() !== "" &&
      !formData.amenities.includes(newAmenity.trim())
    ) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, newAmenity.trim()],
      });
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (amenity: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((a) => a !== amenity),
    });
  };

  const handleAddImage = () => {
    if (imageUrl.trim() !== "" && !formData.images.includes(imageUrl.trim())) {
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl.trim()],
      });
      setImageUrl("");
    }
  };

  const handleRemoveImage = (image: string) => {
    setFormData({
      ...formData,
      images: formData.images.filter((img) => img !== image),
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "El título es requerido";
    if (!formData.location.trim())
      newErrors.location = "La ubicación es requerida";
    if (formData.price <= 0) newErrors.price = "El precio debe ser mayor a 0";
    if (!formData.description.trim())
      newErrors.description = "La descripción es requerida";
    if (formData.square_meters <= 0)
      newErrors.square_meters = "Los metros cuadrados deben ser mayor a 0";
    if (formData.bedrooms < 0)
      newErrors.bedrooms = "El número de ambientes no puede ser negativo";
    if (formData.bathrooms < 0)
      newErrors.bathrooms = "El número de baños no puede ser negativo";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-gray-800 flex items-center">
          <Home className="mr-2 text-blue-600" /> Información Básica
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Propiedad*
            </label>
            <select
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Casa">Casa</option>
              <option value="Departamento">Departamento</option>
              <option value="Monoambiente">Monoambiente</option>
              <option value="Duplex">Duplex</option>
              <option value="PH">PH</option>
              <option value="Terreno">Terreno</option>
              <option value="Local">Local</option>
              <option value="Rural">Rural</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Ubicación*
              </div>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ciudad
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provincia
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Precio*
              </div>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción*
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-gray-800 flex items-center">
          Características
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <BedDouble className="w-4 h-4 mr-1" />
                Ambientes*
              </div>
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              min="0"
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.bedrooms ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.bedrooms && (
              <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                Baños*
              </div>
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              min="0"
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.bathrooms ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.bathrooms && (
              <p className="mt-1 text-sm text-red-600">{errors.bathrooms}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <SquareFeet className="w-4 h-4 mr-1" />
                Metros Cuadrados*
              </div>
            </label>
            <input
              type="number"
              name="square_meters"
              value={formData.square_meters}
              onChange={handleChange}
              min="1"
              className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.square_meters ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.square_meters && (
              <p className="mt-1 text-sm text-red-600">
                {errors.square_meters}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Comodidades</h3>

        <div className="flex mb-4">
          <input
            type="text"
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            placeholder="Agregar comodidad (ej: Aire Acondicionado)"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
          />
          <Button
            type="button"
            onClick={handleAddAmenity}
            variant="primary"
            className="rounded-l-none"
          >
            <PlusCircle className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.amenities.map((amenity, index) => (
            <div
              key={index}
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center"
            >
              <span>{amenity}</span>
              <button
                type="button"
                onClick={() => handleRemoveAmenity(amenity)}
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {formData.amenities.length === 0 && (
            <p className="text-gray-500 text-sm">Sin comodidades aún</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Fotos</h3>

        <div className="flex mb-4">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Ingrese URL de la imagen"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
          />
          <Button
            type="button"
            onClick={handleAddImage}
            variant="primary"
            className="rounded-l-none"
          >
            <PlusCircle className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {formData.images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Property ${index + 1}`}
                className="w-full h-28 object-cover rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(image)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {formData.images.length === 0 && (
            <div className="col-span-full">
              <p className="text-gray-500 text-sm">Sin fotos todavía</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Estado</h3>

        <div>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="disponible">Disponible</option>
            <option value="pendiente">Pendiente</option>
            <option value="vendido">Vendido</option>
            <option value="alquilado">Alquilado</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" onClick={onCancel} variant="outline">
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? "Actualizar Propiedad" : "Crear Propiedad"}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
