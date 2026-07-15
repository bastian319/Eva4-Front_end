import { ResourceFormData } from "@/types/Resource";

export interface ValidationErrors {
  nombre?: string;
  categoria?: string;
  cantidad?: string;
  estado?: string;
  ubicacion?: string;
}

// Valida los campos obligatorios y tipos de datos del formulario de recursos.
// Cumple RF-06: Validar formulario.
export function validateResourceForm(data: ResourceFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.nombre || data.nombre.trim().length === 0) {
    errors.nombre = "El nombre del recurso es obligatorio.";
  } else if (data.nombre.trim().length < 3) {
    errors.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  if (!data.categoria || data.categoria.trim().length === 0) {
    errors.categoria = "La categoría es obligatoria.";
  }

  if (data.cantidad === undefined || data.cantidad === null || Number.isNaN(data.cantidad)) {
    errors.cantidad = "La cantidad es obligatoria y debe ser numérica.";
  } else if (data.cantidad <= 0) {
    errors.cantidad = "La cantidad debe ser mayor a 0.";
  } else if (!Number.isInteger(data.cantidad)) {
    errors.cantidad = "La cantidad debe ser un número entero.";
  }

  if (!data.estado) {
    errors.estado = "El estado es obligatorio.";
  }

  if (!data.ubicacion || data.ubicacion.trim().length === 0) {
    errors.ubicacion = "La ubicación es obligatoria.";
  }

  return errors;
}

export function isFormValid(errors: ValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}

// Genera un ID incremental tipo rec-001, rec-002...
export function generateResourceId(existingIds: string[]): string {
  const numbers = existingIds
    .map((id) => parseInt(id.replace("rec-", ""), 10))
    .filter((n) => !Number.isNaN(n));
  const next = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
  return `rec-${String(next).padStart(3, "0")}`;
}

// Formatea una fecha actual como dd-mm-aaaa
export function getTodayFormatted(): string {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}
