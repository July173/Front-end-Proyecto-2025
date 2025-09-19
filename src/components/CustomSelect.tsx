import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import React from "react";

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
}

export default function CustomSelect({
  value,
  onChange,
  options,
  label = "Selecciona una opción",
  placeholder = "Selecciona una opción",
  classNames = {},
}: CustomSelectProps) {
  return (
    <div className="relative">
      <label className={classNames.label || "block text-sm font-medium text-gray-700 mb-2"}>
        {label}
      </label>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className={classNames.trigger || "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#43A047] focus:border-transparent transition-all font-semibold bg-white flex items-center justify-between h-11"}>
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