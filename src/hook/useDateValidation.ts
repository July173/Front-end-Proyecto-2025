import { useState } from "react";

export function useDateValidation(formData, validateEndDate) {
  const [dateError, setDateError] = useState('');

  let minEndDate = '';
  let maxEndDate = '';
  if (formData.dateStartContract) {
    const startDate = new Date(formData.dateStartContract);
    const endMonthDate = new Date(startDate);
    endMonthDate.setMonth(endMonthDate.getMonth() + 6);
    minEndDate = new Date(endMonthDate.getFullYear(), endMonthDate.getMonth(), 1).toISOString().split('T')[0];
    maxEndDate = new Date(endMonthDate.getFullYear(), endMonthDate.getMonth() + 1, 0).toISOString().split('T')[0];
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startValue = new Date(e.target.value).getTime();
    formData.updateFormData('dateStartContract', startValue);
    setDateError('');
    if (formData.dateEndContract) {
      setDateError(validateEndDate(startValue, formData.dateEndContract));
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const endValue = new Date(e.target.value).getTime();
    formData.updateFormData('dateEndContract', endValue);
    if (formData.dateStartContract) {
      setDateError(validateEndDate(formData.dateStartContract, endValue));
    } else {
      setDateError('Debe seleccionar primero la fecha de inicio');
    }
  };

  return { minEndDate, maxEndDate, dateError, setDateError, handleStartDateChange, handleEndDateChange };
}
