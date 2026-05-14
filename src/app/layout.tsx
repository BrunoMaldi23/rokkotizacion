import type { Metadata } from 'next';
import { Bebas_Neue } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

export const metadata: Metadata = {
  title: 'ROKKO Uniformes',
  description: 'Sistema de Cotización de Uniformes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={bebas.variable}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}