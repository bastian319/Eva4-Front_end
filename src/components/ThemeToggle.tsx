"use client";

interface ThemeToggleProps {
  theme: string;
  onToggle: () => void;
}

// Botón para alternar entre modo claro/oscuro.
// La preferencia se guarda en una cookie ("lab_theme") mediante useCookie.
export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
      title="Preferencia guardada en cookie: lab_theme"
    >
      {isDark ? "☀️ Modo claro" : "🌙 Modo oscuro"}
    </button>
  );
}
