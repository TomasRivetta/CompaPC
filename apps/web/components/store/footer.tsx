export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container-standard mx-auto px-4 py-12">
        
        {/* Top Section */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          
          {/* Branding */}
          <div className="flex max-w-sm flex-col gap-5">
            <a href="/" className="group inline-flex w-fit items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20 transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined" aria-hidden="true">
                  devices
                </span>
              </div>
              <div>
                <p className="font-headline text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                  CompaPC
                </p>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Comparador de precios
                </p>
              </div>
            </a>
            <p className="text-sm leading-relaxed text-slate-600">
              Encontrá los mejores precios de componentes de PC en distintas tiendas de Argentina. Actualizamos diariamente para cuidar tu bolsillo.
            </p>
          </div>

          {/* Legal */}
          <div className="flex max-w-md flex-col gap-4 md:items-end">
            <p className="font-semibold text-slate-900">Aviso Legal</p>
            <div className="rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-500 ring-1 ring-slate-200/60 md:text-right">
              CompaPC actúa únicamente como comparador de precios. No comercializamos productos ni garantizamos la exactitud, stock o disponibilidad de los precios publicados, los cuales dependen exclusivamente de tiendas de terceros.
            </div>
          </div>
          
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-slate-200" />

        {/* Bottom Section */}
        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-slate-500">
            © {currentYear} CompaPC. Todos los derechos reservados.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <a href="#" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-4">
              Términos y Condiciones
            </a>
            <a href="#" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-4">
              Política de Privacidad
            </a>
            <a href="#" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-4">
              Contacto
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}