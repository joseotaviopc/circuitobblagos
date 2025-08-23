'use client';
import { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams, useRouter } from 'next/navigation';
import { useData, AtletaResult } from '@/context/data-context';

// const categories: AtletaResult['category'][] = ['Pro-Masc', 'Pro-Fem', 'Legends', 'Master', 'Sub-18-Masc', 'Sub-15-Masc', 'Sub-15-Fem', 'Sub-12-Masc'];

// Skeleton component for loading state
function RankingsSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-80" />
      </div>
      <Card>
        <CardHeader>
          <Tabs>
            <TabsList className="flex flex-wrap justify-start h-auto w-full gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-md" />
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] text-center"><Skeleton className="h-4 w-16 mx-auto" /></TableHead>
                  <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                  <TableHead className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((row) => (
                  <TableRow key={row}>
                    <TableCell className="text-center"><Skeleton className="h-6 w-6 mx-auto" /></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RankingsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const { atletas } = useData();
  const allCategories = Array.from(new Set(atletas.flatMap(atleta => atleta.resultados?.results.map(res => res.categoria) || [])));
  const [activeTab, setActiveTab] = useState<string>(category as string || allCategories[0]);
  const router = useRouter();
  
  const filteredAthletes = atletas.map(athlete => {
    const resultsInActiveCategory = athlete.resultados?.results.filter(res => res.categoria === activeTab && res.posicao !== 0);
    if (resultsInActiveCategory && resultsInActiveCategory.length > 0) {
      // Assuming the athlete's total points for a category is the sum of points from all events in that category
      const totalPoints = resultsInActiveCategory.reduce((sum, res) => sum + res.pontos, 0);
      // Find the best position (lowest number) for the athlete in the active category
      const bestPosition = Math.min(...resultsInActiveCategory.map(res => res.posicao));
      return { ...athlete, totalPoints, bestPosition };
    }
    return null;
  })
  .filter(Boolean)
  .sort((a, b) => (a as any).totalPoints > (b as any).totalPoints ? -1 : 1)
  // .sort((a, b) => (a as any).bestPosition - (b as any).bestPosition);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold font-headline tracking-tight lg:text-5xl">
          Classificação dos Atletas
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Confira o ranking oficial dos atletas de bodyboard em todas as categorias.
        </p>
      </header>
      <Card>
        <CardHeader>
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              router.push(`?category=${value}`);
            }}
          >
            <TabsList className="flex flex-wrap justify-start h-auto w-full">
              {allCategories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] text-center">Posição</TableHead>
                  <TableHead>Atleta</TableHead>
                  <TableHead className="text-right">Pontos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAthletes.length > 0 ? (
                  filteredAthletes.map((athlete, index) => (
                    <TableRow key={athlete!.id}>
                      <TableCell className="font-bold text-lg text-center p-1 md:p-4">{index + 1}</TableCell>
                      <TableCell className="p-1 md:p-4">
                        <Link href={`/atletas/${athlete!.nome.toLowerCase().replace(/ /g, '-')}`} className="flex items-center gap-2 md:gap-4 group">
                          <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={athlete!.profileUrl || "https://placehold.co/400x400/png"}
                              alt={athlete!.nome}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              data-ai-hint="portrait athlete"
                            />
                          </div>
                          <span className="font-medium group-hover:text-primary transition-colors text-sm md:text-base">{athlete!.nome} {athlete?.estado && ` (${athlete?.estado})`}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-primary p-1 pr-2 md:p-4 md:pr-4">{athlete!.totalPoints.toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Nenhum atleta encontrado nesta categoria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RankingsPage() {
  return (
    <Suspense fallback={<RankingsSkeleton />}>
      <RankingsContent />
    </Suspense>
  );
}
