
/**
 * Componente InfoCard
 * -------------------
 * Este componente muestra una tarjeta informativa reutilizable para paneles de seguridad, gestión de usuarios, roles, etc.
 * Permite mostrar título, estado, descripción, cantidad de usuarios y botones de acción.
 *
 * Props:
 * - title: string                // Título principal de la tarjeta
 * - statusLabel: string          // Etiqueta del estado (ej: 'Activo', 'Inhabilitado', '2')
 * - statusColor: 'green' | 'red' // Color del estado (verde o rojo)
 * - description: string          // Descripción breve de la tarjeta
 * - count: number                // Cantidad de usuarios asignados (opcional)
 * - buttonText: string           // Texto del botón principal
 * - onButtonClick: () => void    // Acción al hacer click en el botón principal
 * - actionLabel: string          // Etiqueta del botón secundario (ej: 'Habilitar', 'Inhabilitar')
 * - actionType: 'enable' | 'disable' // Tipo de acción secundaria (define color)
 * - onActionClick: () => void    // Acción al hacer click en el botón secundario
 *
 * Uso:
 * <InfoCard
 *   title="Administrador"
 *   statusLabel="Activo"
 *   statusColor="green"
 *   description="Acceso total al sistema"
 *   count={2}
 *   buttonText="Ajustar"
 *   onButtonClick={...}
 *   actionLabel="Inhabilitar"
 *   actionType="disable"
 *   onActionClick={...}
 * />
 *
 * Si no se pasan props de acción secundaria, solo se muestra el botón principal.
 */

import React from 'react';
import { User } from 'lucide-react';
import type { InfoCardProps } from '../../Api/types/entities/misc.types';

// Colores de fondo para el estado
const statusBg: Record<string, string> = {
  green: 'bg-green-500',
  red: 'bg-red-500',
};

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  statusLabel,
  statusColor,
  description,
  count,
  buttonText,
  onButtonClick,
  actionLabel,
  actionType,
  onActionClick,
}) => {
  // Determina si se debe mostrar el botón de acción secundaria
  const showAction = actionLabel && actionType && onActionClick;
  return (
  <div className="bg-white p-4 rounded-lg shadow min-h-[180px] flex flex-col justify-between border-2 border-gray-300 w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className={`rounded-full px-4 py-1 text-xs font-bold text-white ${statusBg[statusColor]}`}>{statusLabel}</span>
        </div>
        <p className="text-gray-700 text-sm mb-2">{description}</p>
        <div className="flex items-center mb-2">
          {typeof count === 'number' && (
            <span className="text-sm text-gray-600">{count} usuarios asignados</span>
          )}
          <div className="flex-1" />
          {showAction && (
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 rounded font-semibold shadow transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-gray-300 ml-auto"
              onClick={onButtonClick}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
      {/* Botón principal o secundario según props */}
      {showAction ? (
        <button
          className={`flex items-center justify-center gap-2 w-full py-2 rounded ${
            actionType === 'enable'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-[#EE7878] hover:bg-[#FF0000] text-white'
          } font-semibold mt-2`}
          onClick={onActionClick}
        >
          <User className="w-4 h-4" />
          {actionLabel}
        </button>
      ) : (
        <button
          className="flex items-center justify-center gap-2 w-full py-2 rounded font-semibold shadow transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-gray-300 mt-2"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export { InfoCard };
