'use client';

interface HeaderNavProps {
  onMenuClick?: () => void;
}

export function HeaderNav({ onMenuClick }: HeaderNavProps) {
  return (
    <nav className="fixed top-0 w-full z-[100] bg-[#0e0e0e]/60 backdrop-blur-xl shadow-[0_4px_40px_rgba(0,212,255,0.04)]">
      <div className="flex justify-between items-center px-4 sm:px-8 h-20 w-full max-w-full lg:max-w-[2000px] mx-auto">
        <div className="flex items-center gap-4 sm:gap-12">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 text-white/40 hover:text-primary transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <span className="text-xl sm:text-2xl font-black text-[#00d4ff] tracking-tighter italic font-headline whitespace-nowrap">
            NEON MONOLITH
          </span>
          
          <div className="hidden md:flex items-center bg-surface-container-highest rounded-lg px-4 py-2 w-72 lg:w-96 group border border-white/5 focus-within:border-primary/30 transition-all">
            <span className="material-symbols-outlined text-white/40 mr-2 text-sm group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm text-white/80 placeholder:text-white/20 w-full outline-none" 
              placeholder="Buscar productos..." 
              type="text"
            />
          </div>
        </div>

        {/* TopNavBar Actions: Icons removed as per design snippet */}
        <div className="flex items-center gap-2">
          {/* We keep space here for future actions or mobile search icons if needed */}
        </div>
      </div>
    </nav>
  );
}

