import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import PropertyForm from "../components/property/PropertyForm";
import { Property, PropertyFormData } from "../types/property";
import { supabase } from "../lib/supabase";

const EditPropertyPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSubmit = async (formData: PropertyFormData) => {
    if (!id) return;

    try {
      const { error } = await supabase
        .from("properties")
        .update(formData)
        .eq("id", id);

      if (error) throw error;

      alert("Propiedad actualizada exitosamente!");
      navigate("/");
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Error al actualizar la propiedad");
    }
  };

  if (loading) {
    return (
      <Layout title="Editar Propiedad" subtitle="Cargando...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout title="Editar Propiedad" subtitle="Propiedad no encontrada">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-red-600">
            Propiedad no encontrada
          </h2>
          <p className="mt-2">La propiedad que quieres editar no existe</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`Editar: ${property.title}`}
      subtitle="Actualizar información de la propiedad"
    >
      <PropertyForm
        initialData={property}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </Layout>
  );
};

export default EditPropertyPage;
