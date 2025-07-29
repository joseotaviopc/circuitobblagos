import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { media } from '@/lib/data';
import { Clapperboard, GalleryHorizontal, PlayCircle } from 'lucide-react';

export default function MediaPage() {
  const photos = media.filter((m) => m.type === 'photo');
  const videos = media.filter((m) => m.type === 'video');

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold font-headline tracking-tight lg:text-5xl">
          Media Center
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Catch all the action with photo galleries and video highlights from recent events.
        </p>
      </header>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="photos">
            <GalleryHorizontal className="mr-2 h-4 w-4" />
            Photos
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Clapperboard className="mr-2 h-4 w-4" />
            Videos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="photos" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((item) => (
              <Card key={item.id} className="group overflow-hidden">
                <CardHeader className="p-0">
                  <div className="aspect-video relative">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint="surfing photo"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h2 className="font-bold font-headline truncate">{item.title}</h2>
                  <p className="text-sm text-muted-foreground">{item.event}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((item) => (
              <Card key={item.id} className="group overflow-hidden">
                <CardHeader className="p-0">
                  <div className="aspect-video relative">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                       data-ai-hint="surfing video"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <PlayCircle className="h-16 w-16 text-white/70 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h2 className="font-bold font-headline truncate">{item.title}</h2>
                  <p className="text-sm text-muted-foreground">{item.event}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
