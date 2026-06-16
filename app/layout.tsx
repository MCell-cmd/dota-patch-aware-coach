import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dota Patch-Aware Coach",
  description: "Asistente de draft, parches y análisis post-partida para Dota 2.",
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
