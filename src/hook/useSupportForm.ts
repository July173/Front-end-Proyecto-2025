/**
 * Hook personalizado para gestionar el formulario de soporte/contacto en la aplicación.
 * Permite validar, enviar y manejar el estado del formulario usando Web3Forms.
 *
 * Uso:
 * - Llama a `handleInputChange` para actualizar los campos del formulario.
 * - Usa `submitForm` para validar y enviar los datos.
 * - El estado `error`, `success` e `isLoading` permite mostrar mensajes y controlar la UI.
 */

import { useState } from 'react';

/**
 * Hook useSupportForm
 * Proporciona funciones y estado para gestionar el formulario de soporte/contacto.
 *
 * @returns {Object} Estado y funciones para el formulario de soporte.
 */
const useSupportForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  //  CONFIGURA ESTOS VALORES:
  const SUPPORT_EMAIL = 'july345ra@gmail.com'; // CAMBIA ESTE EMAIL
  const WEB3FORMS_ACCESS_KEY = '5643954c-17a9-45c6-a918-4c6cb867aa99'; //  Tu key de Web3Forms

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar errores cuando el usuario empiece a escribir
    if (error) setError(null);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      category: '',
      message: ''
    });
    setError(null);
    // No limpiar success aquí, para que el mensaje de éxito se muestre correctamente
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return false;
    }
    if (!formData.email.trim()) {
      setError('El email es requerido');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Ingresa un email válido');
      return false;
    }
    if (!formData.category) {
      setError('Selecciona una categoría');
      return false;
    }
    if (!formData.message.trim()) {
      setError('El mensaje es requerido');
      return false;
    }
    if (formData.message.trim().length < 10) {
      setError('El mensaje debe tener al menos 10 caracteres');
      return false;
    }
    return true;
  };

  // Envío principal con Web3Forms
  const sendWithWeb3Forms = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', WEB3FORMS_ACCESS_KEY);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', `[${formData.category.toUpperCase()}] Consulta SENA AutoGestión - ${formData.name}`);
      formDataToSend.append('message', `
NUEVA CONSULTA DESDE AUTOGESTION SENA

 Información del Usuario:
• Nombre: ${formData.name}
• Email: ${formData.email}
• Categoría: ${formData.category}
• Fecha: ${new Date().toLocaleString('es-CO')}

 Mensaje:
${formData.message}

---
 Enviado desde: AutoGestión SENA
 Timestamp: ${new Date().toISOString()}
      `.trim());

      // Campos adicionales opcionales
      formDataToSend.append('from_name', formData.name);
      formDataToSend.append('reply_to', formData.email);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();
      
      if (result.success) {
        setSuccess(true);
        resetForm();
    
        return true;
      } else {
        throw new Error(result.message || 'Error al enviar el formulario');
      }
      
    } catch (err) {
      console.error('Error con Web3Forms:', err);
      setError(`Error al enviar: ${err.message}`);
      return false;
    }
  };

  

  // Función principal
  const submitForm = async () => {
    if (!validateForm()) return false;

    setIsLoading(true);
    setError(null);

    try {
      // Intenta primero con Web3Forms
      const web3FormsSuccess = await sendWithWeb3Forms();
      if (web3FormsSuccess) return true;

     
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    success,
    handleInputChange,
    submitForm,
    resetForm,
    setSuccess,
  };
};

export default useSupportForm;