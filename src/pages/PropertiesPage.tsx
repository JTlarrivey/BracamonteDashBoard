import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Plus, Search, SlidersHorizontal, Home } from "lucide-react";
import Layout from "./Layout";
import PropertyCard from "../components/property/PropertyCard";
import Button from "../components/ui/Button";
import { Property } from "../types/property";
import { supabase } from "../lib/supabase";

const PropertiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Está seguro de que desea eliminar esta propiedad?")) return;

    try {
      const { error } = await supabase.from("properties").delete().eq("id", id);

      if (error) throw error;
      setProperties(properties.filter((property) => property.id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || property.status === statusFilter;
    const matchesType =
      typeFilter === "all" || property.property_type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  if (loading) {
    return (
      <Layout title="Propiedades" subtitle="Cargando...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar propiedades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
        </div>

        <div className="flex space-x-2 w-full sm:w-auto">
          <div className="relative group">
            <Button
              variant="outline"
              leftIcon={<SlidersHorizontal className="w-4 h-4 text-gray-300" />}
            >
              <span className="hidden sm:inline text-gray-300">Estado</span>
            </Button>
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-700">
              <div className="p-2">
                {["all", "disponible", "pendiente", "vendido", "alquilado"].map(
                  (status) => (
                    <button
                      key={status}
                      className={`block w-full text-left px-4 py-2 text-sm rounded-md ${
                        statusFilter === status
                          ? "bg-blue-900 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                      onClick={() => setStatusFilter(status)}
                    >
                      {status === "all"
                        ? "Todos los estados"
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="relative group">
            <Button
              variant="outline"
              leftIcon={<Home className="w-4 h-4 text-gray-300" />}
            >
              <span className="hidden sm:inline text-gray-300">Tipo</span>
            </Button>
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-700">
              <div className="p-2">
                {["all", "casa", "departamento", "ph", "terreno", "local"].map(
                  (type) => (
                    <button
                      key={type}
                      className={`block w-full text-left px-4 py-2 text-sm rounded-md ${
                        typeFilter === type
                          ? "bg-blue-900 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                      onClick={() => setTypeFilter(type)}
                    >
                      {type === "all"
                        ? "Todos los tipos"
                        : type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            className="ml-auto sm:ml-2"
            onClick={() => navigate("/add-property")}
          >
            Agregar propiedad
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={() => navigate(`/edit-property/${property.id}`)}
              onDelete={() => handleDelete(property.id)}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-gray-800 rounded-lg border border-gray-700">
            <div className="mx-auto flex justify-center">
              <Home className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">
              No se encontraron propiedades
            </h3>
            <p className="mt-2 text-sm text-gray-300">
              {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                ? "Intenta ajustar los filtros de búsqueda"
                : "Comienza agregando tu primera propiedad"}
            </p>
            <div className="mt-6">
              <Button
                variant="primary"
                onClick={() => navigate("/add-property")}
              >
                <Plus className="w-4 h-4 mr-2" /> Agregar propiedad
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PropertiesPage;
