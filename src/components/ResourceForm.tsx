"use client";

import { useState, useEffect } from "react";
import { Resource, ResourceFormData, EstadoRecurso } from "@/types/Resource";
import { validateResourceForm, isFormValid, ValidationErrors } from "@/utils/validations";

const ESTADOS: EstadoRecurso[] = ["Disponible", "En uso", "En mantención"];
const CATEGORIAS_SUGERIDAS = [
  "Redes",
  "Computación",
  "Impresión 3D",
  "IoT",
  "Audiovisual",
  "Herramientas",
  "Insumos",
];

interface ResourceFormProps {
  editingResource: Resource | null;
  onSubmit: (data: ResourceFormData) => void;
  onCancelEdit: () => void;
}

const emptyForm: ResourceFormData = {
  nombre: "",
  categoria: "",
  cantidad: 1,
  estado: "Disponible",
  ubicacion: "",
  responsable: "",
  descripcion: "",
};

// Formulario para registrar (RF-01) y editar (RF-03) recursos, con validaciones (RF-06).
export default function ResourceForm({
  editingResource,
  onSubmit,
  onCancelEdit,
}: ResourceFormProps) {
  const [formData, setFormData] = useState<ResourceFormData>(emptyForm);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Si se selecciona un recurso para editar, precarga el formulario
  useEffect(() => {
    if (editingResource) {
      setFormData(editingResource);
      setErrors({});
    } else {
      setFormData(emptyForm);
    }
  }, [editingResource]);

  const handleChange = (
    field: keyof ResourceFormData,
    rawValue: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "cantidad" ? Number(rawValue) : rawValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateResourceForm(formData);
    setErrors(validationErrors);

    if (isFormValid(validationErrors)) {
      onSubmit(formData);
      setFormData(emptyForm);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {editingResource ? "Editar recurso" : "Registrar nuevo recurso"}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre del recurso *
          </label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Ej: Router Cisco 2901"
          />
          {errors.nombre && (
            <p className="mt-1 text-xs text-red-600">{errors.nombre}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Categoría *
          </label>
          <input
            list="categorias-sugeridas"
            type="text"
            value={formData.categoria}
            onChange={(e) => handleChange("categoria", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Ej: Redes"
          />
          <datalist id="categorias-sugeridas">
            {CATEGORIAS_SUGERIDAS.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          {errors.categoria && (
            <p className="mt-1 text-xs text-red-600">{errors.categoria}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Cantidad *
          </label>
          <input
            type="number"
            min={1}
            value={formData.cantidad}
            onChange={(e) => handleChange("cantidad", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          {errors.cantidad && (
            <p className="mt-1 text-xs text-red-600">{errors.cantidad}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Estado *
          </label>
          <select
            value={formData.estado}
            onChange={(e) => handleChange("estado", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {ESTADOS.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
          {errors.estado && (
            <p className="mt-1 text-xs text-red-600">{errors.estado}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Ubicación *
          </label>
          <input
            type="text"
            value={formData.ubicacion}
            onChange={(e) => handleChange("ubicacion", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Ej: Laboratorio 3"
          />
          {errors.ubicacion && (
            <p className="mt-1 text-xs text-red-600">{errors.ubicacion}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Responsable (opcional)
          </label>
          <input
            type="text"
            value={formData.responsable}
            onChange={(e) => handleChange("responsable", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Ej: Encargado TIC"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Descripción (opcional)
          </label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Detalles adicionales del recurso..."
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {editingResource ? "Guardar cambios" : "Agregar recurso"}
        </button>
        {editingResource && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
