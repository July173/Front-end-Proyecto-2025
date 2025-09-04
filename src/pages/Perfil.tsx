import React, { useEffect, useState } from 'react';
import { requestPasswordResetCode, verifyResetCode } from '../Api/Services/User';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { getPersonById } from '../Api/Services/Person';
import { useUserData } from '../hook/useUserData';

export const Perfil = () => {
  const { userData } = useUserData();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Modal recuperación
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<'send'|'verify'|'reset'>('send');
  const [modalLoading, setModalLoading] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    setError(null);
    setLoading(true);
    if (userData && userData.person) {
      getPersonById(userData.person)
        .then(setPerson)
        .catch(() => setError('No se pudo cargar la información'))
        .finally(() => setLoading(false));
    } else if (userData && !userData.person) {
      setError('No se encontró el id de persona en la sesión');
      setLoading(false);
    } else {
      setLoading(true); // Esperar a que userData esté disponible
    }
  }, [userData && userData.person]);


  // Lógica modal: enviar correo al abrir
  useEffect(() => {
    if (showModal && modalStep === 'send' && userData?.email) {
      setModalLoading(true);
      setModalMsg(' o de recuperación...');
      requestPasswordResetCode(userData.email)
        .then(res => {
          if (res.success) {
            setModalStep('verify');
            setModalMsg('Se ha enviado un código de verificación a tu correo institucional.');
          } else {
            setModalError(res.message || 'No se pudo enviar el correo.');
          }
        })
        .catch(() => setModalError('No se pudo enviar el correo.'))
        .finally(() => setModalLoading(false));
    }
    // eslint-disable-next-line
  }, [showModal, modalStep, userData]);


  // DEBUG: Mostrar el contenido de userData y el valor de person
  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return (
    <div className="p-8 text-red-500">
      {error}
      <pre className="text-xs text-black bg-gray-100 mt-4 p-2 rounded">userData: {JSON.stringify(userData, null, 2)}{"\n"}person: {userData?.person ? userData.person : 'NO DEFINIDO'}</pre>
    </div>
  );
  if (!person) return (
    <div className="p-8 text-orange-500">
      No se encontró la persona.<br />
      <pre className="text-xs text-black bg-gray-100 mt-4 p-2 rounded">userData: {JSON.stringify(userData, null, 2)}{"\n"}person: {userData?.person ? userData.person : 'NO DEFINIDO'}</pre>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow">
      <div className="bg-black/50 rounded-lg shadow p-8 flex flex-col items-center relative mb-8">
      
       
          <div className="w-28 h-28 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
            {person.image ? (
              <img  src={`http://localhost:8000${person.image}`} alt="Foto de perfil" className="object-cover w-full h-full" />
            ) : (
              <span className="text-4xl font-bold text-gray-600">
                {person.first_name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
 

        <div className="mt-4" />
        <h1 className="text-3xl font-bold text-white text-center">
          {person.first_name} {person.second_name || ''} {person.first_last_name} {person.second_last_name || ''}
        </h1>
        <p className="text-gray-100  text-center">{userData?.email}</p>
      </div>



  
        <h2 className="text-2xl font-bold mb-2 text-[#263238]">Información Personal</h2>
        <p className="font-semibold mb-4 text-gray-700">Datos Personales</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Nombres */}
          <fieldset className="relative border-2 border-gray-500 rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl px-4 pt-3 pb-2">
            <legend className="px-1 text-xs font-semibold text-[#1976d2]">Nombres</legend>
            <div className="flex items-center">
              <input value={person.first_name + (person.second_name ? ' ' + person.second_name : '')} readOnly className="w-full bg-transparent outline-none text-gray-700" />
              <span className="ml-2 text-gray-400">
                <i className="fa fa-user" />
              </span>
            </div>
          </fieldset>
          {/* Apellidos */}
          <fieldset className="relative border-2 border-gray-500 rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl px-4 pt-3 pb-2">
            <legend className="px-1 text-xs font-semibold text-[#1976d2]">Apellidos</legend>
            <div className="flex items-center">
              <input value={person.first_last_name + (person.second_last_name ? ' ' + person.second_last_name : '')} readOnly className="w-full bg-transparent outline-none text-gray-700" />
              <span className="ml-2 text-gray-400">
                <i className="fa fa-user" />
              </span>
            </div>
          </fieldset>
          {/* Documento */}
          <fieldset className="relative border-2 border-gray-500 rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl px-4 pt-3 pb-2">
            <legend className="px-1 text-xs font-semibold text-[#1976d2]">Documento</legend>
            <div className="flex items-center">
              <input value={person.number_identification} readOnly className="w-full bg-transparent outline-none text-gray-700" />
              <span className="ml-2 text-gray-400">
                <i className="fa fa-id-card" />
              </span>
            </div>
          </fieldset>
          {/* Tipo Documento */}
          <fieldset className="relative border-2 border-gray-500 rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl px-4 pt-3 pb-2">
            <legend className="px-1 text-xs font-semibold text-[#1976d2]">Tipo Documento</legend>
            <div className="flex items-center">
              <input value={person.type_identification} readOnly className="w-full bg-transparent outline-none text-gray-700" />
              <span className="ml-2 text-gray-400">
                <i className="fa fa-id-card" />
              </span>
            </div>
          </fieldset>
          {/* Correo */}
          <fieldset className="relative border-2 border-gray-500 rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl px-4 pt-3 pb-2">
            <legend className="px-1 text-xs font-semibold text-[#1976d2]">Correo</legend>
            <div className="flex items-center">
              <input value={userData?.email} readOnly className="w-full bg-transparent outline-none text-gray-700" />
              <span className="ml-2 text-gray-400">
                <i className="fa fa-envelope" />
              </span>
            </div>
          </fieldset>
          {/* Teléfono */}
          <fieldset className="relative border-2 border-gray-500 rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl px-4 pt-3 pb-2">
            <legend className="px-1 text-xs font-semibold text-[#1976d2]">Teléfono</legend>
            <div className="flex items-center">
              <input value={person.phone_number} readOnly className="w-full bg-transparent outline-none text-gray-700" />
              <span className="ml-2 text-gray-400">
                <i className="fa fa-phone" />
              </span>
            </div>
          </fieldset>
        </div>
        <button
          className="bg-green-600 hover:bg-green-700  font-bold py-3 px-6 rounded-lg shadow mx-auto block mt-6"
          onClick={() => {
            setShowModal(true);
            setModalStep('send');
            setModalMsg('');
            setModalError('');
            setCode('');
            setCodeError('');
          }}
        >
          Cambiar Contraseña
        </button>

      {/* Modal recuperación */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl" onClick={() => setShowModal(false)}>&times;</button>
            {modalStep === 'verify' && (
              <>
                <h2 className="text-xl font-bold mb-2 text-[#263238]">Verifica tu correo</h2>
                <p className="mb-4 text-gray-700">{modalMsg}<br /><span className="font-semibold">{userData?.email}</span></p>
                <form onSubmit={async e => {
                  e.preventDefault();
                  setModalLoading(true);
                  setModalError('');
                  if (!code.match(/^\d{6}$/)) {
                    setCodeError('El código debe ser de 6 dígitos numéricos.');
                    setModalLoading(false);
                    return;
                  }
                  setCodeError('');
                  const res = await verifyResetCode(userData.email, code);
                  setModalLoading(false);
                  if (res.success) {
                    setModalStep('reset');
                  } else {
                    setModalError(res.message || 'Código incorrecto o expirado.');
                  }
                }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-[#1976d2]">Código de verificación</label>
                    <input
                      type="text"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Ingresa el código"
                      disabled={modalLoading}
                      maxLength={6}
                    />
                    {codeError && <span className="text-red-500 text-xs">{codeError}</span>}
                  </div>
                  {modalError && <div className="text-red-500 text-sm mb-2">{modalError}</div>}
                  <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow w-full" disabled={modalLoading}>
                    {modalLoading ? 'Verificando...' : 'Verificar Código'}
                  </button>
                </form>
              </>
            )}
            {modalStep === 'send' && (
              <div className="flex flex-col items-center justify-center min-h-[180px]">
                <span className="text-gray-700 mb-2">{modalMsg}</span>
                {modalError && <span className="text-red-500 text-sm">{modalError}</span>}
                {modalLoading && <span className="text-gray-400 text-sm mt-2">Enviando...</span>}
              </div>
            )}
            {modalStep === 'reset' && (
              <ResetPasswordForm onNavigate={() => {
                // Cerrar sesión y redirigir al login global
                localStorage.removeItem('user_data');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/?view=login';
              }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

