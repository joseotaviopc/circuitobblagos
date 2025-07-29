'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { PlusCircle, Edit, Trash2, List } from 'lucide-react';
import Link from 'next/link';

const contentTypes = [
  { name: 'Eventos', slug: 'events' },
  { name: 'Notícias', slug: 'news' },
  { name: 'Fotos', slug: 'photos' },
  { name: 'Vídeos', slug: 'videos' },
  { name: 'Classificações', slug: 'rankings' },
];

export default function AdminPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null; // Or a loading/unauthorized component
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold font-headline tracking-tight lg:text-5xl">
          Painel de Controle
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Gerencie o conteúdo do site a partir daqui.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentTypes.map((type) => (
          <Card key={type.slug}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <List /> {type.name}
              </CardTitle>
              <CardDescription>
                Crie, atualize ou exclua {type.name.toLowerCase()}.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                </Button>
                 <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Atualizar
                </Button>
                <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Criar
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
