import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Space_Grotesk } from "next/font/google";
import { AppLayoutWithSidebarProvider } from "@/components/layout/app-shell";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth-context";
import { DataProvider } from "@/context/data-context";
import { Analytics } from "@vercel/analytics/next"

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
	description:
		"Site oficial do Circuito BB Lagos - Competições, resultados, rankings e notícias.",
	metadataBase: new URL("https://www.circuitobblagos.com.br"),
	openGraph: {
		title: "Circuito BB Lagos",
		description:
			"O Circuito BB Lagos é o maior e mais tradicional campeonato de bodyboard da Região dos Lagos, no estado do Rio de Janeiro.",
		url: "https://www.circuitobblagos.com.br",
		siteName: "Circuito BB Lagos",
		locale: "pt_BR",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			localization={{
				locale: "pt-BR",
				signIn: {
					start: {
						title: "Bemvindo de novo!",
						subtitle: "Iniciar para continuar",
						titleCombined: "Continue no Circuito BB Lagos",
					},
				},
				userButton: {
					action__signOut: "Sair",
					action__manageAccount: "Gerenciar conta",
				},
				socialButtonsBlockButton: "Entrar com Google",
				formFieldLabel__emailAddress: "Email",
				formButtonPrimary: "Continuar",
			}}
		>
			<html lang="pt-BR" className="dark">
				<head>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
				</head>
				<body
					className={`antialiased ${inter.className} ${spaceGrotesk.className}`}
				>
					<DataProvider>
						<AuthProvider>
							<AppLayoutWithSidebarProvider>
								{children}
							</AppLayoutWithSidebarProvider>
						</AuthProvider>
					</DataProvider>
					<Toaster />
					<Analytics />
				</body>
			</html>
		</ClerkProvider>
	);
}
