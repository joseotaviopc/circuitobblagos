const names = [
    "Andre Paiva",
    "Antonio Japa",
    "Arthur Carvalho",
    "Arthur Silva",
    "Bernardo Brito",
    "Bia Vieira",
    "Blademyr Capeloni",
    "Caio Henrique",
    "Davi Carvalho",
    "Dennys Rosa",
    "Diogo Taboada",
    "Edson Junior",
    "Fabio Henrique",
    "Felipe Colombo",
    "Felipe Lima",
    "Gabriela Oliveira",
    "Gugu Barcellos",
    "Guilherme Almeida",
    "Guilherme Araujo",
    "Henrique Gaglioni",
    "Igor Aboin",
    "Israel Eduardo",
    "Ivan Brandao",
    "João Gabriel Carvalho",
    "Joaquim Carvalho",
    "Jose Otavio",
    "Kamilla Video",
    "Larissa Brandao",
    "Lucas Avellar",
    "Lucas Figueiredo",
    "Lucca Garcia",
    "Marcelo Muniz",
    "Matheus Figueiredo",
    "Melissa Souza",
    "Noah Ribeiro",
    "Nyas Chalfun",
    "Paola Simao",
    "Paulo Victor Barros",
    "Rafael Dorileo",
    "Sandro Justo",
    "Sophia Veiga",
    "Thiago Barros",
    "Victoria Moraes ",
    "Wagner Gouveia",
    "Yone Fernandes",
]

import * as schema from "./db/schema";
import { inArray } from "drizzle-orm";
import { db } from "./db";


export async function updateIsAffiliated(names: string[]) {
    if (names.length === 0) {
        return;
    }

    const updatedNames = await db
        .update(schema.atletas)
        .set({ isAffiliated: "true" })
        .where(inArray(schema.atletas.nome, names)).returning();

    const mapedResponse = updatedNames.map(name => {
        return { name: name.nome, afiliado: name.isAffiliated }
    })
    console.log(`changed ${mapedResponse.length} names: `,JSON.stringify(mapedResponse, null, 4))
}

updateIsAffiliated(names);

