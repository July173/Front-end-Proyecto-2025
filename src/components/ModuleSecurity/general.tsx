
import React from "react";
import FichaSection from "./FichaSection";
import ProgramSection from "./ProgramSection";
import KnowledgeAreaSection from "./KnowledgeAreaSection";

const General = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Gestión General - Sena</h2>
      <FichaSection />
      <ProgramSection />
      <KnowledgeAreaSection />
    </div>
  );
};

export default General;
