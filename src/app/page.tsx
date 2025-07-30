import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { events, athletes, media, rankings } from '@/lib/data';
import { ArrowRight, Calendar, Trophy, Clapperboard, GalleryHorizontal, Instagram, ChevronRight, Loader2 } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

// Instagram profile URL - replace with your actual Instagram username
const INSTAGRAM_PROFILE = 'https://www.instagram.com/circuitobblagos/';

// Placeholder images - you can replace these with actual image paths
const placeholders = [
  { id: 1, alt: 'Bodyboarding action shot 1', src: 'https://instagram.fsdu9-1.fna.fbcdn.net/v/t51.2885-15/524700945_17936631528050677_8040813866992323482_n.webp?stp=dst-webp_p1080x1080&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTY4OC5zZHIuZjgyNzg3LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.fsdu9-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2QECo1fiYNkFhbiGqiyLtvTtBVk02dcwiP-KSC01CjzdhBDs7zaJTY7v09iEADvgpdc&_nc_ohc=TtXUTDx5CPQQ7kNvwERiDM-&_nc_gid=sHxNzuluqkLRi5gXRRKtMw&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY4NzQ5MjQ5ODgwNjQ4MTI0NA%3D%3D.3-ccb7-5&oh=00_AfQ1obkhHoX-zGBhrIPMwbyMsA3Qnx7YCdEgGJNJo-Br5g&oe=688FD21E&_nc_sid=7a9f4b' },
  { id: 2, alt: 'Bodyboarding action shot 2', src: 'https://instagram.fsdu9-1.fna.fbcdn.net/v/t51.2885-15/523024525_1947375945666755_3551264651793666122_n.heic?stp=dst-jpg_e35_p1080x1080_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjE0NDB4MTgwMy5zZHIuZjcxODc4LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.fsdu9-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2QE84dE8McHg1GjtO7J2A1KaAkje7OWX5mjEgBmfVCswQDYfSqx75zxbxy2w07u3gVs&_nc_ohc=4WcSSubBIW0Q7kNvwEXXYKJ&_nc_gid=wYlX9aJnw3EmD0p4CimLPw&edm=AFOO7A0BAAAA&ccb=7-5&ig_cache_key=MzY4NDYzMDcwNjYzMDMxMTg1OQ%3D%3D.3-ccb7-5&oh=00_AfThvoOiFPo0z8Cl6lseUG7rRlx1rHujvPDdQHj5Bj594A&oe=688FE7FE&_nc_sid=a1c8e0' },
  { id: 3, alt: 'Bodyboarding action shot 3', src: 'https://instagram.fsdu9-1.fna.fbcdn.net/v/t51.2885-15/521974485_17935807740050677_5683107379400741633_n.webp?stp=dst-webp_p1080x1080&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjE0NDB4MTc5Ni5zZHIuZjgyNzg3LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.fsdu9-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2QECo1fiYNkFhbiGqiyLtvTtBVk02dcwiP-KSC01CjzdhBDs7zaJTY7v09iEADvgpdc&_nc_ohc=Hw1DslC5Cn0Q7kNvwFjML99&_nc_gid=sHxNzuluqkLRi5gXRRKtMw&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY4MjMyNjU1ODI5Njg3NTQyNA%3D%3D.3-ccb7-5&oh=00_AfQIOf0IHkAa1VQWrwj1gAs3Wk1roVOPJoIa1IHeJ98xUQ&oe=688FDAC2&_nc_sid=7a9f4b' },
  { id: 4, alt: 'Bodyboarding action shot 4', src: 'https://instagram.fsdu9-1.fna.fbcdn.net/v/t51.29350-15/499255849_1265167291680534_1570208367783423276_n.heic?stp=dst-jpg_e35_p1080x1080_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTgwMC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.fsdu9-1.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QEv0jD2Yywk2Dk9865JXRax1Bz7DJ7ttsp5JTCAiOMHrrC1sCVKKZqjpqmw9tXH1nw&_nc_ohc=EafIZiyB1EkQ7kNvwE_aH-a&_nc_gid=vWSxuO5H--YTdgPKM1SiNQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1ODcyNjU3NTAxMDM4MTcyNQ%3D%3D.3-ccb7-5&oh=00_AfSJocvO0_lMUYDNNgN1KfycvrwE0h2ldDhjz2r_Sehgkw&oe=688FEDF2&_nc_sid=22de04' },
  { id: 5, alt: 'Bodyboarding action shot 5', src: 'https://instagram.fsdu9-1.fna.fbcdn.net/v/t51.2885-15/509414433_18505298284003232_6172273669360281678_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTkyMC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.fsdu9-1.fna.fbcdn.net&_nc_cat=108&_nc_oc=Q6cZ2QEv0jD2Yywk2Dk9865JXRax1Bz7DJ7ttsp5JTCAiOMHrrC1sCVKKZqjpqmw9tXH1nw&_nc_ohc=W3tYJpaEVRwQ7kNvwGjeme2&_nc_gid=vWSxuO5H--YTdgPKM1SiNQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1Nzk3Mzg2MDAwNTUyMzQxNQ%3D%3D.3-ccb7-5&oh=00_AfQKdZAwThm8y-6zRMIXrLbgehJwyQsqNsYmWTO2rJg7yQ&oe=688FE2DF&_nc_sid=22de04' },
  { id: 6, alt: 'Bodyboarding action shot 6', src: 'https://instagram.fsdu9-1.fna.fbcdn.net/v/t51.2885-15/508409180_18040440860640941_6203441925717450282_n.jpg?stp=dst-jpg_e35_s1080x1080_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjE0NDB4OTYwLnNkci5mNzU3NjEuZGVmYXVsdF9pbWFnZS5jMiJ9&_nc_ht=instagram.fsdu9-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QEv0jD2Yywk2Dk9865JXRax1Bz7DJ7ttsp5JTCAiOMHrrC1sCVKKZqjpqmw9tXH1nw&_nc_ohc=xC7fNqaCRbAQ7kNvwH8DshM&_nc_gid=vWSxuO5H--YTdgPKM1SiNQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NjU5NTA4NTUxNzI0Mjc0NA%3D%3D.3-ccb7-5&oh=00_AfQ_eBLLyxvtnn-vior3WyedUXrKsw8r4wLl_lMft7__Eg&oe=688FD66C&_nc_sid=22de04' },
];

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
          Explore os rankings, acompanhe os eventos e assista aos melhores atletas desafiando os limites do esporte.
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
                   <Link href={`/eventos/${event.slug}`}>+ Detalhes <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
                  {Object.entries(rankings as Record<string, Array<{id: string; name: string; points: number}>>).map(([category, athletes]) => {
                    const leader = athletes[0];
                    return (
                      <li key={category}>
                        <div className="flex items-center gap-4 rounded-lg border p-1">
                          <p className="flex-1 font-semibold text-[0.5rem] whitespace-nowrap uppercase tracking-wider text-muted-foreground ">
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
          {placeholders.map((post) => (
            <a
              key={post.id}
              href={INSTAGRAM_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square relative rounded-lg overflow-hidden group block"
            >
              <Image
                src={post.src} // Add these images to your public folder
                alt={post.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              />
              {/* <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Instagram className="h-8 w-8 text-white/80 group-hover:text-white" />
              </div> */}
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
