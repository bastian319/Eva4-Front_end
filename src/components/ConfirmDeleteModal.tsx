"use client";

interface ConfirmDeleteModalProps {
  resourceName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// Modal de confirmación antes de eliminar un recurso (RF-04).
export default function ConfirmDeleteModal({
  resourceName,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Confirmar eliminación
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          ¿Seguro que deseas eliminar{" "}
          <span className="font-medium">&ldquo;{resourceName}&rdquo;</span>?
          Esta acción no se puede deshacer.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
