"use client";

import { useMemo, useState } from "react";
import { Resource, ResourceFormData } from "@/types/Resource";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useCookie } from "@/hooks/useCookie";
import { generateResourceId, getTodayFormatted } from "@/utils/validations";

import Header from "@/components/Header";
import ResourceForm from "@/components/ResourceForm";
import ResourceList from "@/components/ResourceList";
import SearchBar from "@/components/SearchBar";
import FilterCategory from "@/components/FilterCategory";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

// Datos de ejemplo, solo se usan la primera vez (Local Storage vacío)
const initialResources: Resource[] = [
  {
    id: "rec-001",
    nombre: "Router Cisco 2901",
    categoria: "Redes",
    cantidad: 4,
    estado: "Disponible",
    ubicacion: "Laboratorio 3",
    responsable: "Encargado TIC",
    fechaRegistro: "09-07-2026",
    descripcion: "Router utilizado para prácticas de configuración CLI.",
  },
];

// Estructura para los datos temporales de sesión (RF-05)
interface SessionFilters {
  search: string;
  category: string;
}

const initialFilters: SessionFilters = { search: "", category: "" };

export default function Home() {
  // --- Local Storage: lista principal de recursos (persiste entre sesiones) ---
  const [resources, setResources] = useLocalStorage<Resource[]>(
    "lab_resources",
    initialResources
  );

  // --- Session Storage: filtros/búsqueda temporales de la sesión actual ---
  const [filters, setFilters] = useSessionStorage<SessionFilters>(
    "lab_resource_filter",
    initialFilters
  );

  // --- Cookie: preferencia visual simple (modo claro/oscuro) ---
  const [theme, setTheme] = useCookie("lab_theme", "light");

  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [deletingResource, setDeletingResource] = useState<Resource | null>(null);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // RF-01 y RF-03: crear o actualizar un recurso
  const handleSubmit = (data: ResourceFormData) => {
    if (editingResource) {
      setResources((prev) =>
        prev.map((r) =>
          r.id === editingResource.id
            ? {
              ...(data as Resource),
              id: r.id,
              fechaRegistro: r.fechaRegistro,       // se mantiene igual
              ultimaModificacion: getTodayFormatted(), // 👈 agregar esta línea
            }
            : r
        )
      );
      setEditingResource(null);
    } else {
      const newResource: Resource = {
        ...(data as Resource),
        id: generateResourceId(resources.map((r) => r.id)),
        fechaRegistro: getTodayFormatted(),
      };
      setResources((prev) => [...prev, newResource]);
    }
  };

  // RF-04: eliminar con confirmación previa
  const confirmDelete = () => {
    if (!deletingResource) return;
    setResources((prev) => prev.filter((r) => r.id !== deletingResource.id));
    setDeletingResource(null);
  };

  const categories = useMemo(
    () => Array.from(new Set(resources.map((r) => r.categoria))).sort(),
    [resources]
  );

  // RF-05: búsqueda por nombre y filtro por categoría (usando Session Storage)
  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchesSearch = r.nombre
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesCategory = filters.category
        ? r.categoria === filters.category
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [resources, filters]);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-gray-900 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Header theme={theme} onToggleTheme={toggleTheme} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <ResourceForm
                editingResource={editingResource}
                onSubmit={handleSubmit}
                onCancelEdit={() => setEditingResource(null)}
              />
            </div>

            <div className="lg:col-span-2">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row">
                <SearchBar
                  value={filters.search}
                  onChange={(search) =>
                    setFilters((prev) => ({ ...prev, search }))
                  }
                />
                <FilterCategory
                  categories={categories}
                  value={filters.category}
                  onChange={(category) =>
                    setFilters((prev) => ({ ...prev, category }))
                  }
                />
              </div>

              <ResourceList
                resources={filteredResources}
                onEdit={setEditingResource}
                onDelete={setDeletingResource}
              />
            </div>
          </div>
        </div>
      </div>

      {deletingResource && (
        <ConfirmDeleteModal
          resourceName={deletingResource.nombre}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingResource(null)}
        />
      )}
    </div>
  );
}
