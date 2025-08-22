import { eq } from "drizzle-orm";
import { db } from "./db";
import { atletas, eventos, Result } from "./db/schema";
import { randomUUID } from 'node:crypto';


// console.log(randomUUID());

const resultadoSub15MascEtapa01New = [
    { atleta: "Arthur Silva", categoria: "Sub-15-Masc", posicao: 1, pontos: 1000 },
    { atleta: "Noah Ribeiro", categoria: "Sub-15-Masc", posicao: 7, pontos: 555 },
    { atleta: "Matheus Figueiredo", categoria: "Sub-15-Masc", posicao: 3, pontos: 730 },
    { atleta: "Caio Henrique", categoria: "Sub-15-Masc", posicao: 5, pontos: 610 },
    { atleta: "Davi Carvalho", categoria: "Sub-15-Masc", posicao: 2, pontos: 860 },
    { atleta: "Lucas Avellar", categoria: "Sub-15-Masc", posicao: 13, pontos: 450 },
    { atleta: "Guilherme Almeida", categoria: "Sub-15-Masc", posicao: 7, pontos: 555 },
    { atleta: "Arthur Carvalho", categoria: "Sub-15-Masc", posicao: 10, pontos: 488 },
    { atleta: "Rafael Lorenzo", categoria: "Sub-15-Masc", posicao: 13, pontos: 450 },
    { atleta: "Gael Chaves", categoria: "Sub-15-Masc", posicao: 5, pontos: 610 },
    { atleta: "Nyas Chalfun", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Ryan Suricato", categoria: "Sub-15-Masc", posicao: 10, pontos: 488 },
    { atleta: "Caua Guedes", categoria: "Sub-15-Masc", posicao: 10, pontos: 488 },
    { atleta: "Guilherme Henrique", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Leyr Neto", categoria: "Sub-15-Masc", posicao: 13, pontos: 450 },
    { atleta: "Yuri Franco", categoria: "Sub-15-Masc", posicao: 4, pontos: 670 },
    { atleta: "Henrique Gaglionelli", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Luiz Guilherme", categoria: "Sub-15-Masc", posicao: 7, pontos: 555 },
    { atleta: "Joao Pomato", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Miguel Soares", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Joao Teles", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Nathan De Olveira", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Nathan Silva", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Matheus Ulrick", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Julio Cesar", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Leo Victor", categoria: "Sub-15-Masc", posicao: 13, pontos: 450 },
    { atleta: "Joao Victor Lisboa", categoria: "Sub-15-Masc", posicao: 13, pontos: 450 },
    { atleta: "Gabriel Ferreira", categoria: "Sub-15-Masc", posicao: 13, pontos: 450 },
    { atleta: "Kayllon Miguel", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Julio Cezar", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Marco Antonio", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Nelvan Ferreira", categoria: "Sub-15-Masc", posicao: 19, pontos: 390 },
    { atleta: "Irineu Correa", categoria: "Sub-15-Masc", posicao: 19, pontos: 390 },
    { atleta: "Gabriel Aquino", categoria: "Sub-15-Masc", posicao: 19, pontos: 390 },
    { atleta: "Arthur Leal", categoria: "Sub-15-Masc", posicao: 19, pontos: 390 },
    { atleta: "Adailton Vieira", categoria: "Sub-15-Masc", posicao: 19, pontos: 390 },
];

const resultadoSub15MascEtapa02New = [
    { atleta: "Arthur Silva", categoria: "Sub-15-Masc", posicao: 3, pontos: 730 },
    { atleta: "Noah Ribeiro", categoria: "Sub-15-Masc", posicao: 1, pontos: 1000 },
    { atleta: "Matheus Figueiredo", categoria: "Sub-15-Masc", posicao: 2, pontos: 860 },
    { atleta: "Caio Henrique", categoria: "Sub-15-Masc", posicao: 13, pontos: 450 },
    { atleta: "Davi Carvalho", categoria: "Sub-15-Masc", posicao: 7, pontos: 555 },
    { atleta: "Lucas Avellar", categoria: "Sub-15-Masc", posicao: 5, pontos: 610 },
    { atleta: "Guilherme Almeida", categoria: "Sub-15-Masc", posicao: 4, pontos: 670 },
    { atleta: "Arthur Carvalho", categoria: "Sub-15-Masc", posicao: 5, pontos: 610 },
    { atleta: "Rafael Lorenzo", categoria: "Sub-15-Masc", posicao: 13, pontos: 450 },
    { atleta: "Gael Chaves", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Nyas Chalfun", categoria: "Sub-15-Masc", posicao: 7, pontos: 555 },
    { atleta: "Ryan Suricato", categoria: "Sub-15-Masc", posicao: 10, pontos: 488 },
    { atleta: "Caua Guedes", categoria: "Sub-15-Masc", posicao: 10, pontos: 488 },
    { atleta: "Guilherme Henrique", categoria: "Sub-15-Masc", posicao: 13, pontos: 450 },
    { atleta: "Leyr Neto", categoria: "Sub-15-Masc", posicao: 19, pontos: 390 },
    { atleta: "Yuri Franco", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Henrique Gaglionelli", categoria: "Sub-15-Masc", posicao: 7, pontos: 555 },
    { atleta: "Luiz Guilherme", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Joao Pomato", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Miguel Soares", categoria: "Sub-15-Masc", posicao: 10, pontos: 488 },
    { atleta: "Joao Teles", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Nathan De Olveira", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Nathan Silva", categoria: "Sub-15-Masc", posicao: 13, pontos: 450 },
    { atleta: "Matheus Ulrick", categoria: "Sub-15-Masc", posicao: 13, pontos: 450 },
    { atleta: "Julio Cesar", categoria: "Sub-15-Masc", posicao: 13, pontos: 450 },
    { atleta: "Leo Victor", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Joao Victor Lisboa", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gabriel Ferreira", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Kayllon Miguel", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Julio Cezar", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Marco Antonio", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Nelvan Ferreira", categoria: "Sub-15-Masc", posicao: 19, pontos: 390 },
    { atleta: "Irineu Correa", categoria: "Sub-15-Masc", posicao: 19, pontos: 390 },
    { atleta: "Gabriel Aquino", categoria: "Sub-15-Masc", posicao: 19, pontos: 390 },
    { atleta: "Arthur Leal", categoria: "Sub-15-Masc", posicao: 19, pontos: 390 },
    { atleta: "Adailton Vieira", categoria: "Sub-15-Masc", posicao: 19, pontos: 390 },
];

const resultadoSub15MascEtapa03New = [
    { atleta: "Arthur Silva", categoria: "Sub-15-Masc", posicao: 5, pontos: 610 },
    { atleta: "Noah Ribeiro", categoria: "Sub-15-Masc", posicao: 3, pontos: 730 },
    { atleta: "Matheus Figueiredo", categoria: "Sub-15-Masc", posicao: 5, pontos: 610 },
    { atleta: "Caio Henrique", categoria: "Sub-15-Masc", posicao: 1, pontos: 1000 },
    { atleta: "Davi Carvalho", categoria: "Sub-15-Masc", posicao: 7, pontos: 555 },
    { atleta: "Lucas Avellar", categoria: "Sub-15-Masc", posicao: 2, pontos: 860 },
    { atleta: "Guilherme Almeida", categoria: "Sub-15-Masc", posicao: 4, pontos: 670 },
    { atleta: "Arthur Carvalho", categoria: "Sub-15-Masc", posicao: 7, pontos: 555 },
    { atleta: "Rafael Lorenzo", categoria: "Sub-15-Masc", posicao: 11, pontos: 475 },
    { atleta: "Gael Chaves", categoria: "Sub-15-Masc", posicao: 11, pontos: 475 },
    { atleta: "Nyas Chalfun", categoria: "Sub-15-Masc", posicao: 11, pontos: 475 },
    { atleta: "Ryan Suricato", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Caua Guedes", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Guilherme Henrique", categoria: "Sub-15-Masc", posicao: 11, pontos: 475 },
    { atleta: "Leyr Neto", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Yuri Franco", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Henrique Gaglionelli", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Luiz Guilherme", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Joao Pomato", categoria: "Sub-15-Masc", posicao: 7, pontos: 555 },
    { atleta: "Miguel Soares", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Joao Teles", categoria: "Sub-15-Masc", posicao: 10, pontos: 488 },
    { atleta: "Nathan De Olveira", categoria: "Sub-15-Masc", posicao: 11, pontos: 475 },
    { atleta: "Nathan Silva", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Matheus Ulrick", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Julio Cesar", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Leo Victor", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Joao Victor Lisboa", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gabriel Ferreira", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Kayllon Miguel", categoria: "Sub-15-Masc", posicao: 16, pontos: 413 },
    { atleta: "Julio Cezar", categoria: "Sub-15-Masc", posicao: 16, pontos: 413 },
    { atleta: "Marco Antonio", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Nelvan Ferreira", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Irineu Correa", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gabriel Aquino", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Arthur Leal", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
    { atleta: "Adailton Vieira", categoria: "Sub-15-Masc", posicao: 0, pontos: 0 },
];

const resultadoProMascEtapa01New = [
    { atleta: "Adejaldo Silva", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Adriano Barreto", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Agatao Junior", categoria: "Pro-Masc", posicao: 17, pontos: 400 },
    { atleta: "Alexandre Silva", categoria: "Pro-Masc", posicao: 17, pontos: 400 },
    { atleta: "Andre Lopes", categoria: "Pro-Masc", posicao: 25, pontos: 360 },
    { atleta: "Andre Luiz", categoria: "Pro-Masc", posicao: 9, pontos: 500 },
    { atleta: "Andre Sancho", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Ariel Souza", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Arthur Patrick", categoria: "Pro-Masc", posicao: 25, pontos: 360 },
    { atleta: "Augusto Salvador", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Blademyr Capeloni", categoria: "Pro-Masc", posicao: 17, pontos: 400 },
    { atleta: "Bruno Araujo", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Bruno Leitao", categoria: "Pro-Masc", posicao: 25, pontos: 360 },
    { atleta: "Bruno Valente", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Caique Thomas", categoria: "Pro-Masc", posicao: 17, pontos: 400 },
    { atleta: "Carlos Bastos", categoria: "Pro-Masc", posicao: 9, pontos: 500 },
    { atleta: "Christopher Reis", categoria: "Pro-Masc", posicao: 17, pontos: 400 },
    { atleta: "Daniel Silva", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Diego Rodrigues", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Diogo Taboada", categoria: "Pro-Masc", posicao: 25, pontos: 360 },
    { atleta: "Dionatam Barroso", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Edson Junior", categoria: "Pro-Masc", posicao: 7, pontos: 555 },
    { atleta: "Erick Poseidon", categoria: "Pro-Masc", posicao: 9, pontos: 500 },
    { atleta: "Erisberto Abrantes", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Felipe Lima", categoria: "Pro-Masc", posicao: 2, pontos: 860 },
    { atleta: "Felipe Pereira", categoria: "Pro-Masc", posicao: 25, pontos: 360 },
    { atleta: "Flavio Stanek", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Franklin Carlos", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gabriel Elizeu", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Gabriel Flores", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gabriel Ramalho", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gabriel Rufino", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gustavo Barreto", categoria: "Pro-Masc", posicao: 17, pontos: 400 },
    { atleta: "Igor Aboin", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Israel Eduardo", categoria: "Pro-Masc", posicao: 1, pontos: 1000 },
    { atleta: "Joao Victor", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Jose Otavio", categoria: "Pro-Masc", posicao: 3, pontos: 730 },
    { atleta: "Kaua Costa", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Leonardo Moreira", categoria: "Pro-Masc", posicao: 17, pontos: 400 },
    { atleta: "Lucas Figueiredo", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Lucas Franco", categoria: "Pro-Masc", posicao: 17, pontos: 400 },
    { atleta: "Matheus Figueiredo", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Matheus Fontes", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Matheus Guimaraes", categoria: "Pro-Masc", posicao: 25, pontos: 360 },
    { atleta: "Maycon Cartaxo", categoria: "Pro-Masc", posicao: 25, pontos: 360 },
    { atleta: "Nicolas Araujo", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Paulo Victor Barros", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Pedro Henrique", categoria: "Pro-Masc", posicao: 5, pontos: 610 },
    { atleta: "Rafael Paes", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Renan Biruleybe", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Renan Farias", categoria: "Pro-Masc", posicao: 9, pontos: 500 },
    { atleta: "Ricardo Andrade", categoria: "Pro-Masc", posicao: 25, pontos: 360 },
    { atleta: "Ricardo Junior", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Saul Felipe", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Sergio Machado", categoria: "Pro-Masc", posicao: 4, pontos: 670 },
    { atleta: "Shelton Icaro", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Thiago Barros", categoria: "Pro-Masc", posicao: 5, pontos: 610 },
    { atleta: "Wardeley Junior", categoria: "Pro-Masc", posicao: 7, pontos: 555 },
    { atleta: "Yuri Sales", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
];

const resultadoProMascEtapa02New = [
    { atleta: "Adejaldo Silva", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Adriano Barreto", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Agatao Junior", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Alexandre Silva", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Andre Lopes", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Andre Luiz", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Andre Sancho", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Ariel Souza", categoria: "Pro-Masc", posicao: 19, pontos: 390 },
    { atleta: "Arthur Patrick", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Augusto Salvador", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Blademyr Capeloni", categoria: "Pro-Masc", posicao: 9, pontos: 500 },
    { atleta: "Bruno Araujo", categoria: "Pro-Masc", posicao: 19, pontos: 390 },
    { atleta: "Bruno Leitao", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Bruno Valente", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Caique Thomas", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Carlos Bastos", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Christopher Reis", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Daniel Silva", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Diego Rodrigues", categoria: "Pro-Masc", posicao: 7, pontos: 555 },
    { atleta: "Diogo Taboada", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Dionatam Barroso", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Edson Junior", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Erick Poseidon", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Erisberto Abrantes", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Felipe Lima", categoria: "Pro-Masc", posicao: 9, pontos: 500 },
    { atleta: "Felipe Pereira", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Flavio Stanek", categoria: "Pro-Masc", posicao: 9, pontos: 500 },
    { atleta: "Franklin Carlos", categoria: "Pro-Masc", posicao: 19, pontos: 390 },
    { atleta: "Gabriel Elizeu", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gabriel Flores", categoria: "Pro-Masc", posicao: 19, pontos: 390 },
    { atleta: "Gabriel Ramalho", categoria: "Pro-Masc", posicao: 9, pontos: 500 },
    { atleta: "Gabriel Rufino", categoria: "Pro-Masc", posicao: 5, pontos: 610 },
    { atleta: "Gustavo Barreto", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Igor Aboin", categoria: "Pro-Masc", posicao: 5, pontos: 610 },
    { atleta: "Israel Eduardo", categoria: "Pro-Masc", posicao: 3, pontos: 730 },
    { atleta: "Joao Victor", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Jose Otavio", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Kaua Costa", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Leonardo Moreira", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Lucas Figueiredo", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Lucas Franco", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Matheus Figueiredo", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Matheus Fontes", categoria: "Pro-Masc", posicao: 19, pontos: 390 },
    { atleta: "Matheus Guimaraes", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Maycon Cartaxo", categoria: "Pro-Masc", posicao: 7, pontos: 555 },
    { atleta: "Nicolas Araujo", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Paulo Victor Barros", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Pedro Henrique", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Rafael Paes", categoria: "Pro-Masc", posicao: 4, pontos: 670 },
    { atleta: "Renan Biruleybe", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Renan Farias", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Ricardo Andrade", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Ricardo Junior", categoria: "Pro-Masc", posicao: 19, pontos: 390 },
    { atleta: "Saul Felipe", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Sergio Machado", categoria: "Pro-Masc", posicao: 1, pontos: 1000 },
    { atleta: "Shelton Icaro", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Thiago Barros", categoria: "Pro-Masc", posicao: 2, pontos: 860 },
    { atleta: "Wardeley Junior", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Yuri Sales", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
];

const resultadoProMascEtapa03New = [
    { atleta: "Adejaldo Silva", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Adriano Barreto", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Agatao Junior", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Alexandre Silva", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Andre Lopes", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Andre Luiz", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Andre Sancho", categoria: "Pro-Masc", posicao: 5, pontos: 610 },
    { atleta: "Ariel Souza", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Arthur Patrick", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Augusto Salvador", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Blademyr Capeloni", categoria: "Pro-Masc", posicao: 9, pontos: 500 },
    { atleta: "Bruno Araujo", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Bruno Leitao", categoria: "Pro-Masc", posicao: 9, pontos: 500 },
    { atleta: "Bruno Valente", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Caique Thomas", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Carlos Bastos", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Christopher Reis", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Daniel Silva", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Diego Rodrigues", categoria: "Pro-Masc", posicao: 19, pontos: 390 },
    { atleta: "Diogo Taboada", categoria: "Pro-Masc", posicao: 5, pontos: 610 },
    { atleta: "Dionatam Barroso", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Edson Junior", categoria: "Pro-Masc", posicao: 1, pontos: 1000 },
    { atleta: "Erick Poseidon", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Erisberto Abrantes", categoria: "Pro-Masc", posicao: 9, pontos: 500 },
    { atleta: "Felipe Lima", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Felipe Pereira", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Flavio Stanek", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Franklin Carlos", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Gabriel Elizeu", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gabriel Flores", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Gabriel Ramalho", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gabriel Rufino", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gustavo Barreto", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Igor Aboin", categoria: "Pro-Masc", posicao: 2, pontos: 860 },
    { atleta: "Israel Eduardo", categoria: "Pro-Masc", posicao: 3, pontos: 730 },
    { atleta: "Joao Victor", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Jose Otavio", categoria: "Pro-Masc", posicao: 7, pontos: 555 },
    { atleta: "Kaua Costa", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Leonardo Moreira", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Lucas Figueiredo", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Lucas Franco", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Matheus Figueiredo", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Matheus Fontes", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Matheus Guimaraes", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Maycon Cartaxo", categoria: "Pro-Masc", posicao: 4, pontos: 670 },
    { atleta: "Nicolas Araujo", categoria: "Pro-Masc", posicao: 19, pontos: 390 },
    { atleta: "Paulo Victor Barros", categoria: "Pro-Masc", posicao: 19, pontos: 390 },
    { atleta: "Pedro Henrique", categoria: "Pro-Masc", posicao: 7, pontos: 555 },
    { atleta: "Rafael Paes", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Renan Biruleybe", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Renan Farias", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Ricardo Andrade", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Ricardo Junior", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Saul Felipe", categoria: "Pro-Masc", posicao: 19, pontos: 390 },
    { atleta: "Sergio Machado", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Shelton Icaro", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Thiago Barros", categoria: "Pro-Masc", posicao: 9, pontos: 500 },
    { atleta: "Wardeley Junior", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Yuri Sales", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
];

const resultadoProMascEtapa04New = [
    { atleta: "Adejaldo Silva", categoria: "Pro-Masc", posicao: 4, pontos: 670 },
    { atleta: "Adriano Barreto", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Agatao Junior", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Alexandre Silva", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Andre Lopes", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Andre Luiz", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Andre Sancho", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Ariel Souza", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Arthur Patrick", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Augusto Salvador", categoria: "Pro-Masc", posicao: 19, pontos: 390 },
    { atleta: "Blademyr Capeloni", categoria: "Pro-Masc", posicao: 3, pontos: 730 },
    { atleta: "Bruno Araujo", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Bruno Leitao", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Bruno Valente", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Caique Thomas", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Carlos Bastos", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Christopher Reis", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Daniel Silva", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Diego Rodrigues", categoria: "Pro-Masc", posicao: 10, pontos: 488 },
    { atleta: "Diogo Taboada", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Dionatam Barroso", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Edson Junior", categoria: "Pro-Masc", posicao: 7, pontos: 555 },
    { atleta: "Erick Poseidon", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Erisberto Abrantes", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Felipe Lima", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Felipe Pereira", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Flavio Stanek", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Franklin Carlos", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gabriel Elizeu", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gabriel Flores", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gabriel Ramalho", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gabriel Rufino", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Gustavo Barreto", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Igor Aboin", categoria: "Pro-Masc", posicao: 5, pontos: 610 },
    { atleta: "Israel Eduardo", categoria: "Pro-Masc", posicao: 1, pontos: 1000 },
    { atleta: "Joao Victor", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Jose Otavio", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Kaua Costa", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Leonardo Moreira", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Lucas Figueiredo", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Lucas Franco", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Matheus Figueiredo", categoria: "Pro-Masc", posicao: 10, pontos: 488 },
    { atleta: "Matheus Fontes", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Matheus Guimaraes", categoria: "Pro-Masc", posicao: 10, pontos: 488 },
    { atleta: "Maycon Cartaxo", categoria: "Pro-Masc", posicao: 7, pontos: 555 },
    { atleta: "Nicolas Araujo", categoria: "Pro-Masc", posicao: 19, pontos: 390 },
    { atleta: "Paulo Victor Barros", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Pedro Henrique", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Rafael Paes", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Renan Biruleybe", categoria: "Pro-Masc", posicao: 7, pontos: 555 },
    { atleta: "Renan Farias", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Ricardo Andrade", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Ricardo Junior", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Saul Felipe", categoria: "Pro-Masc", posicao: 13, pontos: 455 },
    { atleta: "Sergio Machado", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Shelton Icaro", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Thiago Barros", categoria: "Pro-Masc", posicao: 2, pontos: 860 },
    { atleta: "Wardeley Junior", categoria: "Pro-Masc", posicao: 0, pontos: 0 },
    { atleta: "Yuri Sales", categoria: "Pro-Masc", posicao: 5, pontos: 610 },
];

const resultadoProFemEtapa01New = [
    { atleta: "Victoria Moraes", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Paola Simao", categoria: "Pro-Fem", posicao: 1, pontos: 1000 },
    { atleta: "Melissa Souza", categoria: "Pro-Fem", posicao: 2, pontos: 860 },
    { atleta: "Bia Vieira", categoria: "Pro-Fem", posicao: 3, pontos: 730 },
    { atleta: "Bia Martins", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Sophia Veiga", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Isa Vidal", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Kamilla Video", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Yone Fernandes", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Izabel Fonseca", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Manoela Giacomassi", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
];

const resultadoProFemEtapa02New = [
    { atleta: "Victoria Moraes", categoria: "Pro-Fem", posicao: 2, pontos: 860 },
    { atleta: "Paola Simao", categoria: "Pro-Fem", posicao: 7, pontos: 555 },
    { atleta: "Melissa Souza", categoria: "Pro-Fem", posicao: 5, pontos: 610 },
    { atleta: "Bia Vieira", categoria: "Pro-Fem", posicao: 1, pontos: 1000 },
    { atleta: "Bia Martins", categoria: "Pro-Fem", posicao: 5, pontos: 610 },
    { atleta: "Sophia Veiga", categoria: "Pro-Fem", posicao: 7, pontos: 555 },
    { atleta: "Isa Vidal", categoria: "Pro-Fem", posicao: 3, pontos: 730 },
    { atleta: "Kamilla Video", categoria: "Pro-Fem", posicao: 4, pontos: 670 },
    { atleta: "Yone Fernandes", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Izabel Fonseca", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Manoela Giacomassi", categoria: "Pro-Fem", posicao: 7, pontos: 555 },
];

const resultadoProFemEtapa03New = [
    { atleta: "Victoria Moraes", categoria: "Pro-Fem", posicao: 1, pontos: 1000 },
    { atleta: "Paola Simao", categoria: "Pro-Fem", posicao: 2, pontos: 860 },
    { atleta: "Melissa Souza", categoria: "Pro-Fem", posicao: 3, pontos: 730 },
    { atleta: "Bia Vieira", categoria: "Pro-Fem", posicao: 4, pontos: 670 },
    { atleta: "Bia Martins", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Sophia Veiga", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Isa Vidal", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Kamilla Video", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Yone Fernandes", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Izabel Fonseca", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Manoela Giacomassi", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
];

const resultadoProFemEtapa04New = [
    { atleta: "Victoria Moraes", categoria: "Pro-Fem", posicao: 1, pontos: 1000 },
    { atleta: "Paola Simao", categoria: "Pro-Fem", posicao: 3, pontos: 730 },
    { atleta: "Melissa Souza", categoria: "Pro-Fem", posicao: 2, pontos: 860 },
    { atleta: "Bia Vieira", categoria: "Pro-Fem", posicao: 4, pontos: 670 },
    { atleta: "Bia Martins", categoria: "Pro-Fem", posicao: 7, pontos: 555 },
    { atleta: "Sophia Veiga", categoria: "Pro-Fem", posicao: 5, pontos: 610 },
    { atleta: "Isa Vidal", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Kamilla Video", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
    { atleta: "Yone Fernandes", categoria: "Pro-Fem", posicao: 5, pontos: 610 },
    { atleta: "Izabel Fonseca", categoria: "Pro-Fem", posicao: 7, pontos: 555 },
    { atleta: "Manoela Giacomassi", categoria: "Pro-Fem", posicao: 0, pontos: 0 },
];

// insert new results here

const idEtapa01Brava = "0585de00-da36-46dc-8d34-7a423aefa0e6";
const idEtapa02RioDasOstras = "fccc1cc6-5128-42ca-aefc-2b2ed4f749a7";
const idEtapa03Pipeseca = "50f5f51f-97ab-402c-9e3f-1a55d5b0695a";
const nameEtapa01Brava = "Bravanesia Bodyboard 2025";
const nameEtapa02RioDasOstras = "Rio das Ostras Bodyboard Pro 2025";
const nameEtapa03Pipeseca = "Pipeseca Bodyboard Pro 2025";

const idEtapa04CaboFrio = 'b3b34286-824c-46f8-9723-b9bc9f691848';
const nameEtapa04CaboFrio = "Cabo Frio Contest 2025";

async function getAllAtletas() {
  try {
    const allAtletas = await db.select().from(atletas).all();
    return allAtletas;
  } catch (error) {
    console.error("Failed to retrieve atletas:", error);
    return [];
  }
}

async function insertResults(eventsToProcess: { eventId: string; eventName: string; results: { atleta: string; categoria: string; posicao: number; pontos: number; }[]; }[]) {
  try {
    const allAtletas = await getAllAtletas();
    const atletaMap = new Map(allAtletas.map(atleta => [atleta.nome, atleta.id]));

    const processResults = async (results: { atleta: string; categoria: string; posicao: number; pontos: number; }[], eventId: string, eventName: string) => {
      const formattedResultsPromises = results.map(async (result) => {
        let atletaId = atletaMap.get(result.atleta);
        if (!atletaId) {
          const [newAtleta] = await db.insert(atletas).values({
            id: randomUUID(),
            nome: result.atleta,
          }).returning();
          atletaId = newAtleta.id;
          atletaMap.set(newAtleta.nome, newAtleta.id); // Update map for subsequent results in the same run
        }
        
        return  ({
            categoria: result.categoria,
            atletaId,
            atleta: result.atleta,
            posicao: result.posicao,
            pontos: result.pontos,
        })
    });

      const formattedResults = await Promise.all(formattedResultsPromises);

      const currentEvent = await db.select().from(eventos).where(eq(eventos.id, eventId)).all();

      if (currentEvent.length === 0) {
        console.error("Event with ID", eventId, "not found. Please insert the event first.");
        return;
      }

      const newEvent = await db.update(eventos).set({
        resultados: [...currentEvent[0].resultados || [], ...formattedResults],
      }).where(eq(eventos.id, eventId)).returning();

      const groupedResults = newEvent[0].resultados ? newEvent[0].resultados.reduce((acc, res) => {
        if (!acc[res.categoria]) {
          acc[res.categoria] = 0;
        }
        acc[res.categoria]++;
        return acc;
      }, {} as Record<string, number>) : {};
      console.log(`Evento ${eventName} atualizado com sucesso:`, groupedResults);
    };

    for (const event of eventsToProcess) {
      await processResults(event.results, event.eventId, event.eventName);
    }

  } catch (error) {
    console.error("Erro ao atualizar o evento para Sub-15-Masc Etapa 03:", error);
  }
}

insertResults([
  // { eventId: idEtapa01Brava, eventName: nameEtapa01Brava, results: resultadoSub15MascEtapa01New },
  // { eventId: idEtapa02RioDasOstras, eventName: nameEtapa02RioDasOstras, results: resultadoSub15MascEtapa02New },
  // { eventId: idEtapa03Pipeseca, eventName: nameEtapa03Pipeseca, results: resultadoSub15MascEtapa03New },
//   { eventId: idEtapa04CaboFrio, eventName: nameEtapa04CaboFrio, results: resultadoProMascEtapa04New },
  { eventId: idEtapa01Brava, eventName: nameEtapa01Brava, results: resultadoProFemEtapa01New },
  { eventId: idEtapa02RioDasOstras, eventName: nameEtapa02RioDasOstras, results: resultadoProFemEtapa02New },
  { eventId: idEtapa03Pipeseca, eventName: nameEtapa03Pipeseca, results: resultadoProFemEtapa03New },
  { eventId: idEtapa04CaboFrio, eventName: nameEtapa04CaboFrio, results: resultadoProFemEtapa04New },
]);
