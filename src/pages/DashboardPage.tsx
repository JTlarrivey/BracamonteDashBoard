import React, { useEffect, useState } from "react";
import { Home, TrendingUp, DollarSign, Layers } from "lucide-react";
import Layout from "./Layout";
import StatsCard from "../components/dashboard/StatsCard";
import PropertyCard from "../components/property/PropertyCard";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import {
  Property,
  propertyStatusLabels,
  PropertyStatus,
  mapDatabasePropertyToProperty,
} from "../types/property";

const DashboardPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data: dbProperties, error } = await supabase
          .from("properties")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        const mappedProperties = dbProperties.map(
          mapDatabasePropertyToProperty
        );
        setProperties(mappedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const recentProperties = properties.slice(0, 3);
  const totalValue = properties.reduce((sum, p) => sum + p.price, 0);
  const averagePrice =
    properties.length > 0 ? totalValue / properties.length : 0;

  if (loading) {
    return (
      <Layout title="Panel de Control" subtitle="Cargando datos...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Propiedades"
          value={properties.length}
          icon={<Home className="h-6 w-6 text-blue-600" />}
        />
        <StatsCard
          title="Propiedades Disponibles"
          value={properties.filter((p) => p.status === "disponible").length}
          icon={<Layers className="h-6 w-6 text-green-600" />}
        />
        <StatsCard
          title="Valor Total"
          value={`$${totalValue.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6 text-indigo-600" />}
        />
        <StatsCard
          title="Precio Promedio"
          value={`$${Math.round(averagePrice).toLocaleString()}`}
          icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Propiedades Recientes</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => (window.location.href = "/properties")}
              >
                Ver Todas
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onEdit={() =>
                      (window.location.href = `/properties/${property.id}/edit`)
                    }
                    onDelete={async () => {
                      if (
                        confirm(
                          "¿Está seguro de que desea eliminar esta propiedad?"
                        )
                      ) {
                        try {
                          const { error } = await supabase
                            .from("properties")
                            .delete()
                            .eq("id", property.id);

                          if (error) throw error;

                          setProperties(
                            properties.filter((p) => p.id !== property.id)
                          );
                        } catch (error) {
                          console.error("Error deleting property:", error);
                          alert("Error al eliminar la propiedad");
                        }
                      }
                    }}
                  />
                ))}
                {recentProperties.length === 0 && (
                  <div className="col-span-3 text-center py-8 text-gray-500">
                    No hay propiedades para mostrar
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Estado de Propiedades</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(
                  [
                    "disponible",
                    "pendiente",
                    "vendido",
                    "alquilado",
                  ] as PropertyStatus[]
                ).map((status) => {
                  const count = properties.filter(
                    (p) => p.status === status
                  ).length;
                  const percentage =
                    properties.length > 0
                      ? Math.round((count / properties.length) * 100)
                      : 0;

                  const statusColors = {
                    disponible: "bg-green-500",
                    pendiente: "bg-yellow-500",
                    vendido: "bg-blue-500",
                    alquilado: "bg-purple-500",
                  };

                  return (
                    <div key={status}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {propertyStatusLabels[status]}
                        </span>
                        <span className="text-sm font-medium">
                          {percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`${statusColors[status]} h-2.5 rounded-full`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">
                  Tipos de Propiedades
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "Casa", label: "Casa" },
                    { key: "Departamento", label: "Departamento" },
                    { key: "PH", label: "PH" },
                    { key: "Local", label: "Local" },
                  ].map(({ key, label }) => {
                    const count = properties.filter(
                      (p) => p.type === key
                    ).length;

                    return (
                      <div key={key} className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500">{label}</div>
                        <div className="font-semibold">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
