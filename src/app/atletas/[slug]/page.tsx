'use client';
import Image from 'next/image';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { athletes, rankings } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, BarChart, ImageIcon, VideoIcon } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function AthleteProfilePage() {
  const { slug } = useParams();
  if (!slug) {
    notFound();
  }

  const athlete = athletes.find((athlete) => athlete.slug === slug);
  if (!athlete) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="relative">
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 relative">
              <Image
                src={athlete.photo}
                alt={athlete.name}
                width={400}
                height={400}
                className="object-cover w-full h-full"
                priority
                data-ai-hint="athlete portrait"
              />
            </div>
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-extrabold font-headline mt-1">{athlete.name}</h1>
              <div className="flex items-center gap-4 mt-4 text-lg text-muted-foreground">
                <Image src={`https://flagcdn.com/h24/${athlete.countryCode}.png`} alt={`${athlete.country} flag`} width={32} height={24} className="rounded-sm" />
                <span>{athlete.country}</span>
              </div>
              {athlete.categories.map((category, ind) => (
                <div className="flex items-center gap-2 mt-2 text-lg" key={ind+category.points+category.rank}>
                  <p className="text-sm font-semibold text-primary">{category.name}</p>
                  <Trophy className="text-primary h-6 w-6" />
                  <span className="font-bold">Posição:</span> {category.rank}º
                  <span className="text-muted-foreground">({category.points.toLocaleString()} pontos)</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </header>

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stats"><BarChart className="mr-2 h-4 w-4" />Estatísticas</TabsTrigger>
          <TabsTrigger value="photos"><ImageIcon className="mr-2 h-4 w-4" />Fotos</TabsTrigger>
          <TabsTrigger value="videos"><VideoIcon className="mr-2 h-4 w-4" />Vídeos</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Estatísticas da Carreira</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold">{athlete.stats.events}</p>
                  <p className="text-muted-foreground">Eventos</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold text-primary">{athlete.stats.wins}</p>
                  <p className="text-muted-foreground">Vitórias</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold">{athlete.stats.podiums}</p>
                  <p className="text-muted-foreground">Pódios</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold">{athlete.stats.top10s}</p>
                  <p className="text-muted-foreground">Top 10</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Galeria de Fotos</CardTitle>
            </CardHeader>
            <CardContent>
              {athlete.photos.length > 0 ? (
                <Carousel>
                  <CarouselContent>
                    {athlete.photos.map((photo, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="aspect-video relative rounded-lg overflow-hidden">
                          <Image src={photo} alt={`${athlete.name} photo ${index + 1}`} fill className="object-cover" data-ai-hint="athlete surfing" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              ) : (
                <p className="text-center text-muted-foreground py-8">No photos available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Destaques em Vídeo</CardTitle>
            </CardHeader>
            <CardContent>
              {athlete.videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {athlete.videos.map((video, index) => (
                    <div key={index} className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Video Placeholder</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No videos available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
