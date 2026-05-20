import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Electree Mind – Inteligentní znalostní systém pro call centra",
  description: "Znalostní centrum, akademie, AI lektor a správa obsahu pro moderní call centra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="h-full">
      <body className="min-h-full bg-white text-[#0D3D34]">{children}</body>
    </html>
  );
}
