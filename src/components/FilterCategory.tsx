"use client";

interface FilterCategoryProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

// Filtra recursos por categoría. El valor se persiste en Session Storage
// desde el componente padre.
export default function FilterCategory({
  categories,
  value,
  onChange,
}: FilterCategoryProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
    >
      <option value="">Todas las categorías</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
