import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AtletaResult, useData } from "@/context/data-context";
import { ArrowRight, CheckCircle, ChevronRight, Trophy,  } from "lucide-react";
import Link from "next/link";
import { Atleta } from "../../../db/schema";

interface HomeAtletasProps {
    atletas?: Atleta[]
}
export function HomeAtletas({ atletas: propAthletes }: HomeAtletasProps) {
    const { atletas: contextAthletes } = useData();
    const athletesToUse = propAthletes || contextAthletes;

    const categoriesMap = new Map<string, (Atleta & { totalPoints: number; bestPosition: number })[]>();

    athletesToUse.forEach(athlete => {
        athlete.resultados?.results.forEach(res => {
            if (res.posicao !== 0) {
                if (!categoriesMap.has(res.categoria)) {
                    categoriesMap.set(res.categoria, []);
                }
                const currentCategoryAthletes = categoriesMap.get(res.categoria)!;
                const existingAthleteIndex = currentCategoryAthletes.findIndex(a => a.id === athlete.id);

                if (existingAthleteIndex > -1) {
                    const existingAthlete = currentCategoryAthletes[existingAthleteIndex];
                    existingAthlete.totalPoints += res.pontos;
                    existingAthlete.bestPosition = Math.min(existingAthlete.bestPosition, res.posicao);
                } else {
                    currentCategoryAthletes.push({
                        ...athlete,
                        totalPoints: res.pontos,
                        bestPosition: res.posicao,
                    });
                }
            }
        });
    });

    const topAthletesByCategory = Array.from(categoriesMap.entries()).map(([category, athletes]) => {
        const sortedAthletes = athletes.sort((a, b) => {
            if (b.totalPoints !== a.totalPoints) {
                return b.totalPoints - a.totalPoints;
            }
            return a.bestPosition - b.bestPosition;
        });
        return {
            category,
            leader: sortedAthletes[0],
            isAffiliated: sortedAthletes[0].isAffiliated,
        };
    }).filter(item => item.leader);

    return (
        <section className="space-y-6 mx-auto">
            <h2 className="text-3xl font-bold font-headline flex items-center gap-2">
                <Trophy className="text-primary" />
                Melhores Atletas
            </h2>
            <Card>
                <CardContent className="p-4">
                    <ul className="space-y-4">
                        {topAthletesByCategory.map(({ category, leader }) => (
                                <li key={category}>
                                    <div className="flex flex-wrap items-center gap-4 rounded-lg border p-2 justify-between">
                                        <p className="flex-1 font-semibold text-xs text-nowrap uppercase tracking-wider text-muted-foreground">
                                            {category} {category.toLowerCase().includes('fem') ? '🚺' : '🚹'}
                                        </p>
                                        <Link href={`/rankings?category=${category}`} className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold text-base text-nowrap">
                                                    {leader.nome}
                                                    {leader!.isAffiliated && <CheckCircle className="ml-1 h-4 w-4 text-green-500 inline-block" />}
                                                </p>
                                                <p className="text-sm text-muted-foreground text-nowrap">{leader.totalPoints.toLocaleString()} pts</p>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                        </Link>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <Button asChild variant="link" className="p-0 h-auto w-full justify-start md:w-auto">
                        <Link href="/atletas">Ver todos<ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </CardFooter>
            </Card>
        </section>
    )
}