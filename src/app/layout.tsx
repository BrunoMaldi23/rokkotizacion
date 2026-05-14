// src/app/layout.tsx
import './globals.css';  // <-- Esto debe estar
import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={bebas.variable}>
      <body>{children}</body>
    </html>
  );
}