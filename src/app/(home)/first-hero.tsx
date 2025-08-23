import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FirstHero() {
    return (
        <section className="text-center rounded-lg shadow-lg py-6 md:py-8 lg:py-12 w-full">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline text-primary leading-tight">
                BBLagos
            </h1>
            <p className="mt-3 text-lg md:text-xl text-muted-foreground leading-snug px-4 text-wrap max-w-prose mx-auto">
                O Coração do Bodyboard na Região dos Lagos
            </p>
            <p className="mt-2 mx-auto text-base md:text-lg text-foreground/80 px-4 text-wrap max-w-prose">
                Explore os rankings, acompanhe os eventos e assista aos melhores atletas desafiando os limites do esporte.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/eventos">Eventos</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <Link href="/rankings">Classificação</Link>
                </Button>
            </div>
        </section>
    )
}