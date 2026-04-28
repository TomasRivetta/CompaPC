import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | CompaPC",
  description: "Términos y condiciones de uso de CompaPC.",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 py-12">
      <div className="space-y-3">
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
          Legal
        </span>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-slate-900">
          Términos y Condiciones
        </h1>
        <p className="text-sm text-slate-500">
          Última actualización: 27 de abril de 2026.
        </p>
      </div>

      <div className="space-y-8 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-bold text-slate-900">1. Objeto del sitio</h2>
          <p className="text-sm leading-7 text-slate-600">
            CompaPC es un comparador informativo de precios y disponibilidad de productos de
            hardware y tecnología publicados por tiendas de terceros en Argentina.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-bold text-slate-900">2. Uso de la plataforma</h2>
          <p className="text-sm leading-7 text-slate-600">
            El usuario se compromete a utilizar la plataforma de forma lícita, sin interferir con
            su funcionamiento ni usarla para actividades fraudulentas, abusivas o contrarias a la
            normativa aplicable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-bold text-slate-900">3. Información publicada</h2>
          <p className="text-sm leading-7 text-slate-600">
            Los precios, imágenes, títulos, categorías, descripciones, stock y enlaces publicados
            en CompaPC provienen de fuentes externas y pueden cambiar sin previo aviso. CompaPC no
            garantiza exactitud, integridad, vigencia ni disponibilidad permanente de esa
            información.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-bold text-slate-900">4. Compras en terceros</h2>
          <p className="text-sm leading-7 text-slate-600">
            CompaPC no vende productos, no procesa pagos y no participa en la operación comercial
            entre el usuario y la tienda enlazada. Cualquier compra, devolución, garantía o reclamo
            debe resolverse exclusivamente con el comercio correspondiente.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-bold text-slate-900">5. Limitación de responsabilidad</h2>
          <p className="text-sm leading-7 text-slate-600">
            CompaPC no será responsable por errores de publicación, falta de stock, diferencias de
            precio, demoras, cancelaciones, daños indirectos o cualquier perjuicio derivado del uso
            de la información mostrada en el sitio o de transacciones realizadas con terceros.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-bold text-slate-900">6. Propiedad intelectual</h2>
          <p className="text-sm leading-7 text-slate-600">
            El diseño, marca, estructura y contenidos propios de CompaPC están protegidos por la
            normativa aplicable. Las marcas, nombres comerciales e imágenes de terceros pertenecen a
            sus respectivos titulares.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-bold text-slate-900">7. Modificaciones</h2>
          <p className="text-sm leading-7 text-slate-600">
            CompaPC puede modificar estos términos en cualquier momento. La versión vigente será la
            publicada en esta página.
          </p>
        </section>
      </div>
    </section>
  );
}
