import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import PropertyForm from "../components/property/PropertyForm";
import { PropertyFormData } from "../types/property";
import { supabase } from "../lib/supabase";
import { mapPropertyToDatabaseProperty } from "../types/property";

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData: PropertyFormData) => {
    try {
      const dbProperty = mapPropertyToDatabaseProperty(formData);

      // Log the property data before submission to help with debugging
      console.log("Submitting property data:", dbProperty);

      const { error } = await supabase.from("properties").insert([dbProperty]);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      alert("Propiedad creada exitosamente!");
      navigate("/");
    } catch (error) {
      console.error("Error creating property:", error);
      //alert('Error al crear la propiedad. Por favor intente nuevamente.');
    }
  };

  return (
    <Layout
      title="Agregar Propiedad"
      subtitle="Crear un nuevo listado de propiedad"
    >
      <PropertyForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
        initialData={{
          title: "",
          property_type: "casa",
          location: "",
          city: "",
          state: "",
          price: 0,
          description: "",
          images: [],
          square_meters: 1,
          bedrooms: 0,
          bathrooms: 0,
          amenities: [],
          status: "disponible",
        }}
      />
    </Layout>
  );
};

export default AddPropertyPage;
