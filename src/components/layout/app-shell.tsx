'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Calendar,
  Image as ImageIcon,
  Video,
  BookOpen,
  Mail,
  Waves,
  Megaphone,
  BarChart,
  Users,
  User,
  LogOut,
  LogIn,
  Shield,
  Edit
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../icons/logo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';
import { LoadingSpinner } from '../ui/loading-spinner';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isAdmin, logout, loadingAuth } = useAuth();

  const menuItems = [
    { href: '/eventos', label: 'Calendário', icon: Calendar },
    { href: '/rankings', label: 'Classificação', icon: BarChart },
    { href: '/atletas', label: 'Atletas', icon: Users },
    { href: '/fotos', label: 'Fotos', icon: ImageIcon },
    { href: '/videos', label: 'Vídeos', icon: Video },
    { href: '/historia', label: 'História', icon: BookOpen },
    { href: '/contato', label: 'Contato', icon: Mail },
    { href: '/bodyboard', label: 'Sobre o Bodyboard', icon: Waves },
    { href: '/patrocinio', label: 'Patrocínios', icon: Megaphone },
    { href: '/perfil', label: 'Perfil', icon: User },
  ];

  if (loadingAuth) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen w-auto bg-[#fff9f5] relative">
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
        <Sidebar>
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2">
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
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/admin'}
                    tooltip="Admin"
                  >
                    <Link href="/admin">
                      <Shield />
                      <span>Admin</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="justify-start gap-2 w-full px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user ? 'https://placehold.co/100x100/png' : undefined} />
                    <AvatarFallback>{user ? user.username.charAt(0).toUpperCase() : <User />}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{user ? user.username : 'Visitante'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/perfil">
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Entrar</span>
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 backdrop-blur  flex items-center justify-between p-4 border-b">
            <div className='flex items-center gap-2'>
              <SidebarTrigger />
              <h2 className='font-headline text-lg font-semibold capitalize'>{pathname.split('/').pop()?.replace(/-/g, ' ') || 'Home'}</h2>
            </div>
            {/* {isAdmin && (
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Editar Página
              </Button>
            )} */}
          </header>
          <main className="p-4 md:p-6 lg:p-8 pt-20">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
