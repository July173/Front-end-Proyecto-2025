import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import React from "react";
/**
 * Componente CustomSelect
 * ----------------------
 * Select personalizado basado en Radix UI, con estilos y opciones flexibles.
 * Permite seleccionar una opción de una lista y personalizar el diseño.
 *
 * Props:
 * - value: string                  // Valor seleccionado actualmente
 * - onChange: (value: string) => void // Función que se llama al cambiar la selección
 * - options: Option[]              // Array de opciones disponibles (value, label)
 * - label?: string                 // Label del select (opcional)
 * - placeholder?: string           // Placeholder cuando no hay selección (opcional)
 * - classNames?: object            // Clases CSS personalizadas para trigger, content, item, label (opcional)
 *
 * Uso:
 * <CustomSelect
 *   value={valor}
 *   onChange={setValor}
 *   options={[{ value: '1', label: 'Uno' }, { value: '2', label: 'Dos' }]}
 *   label="Selecciona número"
 *   placeholder="Elige una opción"
 * />
 */

// Estructura de cada opción del select
interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  classNames?: {
    trigger?: string;
    content?: string;
    item?: string;
    label?: string;
  };
  disabled?: boolean;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  label = "Selecciona una opción",
  placeholder = "Selecciona una opción",
  classNames = {},
  disabled = false,
}: CustomSelectProps) {
  return (
    <div className="relative">
      <label
        className={classNames.label || "block text-sm font-medium mb-2"}
        style={{ color: '#2D7430', ...(classNames.label ? {} : {}) }}
      >
        {label}
      </label>
      <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
        <Select.Trigger className={classNames.trigger || "w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#43A047] focus:border-transparent font-normal bg-white flex items-center justify-between h-10"} disabled={disabled}>
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="flex-shrink-0">
            <ChevronDown className="h-4 w-4" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={classNames.content || "bg-white border border-gray-300 rounded-lg shadow-lg z-50"}>
            <Select.Viewport>
              {options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className={classNames.item || "px-4 py-2 cursor-pointer hover:bg-[#bdbdbd] hover:text-white focus:bg-[#bdbdbd] focus:text-gray-700 rounded-md flex items-center gap-2"}
                >
                  <Select.ItemText>{opt.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="h-4 w-4 text-[#43A047]" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}