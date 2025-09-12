"use client";
import { SignInButton, UserButton, useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
	BarChart,
	BookOpen,
	Calendar,
	ChevronUp,
	Image as ImageIcon,
	Mail,
	Megaphone,
	UserCircle,
	Users,
	Video,
	Waves,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Sidebar,
	SidebarBody,
	SidebarLink,
	SidebarProvider,
} from "@/components/ui/sidebar";
import { useData } from "@/context/data-context";
import { cn, slugify } from "@/lib/utils";
import { Logo } from "../icons/logo";
import { Button } from "../ui/button";
import { DropdownMenu } from "../ui/dropdown-menu";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useSidebar } from "../ui/sidebar";
import { LogoMobile } from "../icons/logo-mobile";
import { FloatingFeedbackButton } from "../ui/floating-feedback-button";

export function AppLayoutWithSidebarProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen w-full bg-[#fff9f5] relative">
			<div
				className="absolute inset-0 -z-10"
				style={{
					backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(255, 220, 190, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 245, 238, 0.35) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 210, 180, 0.15) 0%, transparent 50%)
        `,
				}}
			/>
			<SidebarProvider>
				<AppLayout>{children}</AppLayout>
			</SidebarProvider>
		</div>
	);
}

function AppLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const { isSignedIn, isLoaded, has } = useAuth();
	const { user } = useUser();
	const { setOpen, open } = useSidebar();
	const { loadingData, atletas } = useData();
	const [showScrollToTop, setShowScrollToTop] = useState(false);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			const threshold = documentHeight - windowHeight - 100;
			setShowScrollToTop(scrollTop > threshold);
		};

		window.addEventListener('scroll', handleScroll);

		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const menuItems = [
		{ href: "/eventos", label: "Calendário", icon: <Calendar /> },
		{ href: "/rankings", label: "Rankings", icon: <BarChart /> },
		{ href: "/atletas", label: "Atletas", icon: <Users /> },
		{ href: "/fotos", label: "Fotos", icon: <ImageIcon /> },
		{ href: "/videos", label: "Vídeos", icon: <Video /> },
		{ href: "/historia", label: "História", icon: <BookOpen /> },
		{ href: "/contato", label: "Contato", icon: <Mail /> },
		{ href: "/bodyboard", label: "Sobre o Bodyboard", icon: <Waves /> },
		{ href: "/patrocinio", label: "Patrocínios", icon: <Megaphone /> },
	];

	if (!isLoaded || loadingData) {
		return <LoadingSpinner />;
	}

	const userEmail = user?.primaryEmailAddress?.emailAddress;
	const atleta = atletas.find((atleta) => atleta.email === userEmail);

	const canEdit = isSignedIn && userEmail && atleta?.email === userEmail;

	return (
		<div
			className={cn(
				"mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row ",
				"", // for your use case, use `h-screen` instead of `h-[60vh]` dark:border-neutral-700 dark:bg-neutral-800
			)}
		>
			<Sidebar open={open} setOpen={setOpen} animate>
				<SidebarBody className="justify-between gap-10 fixed top-0 left-0 h-screen overflow-x-hidden overflow-y-auto z-30">
					<div>
						{open ? <SidebarLink link={{ href: "/", label: "", icon: <Logo /> }} /> : <SidebarLink link={{ href: "/", label: "", icon: <LogoMobile /> }} />}
						{menuItems.map((item, idx) => (
							<SidebarLink key={idx} link={item} />
						))}
					</div>
					<DropdownMenu>
						<UserButton>
							<UserButton.MenuItems>
								{canEdit && (
									<UserButton.Link
										label="Minha página"
										labelIcon={<UserCircle className="w-4 h-4" />}
										href={`/atletas/${slugify(atleta.nome)}`}
									/>
								)}
							</UserButton.MenuItems>
						</UserButton>
					</DropdownMenu>
				</SidebarBody>
			</Sidebar>
			{/* "relative flex min-h-svh w-full flex-1 flex-col ",
			"peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow" */}
			<div
				className={`flex min-h-svh w-full flex-1 flex-col transition-all duration-300 ease-in-out ${open ? "w-full md:w-[calc(100%-300px)] md:ml-[300px]" : "w-full"}`}
			>
				<header className={`fixed top-10 md:top-0 z-20 backdrop-blur flex items-center justify-between p-4 border-b bg-white/80 transition-all duration-300 ${open ? 'left-0 md:left-[300px] w-full md:w-[calc(100%-300px)]' : 'left-0 md:left-[60px] w-full md:w-[calc(100%-60px)]'}`}>
					<div className="flex items-center gap-2">
						<h2 className="font-headline text-base md:text-lg font-semibold capitalize">
							{pathname.split("/").pop()?.replace(/-/g, " ") || "Home"}
						</h2>
					</div>
					{isSignedIn ? (
						<UserButton>
							<UserButton.MenuItems>
								{canEdit && (
									<UserButton.Link
										label="Minha página"
										labelIcon={<UserCircle className="w-4 h-4" />}
										href={`/atletas/${slugify(atleta.nome)}`}
									/>
								)}
							</UserButton.MenuItems>
						</UserButton>
					) : (
						<SignInButton>Entrar</SignInButton>
					)}
				</header>
				<main className={`p-4 md:p-6 lg:p-8 ${open ? 'ml-0' : 'ml-0 md:ml-[60px]'} pt-28 md:pt-24 pb-20 relative`}>
					{children}
					<Button
						onClick={scrollToTop}
						className={`fixed bottom-20 right-6 z-50 rounded-full w-10 h-10 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/80 text-white ${showScrollToTop
							? 'opacity-100 translate-y-0 pointer-events-auto'
							: 'opacity-0 translate-y-2 pointer-events-none'
							}`}
						size="icon"
						aria-label="Scroll to top"
					>
						<ChevronUp className="w-5 h-5" />
					</Button>
					<FloatingFeedbackButton />
				</main>
			</div>
		</div>
	);
}
