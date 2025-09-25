import React from "react";

const imgImage20 = "https://s3-alpha-sig.figma.com/img/2712/cdb5/93cbedadaf4e066ac94723684d3273d2?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XI9qzOVUoW9bGbGpNsIbrP3y0F9EUFsXg35692raAHHqgCPkDhSX3nTLunekEirN0D9ezHvJ7C-BVVJod7nUdocs92q0RoZALnmJ3YhYdOKMdtEYNlrOIvkS5NLsIhuSMFoIN1aghU1H6~i6cjU7krdufeSIvziVybFpthxg6Lbdn06qlLQ60aSmcEDDa0eIg1XPq6dvEKIBzRE9q75FmHqueb006th1yuVEpcXG2b9UF3c43gtkdgrM7j0b8YtyR0VwHtSc9D2AA2hKJu~8JPjUM9Lsf5pQK-OrmT2fPtfz1xN8vuoC~SCzCrOet-6g1z~fF4ihDCbIqculQsfAiQ__";

interface BuscarInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const BuscarInput: React.FC<BuscarInputProps> = ({ value, onChange, placeholder = "Buscar..." }) => {
  return (
    <div className="bg-white relative rounded-[4px] w-[229px] h-[30px]">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="absolute left-0 top-0 w-full h-full px-10 py-1 rounded-[4px] border border-[#c5c5c5] text-base text-gray-800 focus:outline-none"
        placeholder={placeholder}
        style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
      />
      <img
        src={imgImage20}
        alt="Buscar"
        className="absolute left-[11px] top-[4px] w-5 h-5 pointer-events-none"
      />
    </div>
  );
};

export default BuscarInput;
