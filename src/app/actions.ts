// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../../db'; // Assuming '@/db' is your server-side database connection
import { Atleta, atletas, type Event, eventos } from '../../db/schema';

export async function getEvents(): Promise<Event[]> {
  try {
    const eventosResult = await db.select().from(eventos).all();
    return eventosResult;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

export async function getAtletas(): Promise<Atleta[]> {
  try {
    const atletasResult = await db.select().from(atletas).all();
    return atletasResult;
  } catch (error) {
    console.error('Failed to fetch atletas:', error);
    return [];
  }
}
