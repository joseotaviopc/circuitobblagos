"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { media, rankings } from '@/lib/data';
import { ArrowRight, Calendar, Trophy, Clapperboard, GalleryHorizontal, Instagram, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useData } from '@/context/data-context';
import ResponsiveInsta from '@/components/instagram';

export default function Home() {
  const { events, atletas } = useData();

  console.log('atletas', atletas);

  return (
    <div className="space-y-12">
      <section className="text-center bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold tracking-tight font-headline text-primary">
          BBLagos
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          O Coração do Bodyboard na Região dos Lagos
        </p>
        <p className="mt-2 max-w-2xl mx-auto text-foreground/80">
          Explore os rankings, acompanhe os eventos e assista aos melhores atletas desafiando os limites do esporte.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/eventos">Eventos</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/rankings">Classificação</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Calendar className="text-primary" />
          Eventos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events?.map((event) => (
            <Card key={event.id} className="flex flex-col overflow-hidden hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0 aspect-square relative">
                <Image
                  src={event.cartazUrl || ''}
                  alt={event.nome}
                  fill
                  className="object-cover"
                // data-ai-hint={event['data-ai-hint'] || 'surfing competition'}
                />
              </CardHeader>
              <CardContent className="p-4 flex-1">
                <h3 className="font-bold font-headline">{event.nome}</h3>
                <p className="text-sm text-muted-foreground">{event.local}</p>
                <p className="text-sm text-muted-foreground">{event.data ? new Date(event.data).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link href={`/eventos/${event.id}`}>+ Detalhes <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-bold font-headline flex items-center gap-2">
            <Trophy className="text-primary" />
            Melhores Atletas
          </h2>
          <Card>
            <CardContent className="p-4">
              <ul className="space-y-4">
                {Object.entries(rankings as Record<string, Array<{ id: string; name: string; points: number }>>).map(([category, athletes]) => {
                  const leader = athletes[0];
                  return (
                    <li key={category}>
                      <div className="flex items-center gap-4 rounded-lg border p-1">
                        <p className="flex-1 font-semibold text-xs whitespace-nowrap uppercase tracking-wider text-muted-foreground ">
                          {category}
                        </p>
                        <Link href={`/rankings?category=${category}`} className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-base whitespace-nowrap">{leader.name}</p>
                            <p className="text-sm text-muted-foreground">{leader.points.toLocaleString()} pts</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link href="/atletas">Ver todos<ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
          </Card>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold font-headline flex items-center gap-2">
            <GalleryHorizontal className="text-primary" />
            Últimas Mídias
          </h2>
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {media.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2">
                  <Card className="overflow-hidden">
                    <CardHeader className="p-0 relative">
                      <Image src={item.thumbnail} alt={item.title} width={600} height={400} className="w-full h-40 object-cover" data-ai-hint="surfing action" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        {item.type === 'video' ? <Clapperboard className="h-12 w-12 text-white/80" /> : <GalleryHorizontal className="h-12 w-12 text-white/80" />}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-bold font-headline truncate">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.event}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Instagram className="text-primary" />
          Siga-nos no Instagram
        </h2>
        {/* overide some class inside my iframe here in my div */}
        {/* <script src="https://cdn.lightwidget.com/widgets/lightwidget.js">
        </script>
        <iframe 
        title="lightwidget" 
        src="//lightwidget.com/widgets/572fba34b8a75d59af82ec9f2fa2ad99.html" 
        scrolling="no" 
        allowtransparency="true"
        className="lightwidget-widget" 
        style={{width: '100%', border: '0', overflow: 'hidden'}}
        >
        </iframe> */}
        <ResponsiveInsta />
      </section>

    </div>
  );
}
