import React from "react";
import { BsCalendar2Week, BsClockHistory, BsMortarboardFill, BsPersonCheck, BsPersonLinesFill } from "react-icons/bs";

interface InstructorDashboardCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: React.ReactNode;
  bgIcon: string;
}

const InstructorDashboardCard: React.FC<InstructorDashboardCardProps> = ({ title, value, subtitle, icon, bgIcon }) => (
  <div className="bg-white rounded-[10px] outline outline-1 outline-neutral-400 p-5 w-52 flex flex-col gap-5">
    <div className="flex justify-between items-center">
      <div className="text-black text-sm font-normal font-roboto leading-none w-32">{title}</div>
      <div className={`w-10 h-10 ${bgIcon} rounded-full flex items-center justify-center`}>
        {icon}
      </div>
    </div>
    <div className="text-black text-2xl font-bold font-roboto leading-none">{value}</div>
    <div className="text-black text-sm font-normal font-roboto leading-none w-44">{subtitle}</div>
  </div>
);

export const InstructorDashboard: React.FC = () => {
  // Aquí se deben consumir los datos reales del backend
  // Ejemplo de datos estáticos:
  const cards = [
    {
      title: "Visitas programadas",
      value: 2,
      subtitle: "Para esta semana",
      icon: <BsCalendar2Week className="text-blue-800" size={24} />,
      bgIcon: "bg-blue-300",
    },
    {
      title: "Recordatorios pendientes",
      value: 2,
      subtitle: "Requieren seguimiento",
      icon: <BsClockHistory className="text-orange-600" size={24} />,
      bgIcon: "bg-yellow-200",
    },
    {
      title: "Aprendices Asignados",
      value: 2,
      subtitle: "Aprendices tienes asignados para ser evaluados",
      icon: <BsMortarboardFill className="text-fuchsia-500" size={24} />,
      bgIcon: "bg-fuchsia-200",
    },
    {
      title: "Aprendices Evaluados",
      value: 2,
      subtitle: "Aprendices evaluados",
      icon: <BsPersonCheck className="text-green-600" size={24} />,
      bgIcon: "bg-green-300",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-white rounded-[10px] px-52 py-8 flex flex-col items-center mb-7">
        <h1 className="text-green-700/80 text-4xl font-bold font-roboto leading-relaxed">BIENVENIDO A AUTOGESTIÓN SENA</h1>
      </div>
      <div className="w-full flex gap-7 justify-start items-start mb-7">
        {cards.map((card, idx) => (
          <InstructorDashboardCard key={idx} {...card} />
        ))}
      </div>
      {/* Aquí irían las tarjetas de visitas programadas, detalles, etc. */}
      {/* Puedes seguir la estructura de TajetasInstructor y VerDetalles del código Figma */}
    </div>
  );
};

export default InstructorDashboard;
