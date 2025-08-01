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

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();

  const menuItems = [
    { href: '/eventos', label: 'Calendário', icon: Calendar },
    { href: '/rankings', label: 'Classificação', icon: BarChart },
    { href: '/fotos', label: 'Fotos', icon: ImageIcon },
    { href: '/videos', label: 'Vídeos', icon: Video },
    { href: '/historia', label: 'História', icon: BookOpen },
    { href: '/contato', label: 'Contato', icon: Mail },
    { href: '/bodyboard', label: 'Sobre o Bodyboard', icon: Waves },
    { href: '/patrocinio', label: 'Patrocínios', icon: Megaphone },
  ];

  return (
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
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between p-4 border-b">
          <div className='flex items-center gap-2'>
            <SidebarTrigger />
            <h2 className='font-headline text-lg font-semibold capitalize'>{pathname.split('/').pop()?.replace(/-/g, ' ') || 'Home'}</h2>
          </div>
          {isAdmin && (
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Editar Página
            </Button>
          )}
        </header>
        <main className="p-4 md:p-6 lg:p-8 pt-20">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
