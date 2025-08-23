import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { media } from "@/lib/data";
import { Clapperboard, GalleryHorizontal } from "lucide-react";
import Image from "next/image";

export function HomeMedias() {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold font-headline flex items-center gap-2">
                <GalleryHorizontal className="text-primary" />
                Últimas Mídias
            </h2>
            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {media.map((item) => (
                        <CarouselItem key={item.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                            <Card className="overflow-hidden">
                                <CardHeader className="p-0 relative aspect-video">
                                    <Image src={item.thumbnail} alt={item.title} fill className="w-full h-full object-cover" data-ai-hint="surfing action" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        {item.type === 'video' ? <Clapperboard className="h-10 w-10 md:h-12 md:w-12 text-white/80" /> : <GalleryHorizontal className="h-10 w-10 md:h-12 md:w-12 text-white/80" />}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <h3 className="font-bold font-headline truncate">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground truncate">{item.event}</p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}