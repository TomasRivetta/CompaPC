'use client';

export function Footer() {
  return (
    <footer className="mt-20 bg-surface-container/50 pt-20 pb-10">
      <div className="px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          {/* About */}
          <div className="space-y-6">
            <div className="flex flex-col -gap-1">
              <span className="text-xl font-black text-primary tracking-tighter italic font-headline leading-tight">
                NEON
              </span>
              <span className="text-xl font-black text-white tracking-tighter italic font-headline leading-tight">
                MONOLITH
              </span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed tracking-wide font-medium uppercase">
              Ingeniería de vanguardia para setups de alto rendimiento. Forjando el futuro del hardware.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">
              Ecosistema
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Procesamiento</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Gráficos de Próxima Gen</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Arquitectura Core</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Almacenamiento Cuántico</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">
              Protocolo
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Centro de Comando</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Logística Global</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Garantía Monolito</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Documentación Técnica</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">
              Nexo
            </h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface-container-highest rounded-full text-white/40 hover:text-primary transition-all group">
                <span className="material-symbols-outlined text-lg">terminal</span>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface-container-highest rounded-full text-white/40 hover:text-primary transition-all">
                <span className="material-symbols-outlined text-lg">lan</span>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface-container-highest rounded-full text-white/40 hover:text-primary transition-all">
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with tonal shift */}
        <div className="pt-10 border-t border-white/[0.03] flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
            © 2026 NEON MONOLITH. PROTOCOLO DE SEGURIDAD ACTIVADO.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">Términos del Nexo</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
