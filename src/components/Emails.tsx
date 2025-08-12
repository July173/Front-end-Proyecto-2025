import {
  CheckCircle,
  XCircle,
  ExclamationTriangle,
  Clock,
  Key,
  Bell,
  ShieldLock,
  Calendar,
  People,
  FileText
} from 'react-bootstrap-icons';

import React from 'react';

const ICONS = {
  success: <CheckCircle className="mx-auto text-green-500" size={48} />,
  error: <XCircle className="mx-auto text-red-500" size={48} />,
  warning: <ExclamationTriangle className="mx-auto text-yellow-500" size={48} />,
  info: <Clock className="mx-auto text-blue-500" size={48} />,
  key: <Key className="mx-auto text-blue-500" size={48} />,
  bell: <Bell className="mx-auto text-orange-500" size={48} />,
  shield: <ShieldLock className="mx-auto text-green-700" size={48} />,
  calendar: <Calendar className="mx-auto text-orange-500" size={32} />,
  people: <People className="mx-auto text-blue-500" size={32} />,
  file: <FileText className="mx-auto text-blue-500" size={48} />,
};

const HEADER_BG = 'bg-green-600';

export type EmailTemplateProps = {
  estado?: 'success' | 'error' | 'warning' | 'info' | 'primary';
  titulo: string;
  icono?: React.ReactNode;
  subtitulo?: React.ReactNode;
  mensajePrincipal?: React.ReactNode;
  bloques?: React.ReactNode[];
  acciones?: React.ReactNode;
  pieDePagina?: React.ReactNode;
};

export function EmailTemplate({
  estado = 'info',
  titulo,
  icono,
  subtitulo,
  mensajePrincipal,
  bloques = [],
  acciones,
  pieDePagina,
}: EmailTemplateProps) {
  return (
    <div className="bg-white rounded-lg shadow-md max-w-md mx-auto p-6 font-sans">
      {/* Header */}
      <div className={`${HEADER_BG} text-white rounded-t-lg px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-16">
          <img src="/public/logo.png" alt="SENA" className="h-8" />
          <span className="font-semibold text-lg">Sena-Sistema de Autogestión</span>
        </div>
      </div>

      {/* Título y estado */}
      <div className="text-center mt-6">
        <h2 className="font-bold text-xl mb-2">{titulo}</h2>
        {icono ?? ICONS[estado]}
        {subtitulo && <p className="mt-4 text-lg">{subtitulo}</p>}
      </div>

      {/* Mensaje principal */}
      {mensajePrincipal && (
        <div className="mt-4 text-center text-base mb-2">{mensajePrincipal}</div>
      )}

      {/* Bloques de contenido */}
      {bloques.map((bloque, idx) => (
        <div key={idx} className="mb-4">{bloque}</div>
      ))}

      {/* Acciones */}
      {acciones && (
        <div className="mb-4 flex justify-center">{acciones}</div>
      )}

      {/* Pie de página */}
      <div className="bg-gray-100 text-gray-400 text-center rounded-b-lg px-4 py-3 text-sm">
        {pieDePagina ?? (
          <>
            Este es un correo automático del Sistema de Autogestión SENA<br />
            Por favor no responda a este correo
          </>
        )}
      </div>
    </div>
  );
}

// Ejemplos de uso para cada tipo de correo:

export function EmailRegistroPendiente() {
  return (
    <EmailTemplate
      estado="info"
      titulo="Registro Exitoso - Cuenta Pendiente de Activación"
      icono={ICONS.success}
      subtitulo={<>¡Bienvenido al Sistema de Seguimiento, <span className="font-bold">Juan Pérez</span>!</>}
      bloques={[
        <div className="flex items-center justify-center bg-blue-100 border border-blue-300 rounded-lg py-2 px-4">
          <Clock className="text-blue-500 mr-2" size={24} />
          <span className="text-blue-600 font-semibold text-lg">Cuenta pendiente de activación</span>
        </div>,
        <p className="text-center">Su registro ha sido completado exitosamente.<br />Los detalles de su cuenta son</p>,
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Nombre :</span>
            <span>Juan Pérez</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Email:</span>
            <span>juan.perez@ejemplo.com</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Fecha de registro:</span>
            <span>15/7/2025</span>
          </div>
        </div>,
        <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4">
          <span className="font-semibold text-yellow-700">Próximos pasos:</span>
          <ul className="list-disc ml-6 mt-2 text-yellow-700 text-sm">
            <li>Su cuenta está pendiente de activación por parte del administrador</li>
            <li>Recibirá un correo con sus credenciales una vez la cuenta sea habilitada</li>
            <li>Manténgase atento a su correo electrónico</li>
          </ul>
        </div>
      ]}
    />
  );
}

export function EmailRecuperacionContrasena() {
  return (
    <EmailTemplate
      estado="info"
      titulo="Recuperación de Contraseña"
      icono={ICONS.key}
      subtitulo="Código de Recuperación de Contraseña"
      mensajePrincipal={<>Estimado/a Juan Pérez, hemos recibido una solicitud para restablecer su contraseña.</>}
      bloques={[
        <div className="bg-blue-300 border border-blue-400 rounded-lg py-2 px-4 flex flex-col items-center">
          <ShieldLock className="text-blue-700 mb-1" size={24} />
          <span className="text-blue-700 font-semibold text-lg">Código de Recuperación</span>
          <span className="bg-blue-100 text-blue-800 font-bold rounded px-3 py-1 mt-2">Código</span>
        </div>,
        <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Clock className="text-yellow-600 mr-2" size={20} />
            <span className="font-semibold text-yellow-700">Importante:</span>
          </div>
          <ul className="list-disc ml-6 text-yellow-700 text-sm">
            <li>Este código expira el: fechaExpiracion.</li>
            <li>Solo puede utilizarse una vez</li>
            <li>Si no solicitó este cambio, ignore este correo</li>
          </ul>
        </div>,
        <div className="bg-gray-100 rounded-lg p-4">
          <span className="font-semibold">Pasos a seguir:</span>
          <ol className="list-decimal ml-6 mt-2 text-gray-700 text-sm">
            <li>Ingrese el código de recuperación</li>
            <li>Establezca su nueva contraseña</li>
            <li>Inicie sesión con su nueva contraseña</li>
          </ol>
        </div>
      ]}
    />
  );
}


// Ejemplo de correo: Cuenta Activada
export function EmailCuentaActivada() {
  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-md max-w-md mx-auto p-6 font-sans">
        <div className="bg-green-600 text-white rounded-t-lg px-4 py-3 flex items-center justify-between">
          <img src="/public/logoSenaVerde.png" alt="SENA" className="h-8" />
          <span className="font-semibold text-lg">Sena-Sistema de Autogestión</span>
        </div>
        <div className="text-center mt-6">
          <h2 className="font-bold text-xl mb-2">Cuenta Activada - Credenciales de Acceso</h2>
          <span className="text-green-500 text-5xl">&#10003;</span>
          <p className="mt-4 text-lg font-bold">¡Su cuenta ha sido activada!</p>
        </div>
        <div className="mt-4 text-center text-base mb-2">
          Estimado/a Juan Pérez, su cuenta ha sido habilitada por el administrador. Ya puede acceder al sistema con las siguientes credenciales:
        </div>
        <div className="bg-green-200 rounded-lg p-4 mb-4">
          <span className="font-semibold text-green-700">Credenciales de Acceso</span>
          <div className="flex justify-between mt-2">
            <span>Usuario:</span>
            <span className="bg-green-100 px-2 py-1 rounded">juan.perez@soy.sena.edu.co</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Contraseña temporal:</span>
            <span className="bg-green-100 px-2 py-1 rounded">Temp123!</span>
          </div>
        </div>
        <div className="bg-blue-100 rounded-lg p-4 mb-4">
          <span className="font-semibold">Instrucciones importantes:</span>
          <ul className="list-disc ml-6 mt-2 text-blue-700 text-sm">
            <li>Esta es una contraseña temporal que debe cambiar en su primer ingreso</li>
            <li>Mantenga sus credenciales seguras</li>
            <li>Acceda al sistema mediante el siguiente enlace</li>
          </ul>
        </div>
        <div className="bg-gray-100 text-gray-400 text-center rounded-b-lg px-4 py-3 text-sm">
          Este es un correo automático del Sistema de Autogestión SENA<br />Por favor no responda a este correo
        </div>
      </div>
    </div>
  );
}

// Ejemplo de correo: Cuenta Desactivada
export function EmailCuentaDesactivada() {
  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-md max-w-md mx-auto p-6 font-sans">
        <div className="bg-green-600 text-white rounded-t-lg px-4 py-3 flex items-center justify-between">
          <img src="/public/logoSenaVerde.png" alt="SENA" className="h-8" />
          <span className="font-semibold text-lg">Sena-Sistema de Autogestión</span>
        </div>
        <div className="text-center mt-6">
          <h2 className="font-bold text-xl mb-2">Cuenta Desactivada</h2>
          <span className="text-red-500 text-5xl">&#10007;</span>
          <p className="mt-4 text-lg font-bold">Cuenta Desactivada</p>
        </div>
        <div className="mt-4 text-center text-base mb-2">
          Estimado/a María García, le informamos que su cuenta de instructor ha sido desactivada.
        </div>
        <div className="bg-red-100 rounded-lg p-4 mb-4">
          <span className="font-semibold text-red-700">Información de la desactivación:</span>
          <div className="flex justify-between mt-2">
            <span>Motivo:</span>
            <span className="font-bold text-red-700">Fin de contrato</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Fecha:</span>
            <span className="font-bold text-red-700">16/7/2025</span>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4 mb-4">
          <span className="font-semibold text-yellow-700">Importante:</span>
          <ul className="list-disc ml-6 mt-2 text-yellow-700 text-sm">
            <li>Ya no podrá acceder al sistema con sus credenciales actuales</li>
            <li>Si considera que esto es un error, contacte al administrador</li>
            <li>Los seguimientos asignados serán reasignados a otros instructores</li>
          </ul>
        </div>
        <div className="bg-blue-100 rounded-lg p-4 mb-4">
          <span className="font-semibold text-blue-700">Contacto:</span>
          <span>Contacte al coordinador para más información</span>
        </div>
        <div className="bg-gray-100 text-gray-400 text-center rounded-b-lg px-4 py-3 text-sm">
          Este es un correo automático del Sistema de Autogestión SENA<br />Por favor no responda a este correo
        </div>
      </div>
    </div>
  );
}

