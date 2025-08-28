"use server";

import { eq } from "drizzle-orm";
import { db } from "../../db";
import { type Atleta, atletas, type Event, eventos } from "../../db/schema";

export async function getEvents(): Promise<Event[]> {
	try {
		const eventosResult = await db.select().from(eventos).all();
		return eventosResult;
	} catch (error) {
		console.error("Failed to fetch events:", error);
		return [];
	}
}

export async function getAtletas(): Promise<Atleta[]> {
	try {
		const atletasResult = await db.select().from(atletas).all();
		return atletasResult;
	} catch (error) {
		console.error("Failed to fetch atletas:", error);
		return [];
	}
}

export async function updateAtleta(id: string, updateData: Partial<Atleta>) {
	try {
		const updatedAtletas = await db
			.update(atletas)
			.set(updateData)
			.where(eq(atletas.id, id))
			.returning();

		if (updatedAtletas.length === 0) {
			throw new Error("Athlete not found");
		}

		return updatedAtletas[0];
	} catch (error) {
		console.error("Error updating athlete:", error);
		throw error;
	}
}
