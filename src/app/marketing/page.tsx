import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Image from 'next/image';

export default function MarketingPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold font-headline tracking-tight lg:text-5xl">
          Marketing e Parcerias
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Fortaleça sua marca associando-se ao esporte que mais cresce na Região dos Lagos.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Por que patrocinar a BBLagos?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <Image src="https://placehold.co/800x300" alt="Evento de bodyboard lotado" width={800} height={300} className="w-full rounded-lg" data-ai-hint="surfing crowd" />
          <p>
            Associar sua marca à BBLagos significa conectar-se com um público jovem, dinâmico e apaixonado por esportes, natureza e estilo de vida praiano. Nossos eventos atraem milhares de espectadores e possuem grande engajamento nas redes sociais.
          </p>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Baixar Mídia Kit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
