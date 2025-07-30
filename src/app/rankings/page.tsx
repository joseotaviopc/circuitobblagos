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
import { athletes, Athlete, rankings } from '@/lib/data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams } from 'next/navigation';

const categories: Athlete['category'][] = ['Pro-Masc', 'Pro-Fem', 'Legends', 'Master', 'Sub-18-Masc', 'Sub-15-Masc', 'Sub-15-Fem', 'Sub-12-Masc'];

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
  const [activeTab, setActiveTab] = useState<Athlete['category']>(category as Athlete['category'] || categories[0]);
  
  const filteredAthletes = athletes.filter(
    (athlete) => athlete.category === activeTab
  ).sort((a, b) => a.rank - b.rank);

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
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Athlete['category'])}>
            <TabsList className="flex flex-wrap justify-start h-auto w-full">
              {categories.map((category) => (
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
                {rankings[activeTab].length > 0 ? (
                  rankings[activeTab].sort((a, b) => b.points - a.points).map((athlete, index) => (
                    <TableRow key={athlete.id}>
                      <TableCell className="font-bold text-lg text-center p-1">{index + 1}</TableCell>
                      <TableCell className="p-1">
                        <Link href={`/atletas/${athlete.slug}`} className="flex items-center gap-4 group">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden">
                            <Image
                              src={"https://placehold.co/400x400/png"}
                              alt={athlete.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              data-ai-hint="portrait athlete"
                            />
                          </div>
                          <span className="font-medium group-hover:text-primary transition-colors">{athlete.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-primary p-1 pr-4">{athlete.points.toLocaleString()}</TableCell>
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
