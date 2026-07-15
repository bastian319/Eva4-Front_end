"use client";

import { Resource } from "@/types/Resource";

interface ResourceCardProps {
  resource: Resource;
  onEdit: (resource: Resource) => void;
  onDelete: (resource: Resource) => void;
}

const ESTADO_COLORS: Record<string, string> = {
  Disponible: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "En uso": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "En mantención": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

// Función simulada "Sugerencia IA" (punto 11 de la evaluación).
// Entrega una recomendación simple según la categoría del recurso.
// No consume ninguna API externa: es una simulación local basada en reglas.
function getSugerenciaIA(categoria: string): string {
  const cat = categoria.toLowerCase();
  if (cat.includes("red")) {
    return "Revisar disponibilidad antes de asignarlo a una práctica de red.";
  }
  if (cat.includes("3d") || cat.includes("impres")) {
    return "Verificar stock de filamento antes del próximo uso.";
  }
  if (cat.includes("iot") || cat.includes("arduino") || cat.includes("sensor")) {
    return "Comprobar el estado de baterías y conexiones antes de prestarlo.";
  }
  if (cat.includes("comput")) {
    return "Confirmar actualizaciones de software antes de la próxima clase.";
  }
  if (cat.includes("audio") || cat.includes("cámara") || cat.includes("camara")) {
    return "Revisar tarjetas de memoria y carga de batería.";
  }
  return "Verificar el estado general del recurso antes de su próximo uso.";
}

// Representa un recurso en formato tarjeta.
export default function ResourceCard({
  resource,
  onEdit,
  onDelete,
}: ResourceCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {resource.nombre}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {resource.id} · {resource.categoria}
          </p>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${ESTADO_COLORS[resource.estado]}`}
        >
          {resource.estado}
        </span>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-1 text-sm text-gray-600 dark:text-gray-300">
        <dt className="text-gray-400">Cantidad</dt>
        <dd>{resource.cantidad}</dd>
        <dt className="text-gray-400">Ubicación</dt>
        <dd>{resource.ubicacion}</dd>
        {resource.responsable && (
          <>
            <dt className="text-gray-400">Responsable</dt>
            <dd>{resource.responsable}</dd>
          </>
        )}
        <dt className="text-gray-400">Registrado</dt>
        <dd>{resource.fechaRegistro}</dd>
        {resource.ultimaModificacion && (
          <>
            <dt className="text-gray-400">Última modificación</dt>
            <dd>{resource.ultimaModificacion}</dd>
          </>
        )}
      </dl>
      

      {resource.descripcion && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {resource.descripcion}
        </p>
      )}

      <div className="mt-3 rounded-lg bg-blue-50 p-2 text-xs text-blue-800 dark:bg-blue-950 dark:text-blue-200">
        💡 <span className="font-medium">Sugerencia IA:</span>{" "}
        {getSugerenciaIA(resource.categoria)}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onEdit(resource)}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(resource)}
          className="flex-1 rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
