import { useState } from "react";

export function useFormHandlers(validatePhone) {
  const [phoneError, setPhoneError] = useState('');
  const [humanTalentPhoneError, setHumanTalentPhoneError] = useState('');

  const handlePhoneChange = (updateFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateFormData('bossPhone', value);
    setPhoneError(validatePhone(value));
  };

  const handleHumanTalentPhoneChange = (updateFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateFormData('humanTalentPhone', value);
    setHumanTalentPhoneError(validatePhone(value));
  };

  return { phoneError, setPhoneError, humanTalentPhoneError, setHumanTalentPhoneError, handlePhoneChange, handleHumanTalentPhoneChange };
}
