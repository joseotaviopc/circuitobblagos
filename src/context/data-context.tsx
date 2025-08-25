'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Atleta, atletas, type Event, eventos } from '../../db/schema';
import { db } from '../../db';
import { getAtletas, getEvents } from '@/app/actions';

export interface AtletaResult {
    id: string;
    nome: string;
    fotos: string[] | null;
    videos: string[] | null;
    resultados: {
        results: {
            evento: string;
            categoria: string;
            posicao: number;
            pontos: number;
        }[];
    } | null;
    nascimento: string | null;
    estado: string | null;
    profileUrl: string | null;
    socialLinks: string[] | null;
    estatisticas: {
        eventos: number;
        vitorias: number;
        podios: number;
    } | null;
}

interface DataContextType {
  events: Event[] | null;
  atletas: Atleta[];
  loadingData: boolean;
  refreshAtletas: () => Promise<void>;
}


const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  async function fetchDb() {
    try {
      const eventsData = await getEvents();
      const atletasData = await getAtletas();

      // console.log('atletasData', atletasData);
      setEvents(eventsData);

      const groupedByAthlete = eventsData.reduce((acc, evento) => {
        if (!evento.resultados) return acc;

        evento.resultados.forEach(res => {
          const eventResult = {
            evento: evento.nome,
            categoria: res.categoria,
            posicao: res.posicao,
            pontos: res.pontos,
          };

          const key = `${res.atleta}_${res.atletaId}`;
          if (acc[key]) {
            acc[key].push(eventResult);
          } else {
            acc[key] = [eventResult];
          }
        });

        return acc;
      }, {} as Record<string, {
        evento: string;
        categoria: string;
        posicao: number;
        pontos: number;
      }[]>);

      // console.log('groupedByAthlete', groupedByAthlete);


      const formattedResults = Object.entries(groupedByAthlete).map(([athleteName, resultsArray]) => {
        return {
          id: athleteName.split('_')[1],
          name: athleteName.split('_')[0],
          results: resultsArray.filter(res => res.posicao !== 0)
        };
      });

      // console.log('groupedResultsArray', formattedResults);
      setAtletas(atletasData.map(atleta => ({
        ...atleta,
        estatisticas: {
          eventos: formattedResults.find(result => result.id === atleta.id)?.results.length || 0,
          vitorias: formattedResults.find(result => result.id === atleta.id)?.results.filter(res => res.posicao === 1).length || 0,
          podios: formattedResults.find(result => result.id === atleta.id)?.results.filter(res => res.posicao <= 3).length || 0,
        },
        resultados: {
          results: formattedResults.find(result => result.id === atleta.id)?.results || []
        }
      })));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoadingData(false);
    }
  }

  const refreshAtletas = async () => {
    setLoadingData(true);
    await fetchDb();
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchDb();
  }, []);



  return (
    <DataContext.Provider value={{ events, atletas, loadingData, refreshAtletas }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within an DataProvider');
  }
  return context;
}
