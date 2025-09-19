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
  customRender,
  onProgramChange,
}) => {
  const [values, setValues] = React.useState(initialValues);
  const [error, setError] = React.useState('');

  // Solo actualiza los valores cuando el modal se abre por primera vez o initialValues cambian realmente
  const prevIsOpen = React.useRef(false);
  React.useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      setValues(initialValues);
    }
    prevIsOpen.current = isOpen;
    // Solo depende de isOpen
    // eslint-disable-next-line
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Si es el select de programa y existe el manejador especial, usarlo
    if (name === 'program_id' && typeof onProgramChange === 'function') {
      onProgramChange(e);
    }
    // Para checkbox-group, name es el id del permiso, value es el label
    if (type === 'checkbox' && Array.isArray(fields.find(f => f.type === 'checkbox-group')?.options)) {
      // ...existing code...
      setValues((prev) => {
        const groupField = fields.find(f => f.type === 'checkbox-group');
        if (groupField && groupField.options.some(opt => String(opt.value) === name)) {
          // ...existing code...
          let prevArr = Array.isArray(prev[groupField.name]) ? prev[groupField.name].map(String) : [];
          if (checked) {
            if (!prevArr.includes(String(name))) {
              prevArr = [...prevArr, String(name)];
            }
            return {
              ...prev,
              [groupField.name]: prevArr,
              [name]: true,
            };
          } else {
            return {
              ...prev,
              [groupField.name]: prevArr.filter((id) => id !== String(name)),
              [name]: false,
            };
          }
        }
        // ...existing code...
        return {
          ...prev,
          [name]: checked,
        };
      });
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar campos obligatorios excepto los que explícitamente no lo son
    // Por convención, los campos que no son obligatorios deben tener required: false
    const missing = fields.filter(f => (f.required !== false) && (!values[f.name] || (Array.isArray(values[f.name]) && values[f.name].length === 0)));
    if (missing.length > 0) {
      setError('Todos los campos con * son obligatorios');
      return;
    }
    setError('');
    onSubmit(values);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <form
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg max-h-[80vh] flex flex-col"
        onSubmit={handleSubmit}
        style={{ maxHeight: '80vh' }}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {error && (
          <div className="text-red-600 text-sm mb-2 font-semibold">{error}</div>
        )}
        <div className="space-y-4 mb-6 overflow-y-auto" style={{ maxHeight: '48vh' }}>
          {fields.map((field) => {
            // Determinar si el campo es obligatorio
            const isRequired = field.required !== false;
            // Renderizar label con asterisco rojo si es obligatorio
            const labelContent = (
              <span>
                {field.label}
                {isRequired && <span className="text-red-600 font-bold"> *</span>}
              </span>
            );
            if (field.type === 'custom-permissions' && typeof customRender === 'function') {
              return (
                <div key={field.name}>
                  <label className="block text-sm font-semibold mb-1">{labelContent}</label>
                  {customRender({ values, setValues })}
                </div>
              );
            }
            if (field.type === 'select') {
              return (
                <div key={field.name}>
                  <label className="block text-sm font-semibold mb-1">{labelContent}</label>
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
              // ...existing code...
              const allChecked = Array.isArray(values[field.name]) && field.options?.length > 0 && field.options.every(opt => values[field.name].includes(opt.value));
              const handleCheckAll = (e) => {
                const checked = e.target.checked;
                setValues((prev) => ({
                  ...prev,
                  [field.name]: checked ? field.options.map(opt => opt.value) : [],
                }));
              };
              // Mostrar en dos columnas
              const colCount = 2;
              const rows = [];
              for (let i = 0; i < field.options.length; i += colCount) {
                rows.push(field.options.slice(i, i + colCount));
              }
              return (
                <div key={field.name}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-base  font-semibold">{labelContent}</label>
                    <label className="flex items-center gap-4 text-sm">
                      <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={handleCheckAll}
                      />
                      Todos
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-14">
                    {rows.map((row, rowIdx) => (
                      row.map((opt, colIdx) => (
                        <label key={opt.value} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name={String(opt.value)}
                            checked={Array.isArray(values[field.name]) ? values[field.name].map(String).includes(String(opt.value)) : false}
                            onChange={handleChange}
                          />
                          <span className="text-base">{opt.label}</span>
                        </label>
                      ))
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div key={field.name}>
                <label className="block text-sm font-semibold mb-1">{labelContent}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={typeof values[field.name] === 'undefined' ? '' : values[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full border rounded px-3 py-2"
                  autoComplete="off"
                  disabled={field.disabled === true}
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
