
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

// Colores de fondo y borde para el estado
const statusBg: Record<string, string> = {
  green: 'bg-green-100 text-green-900 ',
  red: 'bg-red-100 text-red-900 ',
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
  // Colores para botones
  const buttonStyles = {
    edit: 'bg-gray-100 text-gray-900 border border-gray-400 hover:bg-gray-200 rounded-2xl',
    enable: 'bg-green-50 text-green-900 border border-green-700 hover:bg-green-200 rounded-2xl',
    disable: 'bg-red-50 text-red-900 border border-red-700 hover:bg-red-200 rounded-2xl',
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow w-[350px] min-h-[180px] flex flex-col justify-between border-2 border-gray-300">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className={`rounded-full px-4 py-1 text-xs font-bold ${statusBg[statusColor]}`}>{statusColor === 'green' ? 'Activo' : 'Inhabilitado'}</span>
        </div>
        <p className="text-gray-700 text-sm mb-2">{description}</p>
        <div className="flex items-center mb-2">
                  {typeof count === 'number' && (
          <div className="text-sm text-gray-600 mt-2">{count} usuarios asignados</div>
        )}

          <div className="flex-1" />
          {showAction && (
            <button
              className={`flex items-center justify-center gap-2 px-4 py-2 font-semibold border transition-all duration-300 ml-auto ${buttonStyles.edit}`}
              onClick={onButtonClick}
            >
              Editar
            </button>
          )}
        </div>
      </div>
      {/* Botón principal o secundario según props */}
      {showAction ? (
        <button
          className={`flex items-center justify-center gap-2 w-full py-2 font-bold mt-2 border transition-all duration-300 ${
            actionType === 'enable'
              ? buttonStyles.enable
              : buttonStyles.disable
          }`}
          onClick={onActionClick}
        >
          <User className="w-4 h-4" />
          {actionLabel}
        </button>
      ) : (
        <button
          className={`flex items-center justify-center gap-2 w-full py-2 font-semibold border transition-all duration-300 mt-2 ${buttonStyles.edit}`}
          onClick={onButtonClick}
        >
          Editar
        </button>
      )}
    </div>
  );
};

export { InfoCard };
