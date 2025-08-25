import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Image from 'next/image';

export default function MarketingPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight leading-tight">
          Marketing e Parcerias
        </h1>
        <p className="mt-2 text-base md:text-lg text-muted-foreground">
          Fortaleça sua marca associando-se ao esporte que mais cresce na Região dos Lagos.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-headline">Por que patrocinar a BBLagos?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-4">
            <div className="relative w-full sm:w-1/2 md:w-1/3 aspect-video rounded-lg overflow-hidden shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Image src="/foto-etapa-e-praia-aerea.jpg" alt="Bodyboarder in action" fill className="object-cover" data-ai-hint="bodyboarder in action" />
            </div>
            <div className="relative w-full sm:w-1/2 md:w-1/3 aspect-video rounded-lg overflow-hidden shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <Image src="/foto-etapa-e-praia.jpg" alt="Bodyboarders on the beach" fill className="object-cover" data-ai-hint="bodyboarders on the beach" />
            </div>
          </div>
          <p className="text-sm md:text-base">
            Nestes três anos de retomada, o circuito já consolidou importantes parcerias. Entre os patrocinadores oficiais, destacam-se a Fênix Board e a Econan Óculos, que acreditam no projeto e no crescimento do bodyboard na Região dos Lagos.
          </p>
          <p className="text-sm md:text-base">
            Hoje, o Circuito BB Lagos é reconhecido como o melhor circuito do estado do Rio de Janeiro e um dos mais promissores do Brasil. A Confederação Brasileira de Bodyboard (CBB) já vê o circuito com grande potencial e concedeu autorização para que seja chancelado pela Sebrasme, passo importante para integrar o calendário oficial nacional.
          </p>
          <p className="text-sm md:text-base">
            👉 O Circuito BB Lagos é um sonho coletivo: feito por quem vive o bodyboard, para fortalecer atletas da base até os Legends.
            E para que esse sonho continue crescendo, estamos em busca de novos patrocinadores e apoiadores.
          </p>
          <p className="text-sm md:text-base">
            Associe sua marca ao melhor circuito de bodyboard do estado e faça parte dessa história!
          </p>
          <Button className="w-full sm:w-auto" disabled>
            <Download className="mr-2 h-4 w-4"/>
            Baixar Mídia Kit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
