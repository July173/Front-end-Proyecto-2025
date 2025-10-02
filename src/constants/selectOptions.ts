// Los tipos de documento deben obtenerse dinámicamente desde el backend usando el servicio getDocumentTypesWithEmpty.
// Ejemplo de uso en un select:
// import { getDocumentTypesWithEmpty } from '../Api/Services/TypeDocument';
// const [documentTypes, setDocumentTypes] = useState([]);
// useEffect(() => { getDocumentTypesWithEmpty().then(setDocumentTypes); }, []);
//
// <select value={selectedId} onChange={e => setSelectedId(Number(e.target.value))}>
//   {documentTypes.map(dt => (
//     <option key={dt.id} value={dt.id}>{dt.name}</option>
//   ))}
// </select>

// Tipos de contrato sincronizados con el enum ContractType del backend
// Los valores deben coincidir exactamente con: apps/security/entity/enums/contract_type_enum.py
export const typesContract = [
  { value: "", label: "Seleccione tipo de contrato" },
  { value: "PLANTA", label: "Planta" },
  { value: "CONTRATO", label: "Contrato" },
  { value: "OPS", label: "OPS" },
  { value: "PROVISIONAL", label: "Provisional" },
  { value: "TEMPORAL", label: "Temporal" },
  { value: "PRESTACION_SERVICIOS", label: "Prestación de Servicios" },
];
