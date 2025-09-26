

import React, { useEffect, useState } from 'react';
import { Person } from '../Api/types/entities/person.types';
import { Camera } from 'lucide-react';
import { requestPasswordResetCode, verifyResetCode } from '../Api/Services/User';
import { getPersonById, patchPersonImage } from '../Api/Services/Person';
import { useUserData } from '../hook/useUserData';
import ProfileImageUploader from '../components/Perfil/ProfileImageUploader';
import PersonalInfoDisplay from '../components/Perfil/PersonalInfoDisplay';
import PasswordResetModal from '../components/Perfil/PasswordResetModal';

/**
 * Página de perfil de usuario.
 * Muestra información personal, permite cambiar imagen de perfil y recuperación de contraseña.
 * Utiliza subcomponentes para imagen, datos personales y modal de recuperación.
 */
export const Perfil = () => {
  const { userData } = useUserData();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Imagen editable
  const [editImgLoading, setEditImgLoading] = useState(false);
  const [editImgError, setEditImgError] = useState('');
  const [showImgConfirm, setShowImgConfirm] = useState(false);
  const [pendingImgFile, setPendingImgFile] = useState<File | null>(null);
  // Modal recuperación
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<'send' | 'verify' | 'reset'>('send');
  const [modalLoading, setModalLoading] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [modalError, setModalError] = useState('');

  /**
   * Obtiene los datos de la persona asociada al usuario actual.
   * Si no hay id de persona, muestra error.
   */
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
  /**
   * Lógica para mostrar el modal de recuperación y enviar el correo de recuperación.
   * Solo se activa si el modal está abierto y el paso es 'send'.
   */
  useEffect(() => {
    if (showModal && modalStep === 'send' && userData?.email) {
      setModalLoading(true);
      setModalMsg(' enviando correo de recuperación...');
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


  /**
   * Renderiza la UI principal del perfil.
   * Muestra imagen, nombre, correo, datos personales y botón para cambiar contraseña.
   * El modal de recuperación se muestra según el estado.
   */
  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow">
      <div className="bg-black/50 rounded-lg shadow p-8 flex flex-col items-center relative mb-8">
        <ProfileImageUploader
          person={person}
          onImageChange={file => {
            setPendingImgFile(file);
            setShowImgConfirm(true);
          }}
          editImgLoading={editImgLoading}
          editImgError={editImgError}
          showImgConfirm={showImgConfirm}
          pendingImgFile={pendingImgFile}
          setShowImgConfirm={setShowImgConfirm}
          setPendingImgFile={setPendingImgFile}
          patchPersonImage={async (id, file) => {
            setEditImgLoading(true);
            setEditImgError('');
            try {
              const updated = await patchPersonImage(id, file);
              return updated;
            } catch (err) {
              setEditImgError('No se pudo actualizar la imagen');
              throw err;
            } finally {
              setEditImgLoading(false);
              setPendingImgFile(null);
            }
          }}
          setPerson={setPerson}
        />
        <div className="mt-4" />
        <h1 className="text-3xl font-bold text-white text-center">
          {person.first_name} {person.second_name || ''} {person.first_last_name} {person.second_last_name || ''}
        </h1>
        <p className="text-gray-100 text-center">{userData?.email}</p>
      </div>
      <PersonalInfoDisplay person={person} email={userData?.email} />
      <button
        className="bg-green-600 hover:bg-green-700 font-bold py-3 px-6 rounded-lg shadow mx-auto block mt-6"
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
      <PasswordResetModal
        showModal={showModal}
        modalStep={modalStep}
        modalMsg={modalMsg}
        modalError={modalError}
        modalLoading={modalLoading}
        code={code}
        codeError={codeError}
        userEmail={userData?.email}
        setShowModal={setShowModal}
        setModalStep={setModalStep}
        setModalMsg={setModalMsg}
        setModalError={setModalError}
        setCode={setCode}
        setCodeError={setCodeError}
        verifyResetCode={verifyResetCode}
      />
    </div>
  );
}

