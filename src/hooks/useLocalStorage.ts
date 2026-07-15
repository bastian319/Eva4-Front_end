"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Hook personalizado para sincronizar un estado de React con Local Storage.
 * Se usa para persistir la lista principal de recursos tecnológicos (RF-01 a RF-04).
 *
 * @param key   Clave usada en Local Storage (ej: "lab_resources")
 * @param initialValue Valor inicial si no existe nada guardado aún
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // useState con inicializador perezoso: solo lee localStorage una vez al montar
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue; // seguridad en SSR
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error leyendo Local Storage (${key}):`, error);
      return initialValue;
    }
  });

  // Cada vez que cambia el valor, se persiste en Local Storage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error guardando en Local Storage (${key}):`, error);
    }
  }, [key, value]);

  // Permite limpiar la clave manualmente
  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setValue(initialValue);
    } catch (error) {
      console.error(`Error eliminando de Local Storage (${key}):`, error);
    }
  }, [key, initialValue]);

  return [value, setValue, remove] as const;
}
