"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

// Permite buscar recursos por nombre. El valor se persiste en Session Storage
// desde el componente padre (page.tsx) usando useSessionStorage.
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar recurso por nombre..."
      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
    />
  );
}
