'use client';
import { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';

const categories: Athlete['category'][] = ['Pro-Masc', 'Pro-Fem', 'Legends', 'Master', 'Sub-18-Masc', 'Sub-15-Masc', 'Sub-15-Fem', 'Sub-12-Masc'];

export default function RankingsPage() {
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
                <TabsList className="flex flex-wrap justify-start h-auto w-full ">
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
                    {/* <TableHead className="hidden md:table-cell">País</TableHead> */}
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
                        {/* <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                           <Image src={`https://flagcdn.com/h24/${athlete.countryCode}.png`} alt={`${athlete.country} flag`} width={24} height={18} className="rounded-sm" />
                           <span>{athlete.country}</span>
                        </div>
                        </TableCell> */}
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
