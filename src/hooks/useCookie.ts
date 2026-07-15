"use client";

import { useState, useCallback } from "react";

// Lee una cookie por nombre desde document.cookie
function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

// Escribe una cookie simple (no sensible) con expiración en días
function writeCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function eraseCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Hook personalizado para guardar una preferencia simple del usuario en Cookies.
 * Ejemplo de uso: tema claro/oscuro (lab_theme) o tipo de vista (lab_view).
 * IMPORTANTE: nunca se deben guardar contraseñas, tokens ni datos sensibles aquí.
 *
 * @param name Nombre de la cookie (ej: "lab_theme")
 * @param initialValue Valor por defecto si la cookie no existe
 */
export function useCookie(name: string, initialValue: string) {
  const [value, setValueState] = useState<string>(() => {
    const existing = readCookie(name);
    return existing ?? initialValue;
  });

  const setValue = useCallback(
    (newValue: string, days?: number) => {
      setValueState(newValue);
      writeCookie(name, newValue, days);
    },
    [name]
  );

  const remove = useCallback(() => {
    eraseCookie(name);
    setValueState(initialValue);
  }, [name, initialValue]);

  return [value, setValue, remove] as const;
}
