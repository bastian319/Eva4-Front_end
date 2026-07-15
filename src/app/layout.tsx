import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestión de Recursos Tecnológicos",
  description:
    "SPA con React y Next.js para administrar recursos tecnológicos de un laboratorio, usando Local Storage, Session Storage y Cookies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
