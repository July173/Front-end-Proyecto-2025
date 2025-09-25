import { useState } from 'react';

export function useFormValidations() {
  // Teléfono: solo números y exactamente 10 dígitos
  const validatePhone = (value: string | number): string => {
    const str = String(value).replace(/\D/g, '');
    if (str.length !== 10) return 'El número debe tener exactamente 10 dígitos';
    return '';
  };

  // Fecha de fin: mínimo 6 meses después de inicio, mismo mes y año
  const validateEndDate = (start: number | null, end: number | null): string => {
    if (!start || !end) return '';
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    // Calcular la fecha esperada (6 meses después)
    const expectedEndDate = new Date(startDate);
    expectedEndDate.setMonth(expectedEndDate.getMonth() + 6);
    
    // Debe ser el mismo año que la fecha esperada
    if (endDate.getFullYear() !== expectedEndDate.getFullYear()) {
      return 'La fecha de fin debe ser en el mismo año';
    }
    
    // Debe ser exactamente 6 meses después
    if (endDate.getMonth() !== expectedEndDate.getMonth()) {
      const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                         'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      return `La fecha de fin debe ser en ${monthNames[expectedEndDate.getMonth()]} (6 meses después de ${monthNames[startDate.getMonth()]})`;
    }
    
    // Debe ser después de la fecha de inicio
    if (endDate.getTime() <= startDate.getTime()) {
      return 'La fecha de fin debe ser posterior a la de inicio';
    }
    
    return '';
  };

  return { validatePhone, validateEndDate };
}
