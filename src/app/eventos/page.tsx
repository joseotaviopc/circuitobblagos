import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { events } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold font-headline tracking-tight lg:text-5xl">
          Calendário de Eventos
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Acompanhe o circuito e fique por dentro das últimas competições de bodyboard na região dos Lagos.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="group overflow-hidden flex flex-col">
            <CardHeader className="p-0">
              <div className="aspect-square relative">
                <Image
                  src={event.poster}
                  alt={event.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={event['data-ai-hint'] || 'surfing event'}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex flex-col flex-grow">
              <h2 className="font-bold text-lg font-headline">{event.name}</h2>
              <p className="text-sm text-muted-foreground">{event.location}</p>
              <p className="flex-1 text-sm text-muted-foreground">
                {new Date(event.date).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <Button asChild variant="secondary" className="mt-4 w-full">
                <Link href={`/eventos/${event.slug}`}>
                  Ver Evento <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
