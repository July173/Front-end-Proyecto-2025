export interface requestAsignation{
    aprendizId: number;
    fichaId: number;
    dateEndContract: number;
    dateStartContract : number;
    enterpriseName: string;
    enterpriseNit : number;
    enterpriseLocation : string;
    enterpriseEmail : string;
    bossName : string;
    bossPhone : number;
    bossEmail: string;
    bossPosition :string ;
    humanTalentName: string;
    humanTalentEmail : string;
    humanTalentPhone: string;
    sede : number;
    modalityProductiveStage : number;
}


export interface AssignTableRow {
  nombre: string;
  tipo_identificacion: number; // id del tipo de documento
  numero_identificacion: string;
  fecha_solicitud: string;
  id?: number;
}

export interface DetailData {
  aprendiz_id?: number;
  nombre_aprendiz?: string;
  tipo_identificacion?: number; // id del tipo de documento
  numero_identificacion?: string | number | null;
  telefono_aprendiz?: string | number;
  correo_aprendiz?: string;
  ficha_id?: number;
  numero_ficha?: number;
  programa?: string;
  empresa_nombre?: string;
  empresa_nit?: string | number;
  empresa_ubicacion?: string;
  empresa_correo?: string;
  jefe_nombre?: string;
  jefe_telefono?: string | number;
  jefe_correo?: string;
  jefe_cargo?: string;
  regional?: string;
  center?: string;
  sede?: string;
  fecha_solicitud?: string;
  fecha_inicio_etapa_practica?: string;
  fecha_fin_etapa_practica?: string;
  modality_productive_stage?: string;
  request_state?: string;
  pdf_url?: string;
  talento_humano?: {
    nombre?: string;
    correo?: string;
    telefono?: string | number;
  };
}
