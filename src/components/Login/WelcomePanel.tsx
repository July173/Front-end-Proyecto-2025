
import React from 'react';

/**
 * Componente WelcomePanel
 * Muestra un panel de bienvenida con el título y descripción de la plataforma.
 *
 * Características:
 * - Presenta el nombre 'AutoGestión CIES' y una breve descripción.
 * - Usado en la pantalla principal o de inicio.
 *
 * @returns {JSX.Element} Panel de bienvenida renderizado.
 */
const WelcomePanel = () => {
  return (
    <div className="sena-welcome-panel">
      <div className="text-center z-10 relative">
        <h2 className="text-4xl font-bold mb-4">
          Bienvenido a AutoGestión CIES
        </h2>
        <p className="text-xl opacity-90">
          Tu plataforma de gestión educativa
        </p>
      </div>
    </div>
  );
};

export default WelcomePanel;
