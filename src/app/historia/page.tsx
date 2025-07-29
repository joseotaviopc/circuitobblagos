import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function HistoriaPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold font-headline tracking-tight lg:text-5xl">
          Nossa História
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A jornada da BBLagos e o crescimento do bodyboard na região.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>As Origens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <Image src="https://placehold.co/800x400/png" alt="Old photo of bodyboarders" width={800} height={400} className="w-full rounded-lg" data-ai-hint="vintage surfing" />
          <p>
            A BBLagos nasceu da paixão de um grupo de amigos pelas ondas da Região dos Lagos. O que começou como encontros informais de fim de semana, rapidamente se transformou em um movimento para organizar e promover o esporte localmente.
          </p>
          <p>
            Enfrentamos muitos desafios, desde a falta de recursos até a necessidade de provar o valor do bodyboard como um esporte sério. Mas com determinação e o apoio da comunidade, conseguimos realizar os primeiros campeonatos e atrair a atenção para o talento local.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
