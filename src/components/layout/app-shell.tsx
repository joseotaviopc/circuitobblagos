"use client";
import { SignInButton, UserButton, useAuth, useUser } from "@clerk/nextjs";
import {
	BarChart,
	BookOpen,
	Calendar,
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
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useData } from "@/context/data-context";
import { slugify } from "@/lib/utils";
import { Logo } from "../icons/logo";
import { DropdownMenu } from "../ui/dropdown-menu";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useSidebar } from "../ui/sidebar";

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
	const { setOpenMobile, state, isMobile } = useSidebar();
	const { loadingData, atletas } = useData();

	const menuItems = [
		{ href: "/eventos", label: "Calendário", icon: Calendar },
		{ href: "/rankings", label: "Rankings", icon: BarChart },
		{ href: "/atletas", label: "Atletas", icon: Users },
		{ href: "/fotos", label: "Fotos", icon: ImageIcon },
		{ href: "/videos", label: "Vídeos", icon: Video },
		{ href: "/historia", label: "História", icon: BookOpen },
		{ href: "/contato", label: "Contato", icon: Mail },
		{ href: "/bodyboard", label: "Sobre o Bodyboard", icon: Waves },
		{ href: "/patrocinio", label: "Patrocínios", icon: Megaphone },
	];

	if (!isLoaded || loadingData) {
		return <LoadingSpinner />;
	}

	const userEmail = user?.primaryEmailAddress?.emailAddress;
	const atleta = atletas.find((atleta) => atleta.email === userEmail);

	const canEdit = isSignedIn && userEmail && atleta?.email === userEmail;

	return (
		<>
			<Sidebar>
				<SidebarHeader>
					<Link
						href="/"
						className="flex items-center gap-2"
						onClick={() => setOpenMobile(false)}
					>
						<Logo />
					</Link>
				</SidebarHeader>
				<SidebarContent>
					<SidebarMenu>
						{menuItems.map((item) => (
							<SidebarMenuItem key={item.label}>
								<SidebarMenuButton
									asChild
									isActive={pathname === item.href}
									tooltip={item.label}
									onClick={() => setOpenMobile(false)}
								>
									<Link href={item.href}>
										<item.icon />
										<span>{item.label}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarContent>
				<SidebarFooter>
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
				</SidebarFooter>
			</Sidebar>
			<SidebarInset
				className={`${isMobile ? "w-full" : state === "expanded" ? "w-[min(calc(100%-14.5rem),72rem)] max-w-[calc(100%-16rem)]" : "w-full"}`}
			>
				<header className="sticky top-0 z-10 backdrop-blur w-full flex items-center justify-between p-4 border-b">
					<div className="flex items-center gap-2">
						<SidebarTrigger />
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
				<main className="p-4 md:p-6 lg:p-8 pt-20">{children}</main>
			</SidebarInset>
		</>
	);
}
