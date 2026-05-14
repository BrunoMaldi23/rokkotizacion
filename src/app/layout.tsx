import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({ 
  weight: '400', 
  subsets: ["latin"], 
  variable: '--font-bebas' 
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: '--font-dm' 
});

export const metadata: Metadata = {
  title: "ROKKO-Tización",
  description: "Sistema de Cotización - Group Bird SA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${bebas.variable} ${dmSans.variable}`}>
      <body className="bg-bg text-white antialiased font-dm">
        {children}
      </body>
    </html>
  );
}