import React, { useState } from 'react';
import SupportModal from './SupportModal';
import TermsModal from './TermsModal';
import PrivacyModal from './PrivacyModal'; // Importa el nuevo modal

const FooterLinks: React.FC = () => {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false); // Estado para modal de privacidad

  const openSupportModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsSupportModalOpen(true);
  };

  const closeSupportModal = () => {
    setIsSupportModalOpen(false);
  };

  const openTermsModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsTermsModalOpen(true);
  };

  const closeTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  const openPrivacyModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsPrivacyModalOpen(true);
  };

  const closePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };

  return (
    <>
      <div className="sena-footer-links">
        <a 
          href="#" 
          onClick={openSupportModal} 
          className="hover:text-gray-600 transition-colors"
        >
          Soporte
        </a>
        <a 
          href="#" 
          onClick={openTermsModal}
          className="hover:text-gray-600 transition-colors"
        >
          Términos y Condiciones
        </a>
        <a 
          href="#" 
          onClick={openPrivacyModal}
          className="hover:text-gray-600 transition-colors"
        >
          Política de Privacidad
        </a>
      </div>

      {/* Modal de Soporte */}
      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={closeSupportModal} 
      />

      {/* Modal de Términos y Condiciones */}
      <TermsModal 
        isOpen={isTermsModalOpen} 
        onClose={closeTermsModal} 
      />

      {/* Modal de Política de Privacidad */}
      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={closePrivacyModal} 
      />
    </>
  );
};

export default FooterLinks;