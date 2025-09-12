import React from 'react';
import { User } from 'lucide-react';
import type { InfoCardProps } from '../Api/types';

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
  const showAction = actionLabel && actionType && onActionClick;
  return (
    <div className="bg-white p-4 rounded-lg shadow w-[350px] min-h-[180px] flex flex-col justify-between border-2 border-gray-300">
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
              className="border border-gray-300 rounded px-3 py-1 text-sm font-semibold hover:bg-gray-100 ml-auto"
              onClick={onButtonClick}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
      {showAction ? (
        <button
          className={`flex items-center justify-center gap-2 w-full py-2 rounded ${
            actionType === 'enable'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          } font-semibold mt-2`}
          onClick={onActionClick}
        >
          <User className="w-4 h-4" />
          {actionLabel}
        </button>
      ) : (
        <button
          className="w-full py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold mt-2"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

// Ejemplo de uso de la card reutilizable
const CardSecurity = () => {
  return (
    <div className="flex gap-4">
      <InfoCard
        title="Administrador"
        statusLabel="2"
        statusColor="green"
        description="Acceso total al sitema"
        count={2}
        buttonText="Ajustar"
        onButtonClick={() => alert('Ajustar administrador')}
        actionLabel="Inhabilitar"
        actionType="disable"
        onActionClick={() => alert('Inhabilitar administrador')}
      />
      <InfoCard
        title="Gestion academica"
        statusLabel="Activo"
        statusColor="green"
        description="administracion de procesos educativos"
        count={2}
        buttonText="Ajustar"
        onButtonClick={() => alert('Ajustar gestión')}
        actionLabel="Inhabilitar"
        actionType="disable"
        onActionClick={() => alert('Inhabilitar gestión')}
      />
      <InfoCard
        title="Seguridad"
        statusLabel="Inhabilitado"
        statusColor="red"
        description="administración de usuarios"
        count={2}
        buttonText="Ajustar"
        onButtonClick={() => alert('Ajustar seguridad')}
        actionLabel="Habilitar"
        actionType="enable"
        onActionClick={() => alert('Habilitar seguridad')}
      />
    </div>
  );
};

export { InfoCard };
export default CardSecurity;
