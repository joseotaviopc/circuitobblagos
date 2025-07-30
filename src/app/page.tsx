import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { events, athletes, media } from '@/lib/data';
import { ArrowRight, Calendar, Trophy, Clapperboard, GalleryHorizontal, Instagram } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function Home() {
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
          Explore os rankings, acompanhe os eventos e assista aos melhores atletas do mundo desafiando os limites do esporte.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/eventos">Próximos Eventos</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/rankings">Ver Classificação</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Calendar className="text-primary" />
          Próximos Eventos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0 aspect-square relative">
                <Image
                  src={event.poster}
                  alt={event.name}
                  fill
                  className="object-cover"
                  data-ai-hint={event['data-ai-hint'] || 'surfing competition'}
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-bold font-headline">{event.name}</h3>
                <p className="text-sm text-muted-foreground">{event.location}</p>
                <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
                  {athletes.filter(a => a.category === 'Profissional').slice(0, 3).map((athlete) => (
                    <li key={athlete.id}>
                      <Link href={`/atletas/${athlete.id}`} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary">
                        <span className="text-2xl font-bold text-primary w-6">#{athlete.rank}</span>
                        <Image src={`https://flagcdn.com/h24/${athlete.countryCode}.png`} alt={`${athlete.country} flag`} width={32} height={24} className="rounded-sm" />
                        <div>
                          <p className="font-semibold">{athlete.name}</p>
                          <p className="text-sm text-muted-foreground">{athlete.country}</p>
                        </div>
                        <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="aspect-square relative rounded-lg overflow-hidden group">
              <Image 
                src={`https://placehold.co/400x400/png`} 
                alt={`Instagram post ${index + 1}`} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                data-ai-hint="bodyboarding surfing"
              />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Instagram className="h-10 w-10 text-white/80 group-hover:text-white" />
               </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
