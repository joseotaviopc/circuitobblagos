import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppLayoutWithSidebarProvider } from '@/components/layout/app-shell';
import { AuthProvider } from '@/context/auth-context';
import { DataProvider } from '@/context/data-context';
import {
  ClerkProvider,
} from '@clerk/nextjs'

import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Circuito BB Lagos - Feito de bodyboard para bodyboard",
  description: "Site oficial do Circuito BB Lagos - Competições, resultados, rankings e notícias.",
  metadataBase: new URL("https://www.circuitobblagos.com.br"),
  openGraph: {
    title: "Circuito BB Lagos",
    description: "O Circuito BB Lagos é o maior e mais tradicional campeonato de bodyboard da Região dos Lagos, no estado do Rio de Janeiro.",
    url: "https://www.circuitobblagos.com.br",
    siteName: "Circuito BB Lagos",
    locale: "pt_BR",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" /> */}
        </head>
        <body className={`font-body antialiased ${inter.className} ${spaceGrotesk.className}`}>
          <DataProvider>
            <AuthProvider>
              <AppLayoutWithSidebarProvider>
                {children}
              </AppLayoutWithSidebarProvider>
            </AuthProvider>
          </DataProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
