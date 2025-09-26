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
      <div className="bg-white rounded-[10px] px-8 md:px-52 py-8 flex flex-col items-center mb-7 w-full max-w-5xl">
        <h1 className="text-green-700/80 text-4xl font-bold font-roboto leading-relaxed text-center">BIENVENIDO A AUTOGESTIÓN SENA</h1>
      </div>
      <div className="w-full flex flex-wrap gap-7 justify-center items-start mb-7 max-w-5xl">
        {cards.map((card, idx) => (
          <InstructorDashboardCard key={idx} {...card} />
        ))}
      </div>
      <div className="w-full flex flex-wrap gap-12 justify-center items-start max-w-5xl">
        {[1,2].map((_, idx) => (
          <div key={idx} className="w-full max-w-md p-2.5 bg-white rounded-[10px] flex flex-col justify-start items-start gap-5 shadow outline outline-1 outline-neutral-200 overflow-hidden">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-300">
                <span className="w-5 h-5 flex items-center justify-center">
                  <span className="w-5 h-5 bg-blue-800 rounded-full block" />
                </span>
              </div>
              <div className="text-black text-2xl font-semibold font-roboto leading-none">Visita programada</div>
            </div>
            <div className="text-black text-2xl font-normal font-roboto leading-none">Tienes una visita programada</div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 flex items-center justify-center">
                <span className="w-5 h-3.5 bg-black block" />
              </span>
              <div className="text-black text-2xl font-light font-roboto leading-none">Carlos ruiz : 11292221893</div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-72 text-black text-2xl font-light font-roboto leading-none">Programa de formación :</div>
            </div>
            <div className="text-black text-2xl font-light font-roboto leading-none">desarrollo de videojuegos</div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 flex items-center justify-center">
                <span className="w-5 h-5 bg-black block" />
              </span>
              <div className="text-black text-2xl font-extralight font-roboto leading-none">Mañana</div>
            </div>
            <div className="w-full h-14 px-10 py-1.5 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-400/50 flex flex-col justify-center items-center gap-2.5 overflow-hidden">
              <div className="text-black text-xl font-normal font-roboto leading-none">Ver detalles</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorDashboard;
