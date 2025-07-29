'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="https://placehold.co/100x100" />
            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-headline">Bem-vindo, {user.username}!</CardTitle>
          <CardDescription>{user.role === 'admin' ? 'Administrador' : 'Usuário'}</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
            <p className='text-center text-muted-foreground'>Esta é a sua página de perfil. Mais conteúdo e configurações estarão disponíveis em breve.</p>
          <Button onClick={handleLogout} variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Sair
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
