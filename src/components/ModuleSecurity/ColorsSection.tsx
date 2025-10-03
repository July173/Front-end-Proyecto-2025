import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import Paginator from "../Paginator";
import ModalFormGeneric from "./ModalFormGeneric";
import ConfirmModal from "../ConfirmModal";
import { getColors, createColor, updateColor, softDeleteColor } from "../../Api/Services/Colors";

const cardsPerPage = 9;

const ColorsSection = () => {
	const [colors, setColors] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [colorsPage, setColorsPage] = useState(1);
	const [showModal, setShowModal] = useState(false);
	const [pendingData, setPendingData] = useState<any>(null);
	const [showConfirm, setShowConfirm] = useState(false);
	const [editData, setEditData] = useState<any>(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [pendingEditData, setPendingEditData] = useState<any>(null);
	const [showEditConfirm, setShowEditConfirm] = useState(false);
	const [showDisableConfirm, setShowDisableConfirm] = useState(false);
	const [pendingDisable, setPendingDisable] = useState<any>(null);
	const [open, setOpen] = useState(true);

	// Fetch colors
	const refreshColors = async () => {
		setLoading(true);
		try {
			const data = await getColors();
			setColors(data);
			setError(null);
		} catch (e: any) {
			setError(e.message || "Error al cargar colores");
		}
		setLoading(false);
	};

	React.useEffect(() => {
		refreshColors();
	}, []);

	// Card
	const InfoCard = ({ name, hexagonal_value, isActive, onEdit, onToggle }: any) => (
		<div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
			<div className="flex justify-between items-start mb-3">
				<div className="flex-1">
					<h3 className="font-semibold text-gray-900">{name}</h3>
					{hexagonal_value && (
						<p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
							Hex: {hexagonal_value}
							<span style={{ background: hexagonal_value, width: 24, height: 24, borderRadius: 6, border: '1px solid #ccc', display: 'inline-block' }} />
						</p>
					)}
				</div>
				<div className={`px-2 py-1 rounded-full text-xs font-medium ${isActive ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"}`}>{isActive ? "Activo" : "Inactivo"}</div>
			</div>
			<div className="flex gap-2">
				<button onClick={onEdit} className="px-5 py-1 text-base rounded-3xl border border-gray-400 bg-gray-100 text-gray-800 font-semibold transition-colors hover:bg-gray-200">Editar</button>
				<button onClick={onToggle} className={`px-5 py-1 text-base rounded-3xl border font-semibold transition-colors ${isActive ? "bg-red-100 text-red-900 border-red-700 hover:bg-red-200" : "bg-green-100 text-green-900 border-green-700 hover:bg-green-200"}`}>{isActive ? "Deshabilitar" : "Habilitar"}</button>
			</div>
		</div>
	);

	// Modal handlers
	const handleAdd = () => setShowModal(true);
	const handleSubmit = (values: any) => {
		setPendingData(values);
		setShowConfirm(true);
	};
	const handleConfirm = async () => {
		try {
			await createColor(pendingData);
			setShowModal(false);
			setShowConfirm(false);
			setPendingData(null);
			await refreshColors();
		} catch (e: any) {
			alert(e.message || "Error al crear color");
		}
	};

	// Edit handlers
	const handleEdit = (color: any) => {
		setEditData(color);
		setShowEditModal(true);
	};
	const handleSubmitEdit = (values: any) => {
		setPendingEditData(values);
		setShowEditConfirm(true);
	};
	const handleConfirmEdit = async () => {
		try {
			await updateColor(editData.id, pendingEditData);
			setShowEditModal(false);
			setShowEditConfirm(false);
			setPendingEditData(null);
			setEditData(null);
			await refreshColors();
		} catch (e: any) {
			alert(e.message || "Error al actualizar color");
		}
	};

	// Toggle handlers
	const handleToggle = (color: any) => {
		setPendingDisable(color);
		setShowDisableConfirm(true);
	};
	const handleConfirmDisable = async () => {
		try {
			await softDeleteColor(pendingDisable.id);
			setShowDisableConfirm(false);
			setPendingDisable(null);
			await refreshColors();
		} catch (e: any) {
			alert(e.message || "Error al deshabilitar color");
		}
	};

	if (loading) return <div className="p-8">Cargando...</div>;
	if (error) return <div className="p-8 text-red-500">{error}</div>;

	return (
		<div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
			<button
				onClick={() => setOpen((prev) => !prev)}
				className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
			>
				<div className="flex items-center gap-3">
					<h3 className="text-lg font-semibold text-gray-900">Colores</h3>
					<span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
						{colors.length} registros
					</span>
				</div>
				{open ? (
					<ChevronUp className="w-5 h-5 text-gray-500" />
				) : (
					<ChevronDown className="w-5 h-5 text-gray-500" />
				)}
			</button>
			{open && (
				<>
					<div className="flex items-center gap-4 mb-6 justify-between px-6 pt-6">
						<button onClick={handleAdd} className="flex items-center gap-2 text-white px-4 py-2 rounded font-semibold shadow transition-all duration-300 bg-[linear-gradient(to_bottom_right,_#43A047,_#2E7D32)] hover:bg-green-700 hover:shadow-lg">
							<Plus className="w-4 h-4" /> Agregar Color
						</button>
					</div>
					<div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{colors.slice((colorsPage - 1) * cardsPerPage, colorsPage * cardsPerPage).map((color) => (
							<InfoCard
								key={color.id}
								name={color.name}
								hexagonal_value={color.hexagonal_value}
								isActive={color.active}
								onEdit={() => handleEdit(color)}
								onToggle={() => handleToggle(color)}
							/>
						))}
						<ModalFormGeneric
							isOpen={showEditModal}
							title="Editar Color"
							fields={[
								{ label: "Nombre", name: "name", type: "text", placeholder: "Ingrese el nombre", required: true },
								{ label: "Hexadecimal", name: "hexagonal_value", type: "text", placeholder: "#43A047", required: true },
							]}
							onClose={() => { setShowEditModal(false); setEditData(null); setPendingEditData(null); }}
							onSubmit={handleSubmitEdit}
							submitText="Actualizar"
							cancelText="Cancelar"
							initialValues={editData || {}}
							customRender={undefined}
							onProgramChange={undefined}
						/>
						<ConfirmModal
							isOpen={showEditConfirm}
							title="¿Confirmar actualización?"
							message="¿Estás seguro de que deseas actualizar este color?"
							confirmText="Sí, actualizar"
							cancelText="Cancelar"
							onConfirm={handleConfirmEdit}
							onCancel={() => { setShowEditConfirm(false); setPendingEditData(null); }}
						/>
						<ConfirmModal
							isOpen={showDisableConfirm}
							title="¿Confirmar acción?"
							message="¿Estás seguro de que deseas deshabilitar este color?"
							confirmText="Sí, continuar"
							cancelText="Cancelar"
							onConfirm={handleConfirmDisable}
							onCancel={() => { setShowDisableConfirm(false); setPendingDisable(null); }}
						/>
					</div>
					{Math.ceil(colors.length / cardsPerPage) > 1 && (
						<Paginator
							page={colorsPage}
							totalPages={Math.ceil(colors.length / cardsPerPage)}
							onPageChange={setColorsPage}
							className="mt-4 px-6"
						/>
					)}

					<ModalFormGeneric
						isOpen={showModal}
						title="Agregar Color"
						fields={[
							{ label: "Nombre", name: "name", type: "text", placeholder: "Ingrese el nombre", required: true },
							{ label: "Hexadecimal", name: "hexagonal_value", type: "text", placeholder: "#43A047", required: true },
						]}
						onClose={() => setShowModal(false)}
						onSubmit={handleSubmit}
						submitText="Registrar"
						cancelText="Cancelar"
						customRender={undefined}
						onProgramChange={undefined}
					/>
					<ConfirmModal
						isOpen={showConfirm}
						title="¿Confirmar registro?"
						message="¿Estás seguro de que deseas crear este color?"
						confirmText="Sí, crear"
						cancelText="Cancelar"
						onConfirm={handleConfirm}
						onCancel={() => {
							setShowConfirm(false);
							setPendingData(null);
						}}
					/>
				</>
			)}
		</div>
	);
};

export default ColorsSection;
