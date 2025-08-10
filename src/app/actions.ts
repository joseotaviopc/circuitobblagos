// app/actions.ts
'use server';

import { db } from '../../db'; // Assuming '@/db' is your server-side database connection
import { type Event, eventos } from '../../db/schema';

export async function getEvents(): Promise<Event[]> {
  try {
    const eventosResult = await db.select().from(eventos).all();
    return eventosResult;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}