'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="mt-16 flex justify-center items-center gap-4">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      
      <div className="flex gap-2">
        {[1, 2, 3].map((page) => (
          <button 
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded font-bold text-xs transition-all ${
              page === currentPage 
                ? 'bg-primary text-on-primary' 
                : 'border border-white/10 text-white/40 hover:border-primary/40 hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}
        <span className="w-10 h-10 flex items-center justify-center text-white/20">...</span>
        <button 
          onClick={() => onPageChange(totalPages)}
          className={`w-10 h-10 rounded border border-white/10 text-white/40 font-bold text-xs hover:border-primary/40 hover:text-white transition-all ${
            currentPage === totalPages ? 'bg-primary text-on-primary' : ''
          }`}
        >
          {totalPages}
        </button>
      </div>
      
      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}

