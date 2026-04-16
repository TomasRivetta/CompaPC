'use client';

export function Footer() {
  return (
    <footer className="mt-20 bg-[#0e0e0e] pt-20 pb-10 border-t border-white/5">
      <div className="px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          {/* About */}
          <div className="space-y-6">
            <span className="text-xl sm:text-2xl font-black text-[#00d4ff] tracking-tighter italic font-headline whitespace-nowrap">
              NEON MONOLITH
            </span>
            <p className="text-xs text-white/40 leading-relaxed tracking-wide font-body uppercase">
              Ingeniería de vanguardia para setups de alto rendimiento. Forjando el futuro del hardware.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#00d4ff] mb-8">
              PRODUCTOS
            </h4>
            <ul className="space-y-4 text-[10px] font-medium uppercase tracking-widest text-white/40 font-body">
              <li><a href="#" className="hover:text-[#00d4ff] transition-all hover:translate-x-1 inline-block">Placas de Video</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-all hover:translate-x-1 inline-block">Procesadores</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-all hover:translate-x-1 inline-block">Memorias RAM</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-all hover:translate-x-1 inline-block">Almacenamiento</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#00d4ff] mb-8">
              SOPORTE
            </h4>
            <ul className="space-y-4 text-[10px] font-medium uppercase tracking-widest text-white/40 font-body">
              <li><a href="#" className="hover:text-[#00d4ff] transition-all hover:translate-x-1 inline-block">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-all hover:translate-x-1 inline-block">Garantía</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-all hover:translate-x-1 inline-block">Envíos</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-all hover:translate-x-1 inline-block">Contacto</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#00d4ff] mb-8">
              CONECTAR
            </h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface-container rounded-md text-white/40 hover:text-[#00d4ff] transition-all hover:border hover:border-[#00d4ff]/20">
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface-container rounded-md text-white/40 hover:text-[#00d4ff] transition-all hover:border hover:border-[#00d4ff]/20">
                <span className="material-symbols-outlined text-lg">terminal</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/[0.03] flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-medium uppercase tracking-widest text-white/20 font-body">
            © 2026 NEON MONOLITH. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex items-center gap-8 font-body">
            <a href="#" className="text-[9px] font-medium uppercase tracking-widest text-white/20 hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="text-[9px] font-medium uppercase tracking-widest text-white/20 hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

