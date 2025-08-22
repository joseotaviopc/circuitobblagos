import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { media } from "@/lib/data";
import { Clapperboard, GalleryHorizontal } from "lucide-react";
import Image from "next/image";

export function HomeMedias() {
    return (
        <section className="space-y-6 ">
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
    )
}