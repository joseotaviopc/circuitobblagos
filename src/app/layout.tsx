import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppLayoutWithSidebarProvider } from '@/components/layout/app-shell';
import { AuthProvider } from '@/context/auth-context';
import { DataProvider } from '@/context/data-context';
import { SidebarProvider } from '@/components/ui/sidebar';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'BBLagos',
  description: 'The Heartbeat of Modern Bodyboarding in Lagos',
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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased">
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
