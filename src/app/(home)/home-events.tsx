import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Event } from "../../../db/schema";
import { slugify } from "@/lib/utils";

interface HomeEventsProps {
  events: Event[] | null
}
export function HomeEvents({ events }: HomeEventsProps) {
  return (
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
                src={event.cartazUrl || "https://placehold.co/400x400/png"}
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
                <Link href={`/eventos/${slugify(event.nome)}`}>+ Detalhes <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}