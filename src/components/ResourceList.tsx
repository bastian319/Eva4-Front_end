"use client";

import { Resource } from "@/types/Resource";
import ResourceCard from "./ResourceCard";

interface ResourceListProps {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
  onDelete: (resource: Resource) => void;
}

// Muestra el listado general de recursos en formato de tarjetas (RF-02).
export default function ResourceList({
  resources,
  onEdit,
  onDelete,
}: ResourceListProps) {
  if (resources.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        No hay recursos que coincidan con la búsqueda o filtro actual.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
