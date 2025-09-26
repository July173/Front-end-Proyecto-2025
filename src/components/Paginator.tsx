import React from 'react';

interface PaginatorProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  className?: string;
  prevLabel?: string;
  nextLabel?: string;
}

const Paginator: React.FC<PaginatorProps> = ({
  page,
  totalPages,
  onPageChange,
  className = '',
  prevLabel = '< Anterior',
  nextLabel = 'Siguiente >',
}) => {
  return (
    <div className={`flex justify-end gap-2 mt-4 ${className}`}>
      <button
        className={`px-4 py-2 border rounded bg-white text-gray-700 flex items-center gap-1 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        {prevLabel}
      </button>
      <button
        className={`px-4 py-2 border rounded bg-white text-gray-700 flex items-center gap-1 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default Paginator;
