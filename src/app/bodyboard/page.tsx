import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function BodyboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold font-headline tracking-tight lg:text-5xl">
          Sobre o Bodyboard
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Tudo o que você precisa saber sobre o esporte que amamos.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <Card>
            <CardHeader>
              <CardTitle>O Esporte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>O bodyboard é um esporte de superfície aquática no qual o surfista desliza sobre a face, crista ou curva de uma onda em direção à areia. O esporte foi inventado em 1971 por Tom Morey, que deu o nome de "Morey Boogie" à sua invenção.</p>
              <p>Diferente do surf tradicional, no bodyboard o praticante geralmente fica deitado na prancha, usando nadadeiras (pés de pato) para ajudar na propulsão e no controle da prancha nas ondas.</p>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>Equipamento Essencial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Image src="https://placehold.co/600x400/png" alt="Equipamento de bodyboard" width={600} height={400} className="w-full rounded-lg" data-ai-hint="bodyboard equipment" />
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Prancha (Board):</strong> O principal equipamento.</li>
                        <li><strong>Leash (Corda):</strong> Mantém a prancha presa ao surfista.</li>
                        <li><strong>Nadadeiras (Pés de Pato):</strong> Essenciais para a propulsão.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
