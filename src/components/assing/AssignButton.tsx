import React from "react";

interface AssignButtonProps {
  state?: "Asignar" | "Asignado" | "Rechazado";
  onClick?: () => void;
}

const AssignButton: React.FC<AssignButtonProps> = ({ state = "Asignar", onClick }) => {
  let style = "border-2 border-[#a39f9f] h-[26px] w-[90px] rounded-[10px] flex items-center justify-center relative cursor-pointer";
  let text = "text-black";
  const bg = "bg-transparent";
  let label = state;

  if (state === "Asignado") {
    style = "bg-[#7bcc7f] border border-[#c0fbcd] h-[26px] w-[90px] rounded-[10px] flex items-center justify-center relative cursor-default";
    text = "text-[#0c672d]";
    label = "Asignado";
  } else if (state === "Rechazado") {
    style = "bg-[#fb8383] border border-[#773939] h-[26px] w-[90px] rounded-[10px] flex items-center justify-center relative cursor-default";
    text = "text-[#5c1515]";
    label = "Rechazado";
  }

  return (
    <button
      className={style}
      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
      onClick={state === "Asignar" ? onClick : undefined}
      disabled={state !== "Asignar"}
      data-node-id={state === "Asignar" ? "823:13305" : state === "Asignado" ? "823:13205" : "823:13209"}
    >
      <span className={`text-[14px] leading-[32px] ${text}`}>{label}</span>
    </button>
  );
};

export default AssignButton;
