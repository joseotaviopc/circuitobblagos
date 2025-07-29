'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (success) {
      router.push('/profile');
    } else {
      setError('Usuário ou senha inválidos. Tente "admin" e "password".');
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md">
        <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2">
              <LogIn /> Entrar
            </CardTitle>
            <CardDescription>Digite suas credenciais para acessar a área administrativa.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
