import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISTP | OlaveEchenique",
  description:
    "Índice de Sostenibilidad Tributaria Pyme de OlaveEchenique Abogados y Consultores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}