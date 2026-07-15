"use client";

import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  theme: string;
  onToggleTheme: () => void;
}

// Muestra el título de la app y el control de preferencia visual (cookie).
export default function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6 dark:border-gray-700">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gestión de Recursos Tecnológicos
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Laboratorio · CRUD con Local Storage, Session Storage y Cookies
        </p>
      </div>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  );
}
