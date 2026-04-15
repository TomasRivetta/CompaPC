'use client';

interface HeaderNavProps {
  onMenuClick?: () => void;
}

export function HeaderNav({ onMenuClick }: HeaderNavProps) {
  return (
    <nav className="fixed top-0 w-full z-[100] bg-surface-container/70 backdrop-blur-2xl border-b border-white/[0.02]">
      <div className="flex justify-between items-center px-4 sm:px-6 h-20 w-full max-w-[2000px] mx-auto">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white/50 hover:text-primary transition-all active:scale-95 bg-white/5 rounded-lg"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>

          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-black text-primary tracking-tighter italic font-headline">
              NEON
            </span>
            <span className="text-xl font-black text-white tracking-tighter italic font-headline">
              MONOLITH
            </span>
          </div>
          
          <div className="hidden xl:flex items-center bg-white/[0.03] hover:bg-white/[0.05] rounded-full px-5 py-2.5 w-96 group transition-all focus-within:ring-1 focus-within:ring-primary/30">
            <span className="material-symbols-outlined text-white/20 mr-3 text-[18px]">
              search
            </span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm text-white/60 placeholder:text-white/10 w-full outline-none"
              placeholder="Explorar tecnología premium..."
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button className="hidden sm:flex w-10 h-10 items-center justify-center text-white/40 hover:text-primary hover:bg-white/5 rounded-full transition-all">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          
          <button className="w-10 h-10 items-center justify-center text-white/40 hover:text-primary hover:bg-white/5 rounded-full transition-all">
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
          </button>

          <div className="relative group cursor-pointer active:scale-95 transition-transform flex items-center justify-center w-10 h-10 hover:bg-white/5 rounded-full">
            <span className="material-symbols-outlined text-white/40 group-hover:text-primary transition-colors text-[20px]">
              shopping_cart
            </span>
            <span className="absolute top-1.5 right-1.5 bg-primary text-on-primary text-[8px] font-black h-3.5 w-3.5 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
              2
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
