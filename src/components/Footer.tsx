import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 w-full py-4 text-center">
      <p className="text-sm text-gray-500">
        © {currentYear}. Desarrollado por Servicio Nacional de Aprendizaje
      </p>
    </footer>
  );
};

export default Footer;