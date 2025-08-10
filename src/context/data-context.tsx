'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { atletas, type Event, eventos } from '../../db/schema';
import { db } from '../../db';
import { getEvents } from '@/app/actions';

interface AtletaResult {
  name: string;
  results: {
      evento: string;
      categoria: string;
      posicao: number;
      pontos: number;
  }[];
}

interface DataContextType {
  events: Event[] | null;
  atletas: AtletaResult[]
}


const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [atletas, setAtletas] = useState<AtletaResult[]>([]);

  async function fetchDb() {
    const eventsData = await getEvents();
    setEvents(eventsData);

    const groupedByAthlete = eventsData.reduce((acc, evento) => {
      if (!evento.resultados) return acc;

      evento.resultados.forEach(res => {
        const eventResult = {
          evento: evento.nome,
          categoria: res.categoria,
          posicao: res.posicao,
          pontos: res.pontos
        };

        if (acc[res.atleta]) {
          acc[res.atleta].push(eventResult);
        } else {
          acc[res.atleta] = [eventResult];
        }
      });

      return acc;
    }, {} as Record<string, {
      evento: string;
      categoria: string;
      posicao: number;
      pontos: number;
    }[]>);


    const formattedResults = Object.entries(groupedByAthlete).map(([athleteName, resultsArray]) => {
      return {
        name: athleteName,
        results: resultsArray.filter(res => res.posicao !== 0)
      };
    });

    // console.log('groupedResultsArray', formattedResults);
    setAtletas(formattedResults);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchDb();
  }, []);



  return (
    <DataContext.Provider value={{ events, atletas }}>
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
