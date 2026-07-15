"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Hook personalizado para sincronizar un estado de React con Session Storage.
 * Se usa para datos temporales de la sesión: filtros y búsqueda actual (RF-05).
 * Estos datos se pierden al cerrar la pestaña, a diferencia de Local Storage.
 *
 * @param key   Clave usada en Session Storage (ej: "lab_resource_filter")
 * @param initialValue Valor inicial si no existe nada guardado aún
 */
export function useSessionStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error leyendo Session Storage (${key}):`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error guardando en Session Storage (${key}):`, error);
    }
  }, [key, value]);

  const remove = useCallback(() => {
    try {
      window.sessionStorage.removeItem(key);
      setValue(initialValue);
    } catch (error) {
      console.error(`Error eliminando de Session Storage (${key}):`, error);
    }
  }, [key, initialValue]);

  return [value, setValue, remove] as const;
}
