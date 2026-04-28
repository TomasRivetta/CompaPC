import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | CompaPC",
  description: "Política de privacidad de CompaPC.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 py-12">
      <div className="space-y-3">
        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
          Privacidad
        </span>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-slate-900">
          Política de Privacidad
        </h1>
        <p className="text-sm text-slate-500">
          Última actualización: 27 de abril de 2026.
        </p>
      </div>

      <div className="space-y-8 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-bold text-slate-900">1. Alcance de esta política</h2>
          <p className="text-sm leading-7 text-slate-600">
            CompaPC funciona como un sitio informativo y comparador de precios. En su estado actual,
            no solicita formularios de registro, no crea cuentas de usuario y no requiere que el
            visitante entregue datos personales para navegar el contenido público del sitio.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-bold text-slate-900">2. Enlaces a terceros</h2>
          <p className="text-sm leading-7 text-slate-600">
            CompaPC contiene enlaces a tiendas externas. Una vez que el usuario abandona el sitio,
            cualquier tratamiento de datos, compra, registro o interacción queda sujeto a las
            políticas y condiciones del tercero correspondiente.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-bold text-slate-900">3. Contenido de terceros</h2>
          <p className="text-sm leading-7 text-slate-600">
            Los precios, imágenes, nombres de productos, marcas, categorías y disponibilidad pueden
            provenir de fuentes externas. CompaPC no controla las políticas de privacidad ni el
            tratamiento de datos realizado por esos terceros.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-bold text-slate-900">4. Conservación y seguridad</h2>
          <p className="text-sm leading-7 text-slate-600">
            Si en el futuro CompaPC incorporara formularios, cuentas, analítica, cookies u otras
            funciones que impliquen tratamiento de datos personales, esta política será actualizada
            para reflejarlo de forma clara.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl font-bold text-slate-900">5. Cambios en esta política</h2>
          <p className="text-sm leading-7 text-slate-600">
            Esta política puede actualizarse cuando cambie el funcionamiento del sitio o el marco
            legal aplicable. La versión vigente será siempre la publicada en esta página.
          </p>
        </section>
      </div>
    </section>
  );
}
