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
import { athletes, Athlete } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

const categories: Athlete['category'][] = ['Profissional', 'Open', 'Legend', 'Master', 'Sub-18', 'Sub-15'];

export default function RankingsPage() {
  const [activeTab, setActiveTab] = useState<Athlete['category']>('Profissional');

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
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
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
                    <TableHead className="hidden md:table-cell">País</TableHead>
                    <TableHead className="text-right">Pontos</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredAthletes.length > 0 ? (
                    filteredAthletes.map((athlete) => (
                    <TableRow key={athlete.id}>
                        <TableCell className="font-bold text-lg text-center">{athlete.rank}</TableCell>
                        <TableCell>
                        <Link href={`/athletes/${athlete.id}`} className="flex items-center gap-4 group">
                            <div className="relative h-12 w-12 rounded-full overflow-hidden">
                                <Image
                                src={athlete.photo}
                                alt={athlete.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                data-ai-hint="portrait athlete"
                                />
                            </div>
                            <span className="font-medium group-hover:text-primary transition-colors">{athlete.name}</span>
                        </Link>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                           <Image src={`https://flagcdn.com/h24/${athlete.countryCode}.png`} alt={`${athlete.country} flag`} width={24} height={18} className="rounded-sm" />
                           <span>{athlete.country}</span>
                        </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-primary">{athlete.points.toLocaleString()}</TableCell>
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
