"use client";
import { ArrowRight, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useData } from "@/context/data-context";
import { slugify } from "@/lib/utils";

export function EventsList() {
  const { events } = useData();

  const eventsSorted = events
    ? events.sort((a, b) => {
        if (a.data && b.data) {
          return new Date(b.data).getTime() - new Date(a.data).getTime();
        }
        return 0;
      })
    : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {eventsSorted.map((event) => (
        <Card key={event.id} className="group overflow-hidden flex flex-col">
          <CardHeader className="p-0 w-full">
            <div className="aspect-square relative">
              {event.cartazUrl ? (
                <Image
                  src={event.cartazUrl}
                  alt={event.nome}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  //   data-ai-hint={event['data-ai-hint'] || 'surfing event'}
                />
              ) : (
                <div className="w-full text-8xl h-full flex justify-center items-center">
                  <Award size={80} className="text-background"/>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 flex flex-col flex-grow">
            <h2 className="font-bold text-lg font-headline">{event.nome}</h2>
            <p className="text-sm text-muted-foreground">{event.local}</p>
            <p className="flex-1 text-sm text-muted-foreground">
              {new Date(event.data || "").toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <Button
              asChild
              variant="secondary"
              className="mt-4 w-full justify-center"
            >
              <Link href={`/eventos/${slugify(event.nome)}`}>
                Ver Evento <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
