import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FirstHero() {
    return (
        <section className="text-center p-8 rounded-lg shadow-lg">
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
                    <Link href="/eventos">Eventos</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="/rankings">Classificação</Link>
                </Button>
            </div>
        </section>
    )
}