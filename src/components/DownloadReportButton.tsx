import React from "react";
import { BsSave } from "react-icons/bs";

interface DownloadReportButtonProps {
  text?: string;
  onClick?: () => void;
}

const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({
  text = "Descargar informe",
  onClick,
}) => (
  <button
    className="w-[240px] h-[38px] bg-green-800 opacity-80 rounded-[7px] flex items-center relative px-4"
    onClick={onClick}
    type="button"
  >
    <span className="absolute left-[10px] top-[8px] w-[28px] h-[22px] flex items-center justify-center ">
      <BsSave className="text-white" size={18} />
    </span>
    <span className="ml-[48px] text-white text-[18px] font-medium font-['Roboto'] leading-[32px]">
      {text}
    </span>
  </button>
);

export default DownloadReportButton;
