import type { Metadata } from "next";
import { Footer } from "@/components/store/footer";
import { Navbar } from "@/components/store/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "CompaPC",
  description: "Catalogo de hardware con busqueda, categorias y filtros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <div className="site-shell">
          <Navbar />
          <main className="page-wrap">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
