'use client';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { EventSummaryGenerator } from '@/components/event-summary-generator';
import { useData } from '@/context/data-context';
import { slugify, groupByCategory } from '@/lib/utils';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export default function EventDetailPage() {
  const { slug } = useParams();
  const { events } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  if (!slug) {
    notFound();
  }

  const event = events?.find(event => slugify(event.nome) === slug);

  if (!event) {
    notFound();
  }

  const eventForAISummary = {
    eventName: event.nome,
    eventDate: new Date(event.data || '').toLocaleDateString(),
    eventLocation: event.local,
    // eventHighlights: event.highlights,
    // eventResults: event.results,
  };

  return (
    <div className="space-y-8">
      <div
        className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg cursor-pointer"
        onClick={() => {
          setIsModalOpen(true);
          setSelectedImage(event!.cartazUrl || '');
        }}
      >
        <Image
          src={event!.cartazUrl || ''}
          alt={event!.nome}
          fill
          className="object-cover object-center"
          priority
        //   data-ai-hint={event['data-ai-hint'] || 'surfing action'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline text-white drop-shadow-lg leading-tight">
            {event.nome}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Detalhes do Evento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-base md:text-lg">
                    <div className="flex items-center gap-2 md:gap-3">
                        <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                        <span>{new Date(event.data || '').toLocaleDateString('pt-BR', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                        })}</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                        <span>{event.local}</span>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Event Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{}</p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Resultados</CardTitle>
                </CardHeader>
                <CardContent>
                    {event.resultados && Object.entries(groupByCategory(event.resultados.filter(result => result.posicao !== 0 && result.posicao <= 4), 'categoria')).map(([category, results]) => (
                      <div key={category} className="mb-4">
                        <h3 className="text-xl font-semibold font-headline mb-2">{category}</h3>
                        {results.sort((a, b) => a.posicao - b.posicao).map(result => (
                          <p key={result.atleta}>{result.posicao}º - {result.atleta}</p>
                        ))}
                      </div>
                    ))}
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1">
          <EventSummaryGenerator event={eventForAISummary} />
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <div className="relative h-[80vh] w-full">
              <DialogTitle className="sr-only">Event Poster</DialogTitle>
              <Image
                src={selectedImage}
                alt="Event Poster"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
