import React, { useState } from 'react';
import type { FieldDef } from '../Api/types';

interface ModalEditGenericProps<T> {
  isOpen: boolean;
  title: string;
  initialValues: T;
  fields: FieldDef[];
  onSubmit: (values: T) => Promise<void>;
  onClose: () => void;
  submitText?: string;
}

function ModalEditGeneric<T extends Record<string, unknown>>({
  isOpen,
  title,
  initialValues,
  fields,
  onSubmit,
  onClose,
  submitText = "Actualizar",
}: ModalEditGenericProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    setValues(initialValues);
  }, [initialValues, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSubmit(values);
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al actualizar');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            {fields.map(field => (
              <div key={field.name} className={field.colSpan === 2 ? "col-span-2" : ""}>
                <label className="block text-sm">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={String(values[field.name] ?? '')}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-2 py-2 text-xs"
                  >
                    <option value="">Seleccionar ...</option>
                    {field.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={String(values[field.name] ?? '')}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-2 py-1 placeholder:text-xs"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              className="flex-1 bg-red-600 text-white py-2 rounded font-bold"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 rounded font-bold"
              disabled={loading}
            >
              {loading ? 'Actualizando...' : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditGeneric;