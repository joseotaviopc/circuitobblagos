'use client';
import Image from 'next/image';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, BarChart, ImageIcon, VideoIcon } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useData } from '@/context/data-context';
import { slugify } from '@/lib/utils';

export default function AthleteProfilePage() {
  const { slug } = useParams();
  const { atletas } = useData()
  if (!slug) {
    notFound();
  }

  const atleta = atletas.find((atleta) => slugify(atleta.nome) === slug);
  if (!atleta) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="relative">
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 relative">
              <Image
                src={atleta.profileUrl || '/default-avatar.png'}
                alt={atleta.nome}
                width={400}
                height={400}
                className="object-cover w-full h-full"
                priority
                data-ai-hint="atleta portrait"
              />
            </div>
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-extrabold font-headline mt-1">{atleta.nome}</h1>
              {/* <div className="flex items-center gap-4 mt-4 text-lg text-muted-foreground">
                <Image src={`https://flagcdn.com/h24/${atleta.countryCode}.png`} alt={`${atleta.country} flag`} width={32} height={24} className="rounded-sm" />
                <span>{atleta.country}</span>
              </div> */}
              {/* {atleta.categories.map((category, ind) => (
                <div className="flex items-center gap-2 mt-2 text-lg" key={ind+category.points+category.rank}>
                  <p className="text-sm font-semibold text-primary">{category.name}</p>
                  <Trophy className="text-primary h-6 w-6" />
                  <span className="font-bold">Posição:</span> {category.rank}º
                  <span className="text-muted-foreground">({category.points.toLocaleString()} pontos)</span>
                </div>
              ))} */}
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold">{atleta.estatisticas?.eventos}</p>
                  <p className="text-muted-foreground">Eventos</p>
                  <hr className='my-1' />
                  {atleta.resultados?.results.map(result => (
                    <div key={result.evento}>
                      <p className='text-xs text-left'>{result.evento}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold text-primary">{atleta.estatisticas?.vitorias}</p>
                  <p className="text-muted-foreground">Vitórias</p>
                  <hr className='my-1' />
                  {atleta.resultados?.results.map(result => (
                    <div key={result.evento}>
                      <p className='text-xs text-left'>{result.posicao === 1 && `🏆 ${result.evento}`}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold">{atleta.estatisticas?.podios}</p>
                  <p className="text-muted-foreground">Pódios</p>
                  <hr className='my-1' />
                  {atleta.resultados?.results.map(result => (
                    <div key={result.evento}>
                      <p className='text-xs text-left'>{result.posicao <= 4 && `${result.posicao}º - ${result.evento}`}</p>
                    </div>
                  ))}
                </div>
                {/* <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold">{atleta.estatisticas.top10s}</p>
                  <p className="text-muted-foreground">Top 10</p>
                </div> */}
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
              {atleta.fotos && atleta.fotos.length > 0 ? (
                <Carousel>
                  <CarouselContent>
                    {atleta.fotos.map((photo, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="aspect-video relative rounded-lg overflow-hidden">
                          <Image src={photo} alt={`${atleta.nome} photo ${index + 1}`} fill className="object-cover" data-ai-hint="atleta surfing" />
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
              {atleta.videos && atleta.videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {atleta.videos.map((video, index) => (
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
