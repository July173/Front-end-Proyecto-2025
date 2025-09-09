import React from 'react';

/**
 * ModalFormGeneric
 * Modal reutilizable para crear entidades (rol, módulo, formulario, etc.)
 * Props:
 * - isOpen: boolean
 * - title: string
 * - fields: array de objetos { name, label, type, placeholder, options? }
 * - onClose: () => void
 * - onSubmit: (values) => void
 * - submitText: string
 * - cancelText: string
 * - initialValues?: valores iniciales
 */

const ModalFormGeneric = ({
  isOpen,
  title,
  fields,
  onClose,
  onSubmit,
  submitText = 'Registrar',
  cancelText = 'Cancelar',
  initialValues = {},
}) => {
  const [values, setValues] = React.useState(initialValues);

  React.useEffect(() => {
    setValues(initialValues);
  }, [initialValues, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <form
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-4 mb-6">
          {fields.map((field) => {
            if (field.type === 'select') {
              return (
                <div key={field.name}>
                  <label className="block text-sm font-semibold mb-1">{field.label}</label>
                  <select
                    name={field.name}
                    value={values[field.name] || ''}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Seleccionar ...</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              );
            }
            if (field.type === 'checkbox-group') {
              return (
                <div key={field.name}>
                  <label className="block text-sm font-semibold mb-1">{field.label}</label>
                  <div className="flex flex-wrap gap-4">
                    {field.options?.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          name={opt.value}
                          checked={!!values[opt.value]}
                          onChange={handleChange}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div key={field.name}>
                <label className="block text-sm font-semibold mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={typeof values[field.name] === 'undefined' ? '' : values[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full border rounded px-3 py-2"
                  autoComplete="off"
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            className="flex-1 py-2 rounded font-bold text-white bg-red-600 hover:bg-red-700"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            type="submit"
            className="flex-1 py-2 rounded font-bold text-white bg-green-600 hover:bg-green-700"
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalFormGeneric;
