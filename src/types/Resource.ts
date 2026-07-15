// Modelo de datos para un recurso tecnológico del laboratorio.
// Cumple con el punto 6 de la evaluación: "Datos mínimos del recurso".

export type EstadoRecurso = "Disponible" | "En uso" | "En mantención";

export interface Resource {
  id: string; // generado automáticamente, ej: rec-001
  nombre: string; // ej: Router Cisco 2901
  categoria: string; // ej: Redes, Impresión 3D, IoT, etc.
  cantidad: number;
  estado: EstadoRecurso;
  ubicacion: string; // ej: Laboratorio 3
  responsable?: string; // opcional
  fechaRegistro: string; // formato dd-mm-aaaa
  ultimaModificacion?: string; // opcional, formato dd-mm-aaaa
  descripcion?: string; // opcional
}

// Tipo usado por el formulario: id y fechaRegistro se completan automáticamente
export type ResourceFormData = Omit<Resource, "id" | "fechaRegistro"> & {
  id?: string;
  fechaRegistro?: string;
};
