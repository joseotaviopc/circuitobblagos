export type Athlete = {
	id: string;
	name: string;
	slug: string;
	rank: number;
	category:
		| "Pro-Masc"
		| "Pro-Fem"
		| "Legends"
		| "Master"
		| "Sub-18-Masc"
		| "Sub-15-Masc"
		| "Sub-15-Fem"
		| "Sub-12-Masc";
	categories: Array<{
		name: string;
		points: number;
		rank: number;
	}>;
	points: number;
	country: string;
	countryCode: string;
	photo: string;
	stats: {
		events: number;
		wins: number;
		podiums: number;
		top10s: number;
	};
	photos: string[];
	videos: string[];
};

type RankingEntry = {
	id: string;
	rank: number;
	name: string;
	slug: string;
	points: number;
};

type Rankings = {
	"Pro-Masc": RankingEntry[];
	"Pro-Fem": RankingEntry[];
	Legends: RankingEntry[];
	Master: RankingEntry[];
	"Sub-18-Masc": RankingEntry[];
	"Sub-15-Masc": RankingEntry[];
	"Sub-15-Fem": RankingEntry[];
	"Sub-12-Masc": RankingEntry[];
};

export const rankings = {
	"Pro-Masc": [
		{
			id: "1",
			rank: 1,
			name: "Israel Eduardo",
			slug: "israel-eduardo",
			points: 2460,
		},
		{ id: "2", rank: 2, name: "Igor aboim", slug: "igor-aboim", points: 1932 },
		{
			id: "3",
			rank: 3,
			name: "Thiago Barros",
			slug: "thiago-barros",
			points: 1915,
		},
		{
			id: "4",
			rank: 4,
			name: "Sérgio Machado",
			slug: "sergio-machado",
			points: 1670,
		},
		{
			id: "5",
			rank: 5,
			name: "Maycon cartaxo",
			slug: "maycon-cartaxo",
			points: 1638,
		},
		{
			id: "6",
			rank: 6,
			name: "Edson Júnior",
			slug: "edson-junior",
			points: 1528,
		},
		{
			id: "7",
			rank: 7,
			name: "Blademyr carpeloni",
			slug: "blademyr-carpeloni",
			points: 1425,
		},
		{
			id: "8",
			rank: 8,
			name: "Felipe Lima",
			slug: "felipe-lima",
			points: 1360,
		},
		{
			id: "9",
			rank: 9,
			name: "José Otávio",
			slug: "jose-otavio",
			points: 1285,
		},
		{
			id: "10",
			rank: 10,
			name: "Matheus Guimarães",
			slug: "matheus-guimaraes",
			points: 1238,
		},
		{
			id: "11",
			rank: 11,
			name: "Pedro Henrique",
			slug: "pedro-henrique",
			points: 1110,
		},
		{
			id: "12",
			rank: 12,
			name: "Diogo tabuada",
			slug: "diogo-tabuada",
			points: 1023,
		},
	],
	"Pro-Fem": [
		{ id: "1", rank: 1, name: "Bia Vieira", slug: "bia-vieira", points: 2400 },
		{
			id: "2",
			rank: 2,
			name: "Melissa Souza",
			slug: "melissa-souza",
			points: 2200,
		},
		{
			id: "3",
			rank: 3,
			name: "Victoria moraes",
			slug: "victoria-moraes",
			points: 1860,
		},
		{
			id: "4",
			rank: 4,
			name: "Paola Simão",
			slug: "paola-simao",
			points: 1860,
		},
		{ id: "5", rank: 5, name: "Isa Vidal", slug: "isa-vidal", points: 730 },
		{
			id: "6",
			rank: 6,
			name: "Kamilla vídeo",
			slug: "kamilla-video",
			points: 670,
		},
		{ id: "7", rank: 7, name: "Bia Martins", slug: "bia-martins", points: 610 },
		{
			id: "8",
			rank: 8,
			name: "Sophia Vargas",
			slug: "sophia-vargas",
			points: 500,
		},
		{
			id: "9",
			rank: 9,
			name: "Manoela giacomassi",
			slug: "manoela-giacomassi",
			points: 500,
		},
	],
	Legends: [
		{
			id: "1",
			rank: 1,
			name: "Ivan Brandão",
			slug: "ivan-brandao",
			points: 2275,
		},
		{
			id: "2",
			rank: 2,
			name: "André Paiva",
			slug: "andre-paiva",
			points: 2145,
		},
		{
			id: "3",
			rank: 3,
			name: "Dennys Rosa",
			slug: "dennys-rosa",
			points: 2030,
		},
		{
			id: "4",
			rank: 4,
			name: "Gugu Barcelos",
			slug: "gugu-barcelos",
			points: 2000,
		},
		{
			id: "5",
			rank: 5,
			name: "Fábio Henrique",
			slug: "fabio-henrique",
			points: 1682,
		},
		{
			id: "6",
			rank: 6,
			name: "Marcelo Muniz",
			slug: "marcelo-muniz",
			points: 1460,
		},
		{
			id: "7",
			rank: 7,
			name: "Rafael dorileo",
			slug: "rafael-dorileo",
			points: 1280,
		},
		{
			id: "8",
			rank: 8,
			name: "Vagner Gouveia",
			slug: "vagner-gouveia",
			points: 670,
		},
		{ id: "9", rank: 9, name: "José Otávio", slug: "jose-otavio", points: 670 },
		{
			id: "10",
			rank: 10,
			name: "Sérgio castanheira",
			slug: "sergio-castanheira",
			points: 610,
		},
		{
			id: "11",
			rank: 11,
			name: "Gabriel Zacaro",
			slug: "gabriel-zacaro",
			points: 555,
		},
		{
			id: "12",
			rank: 12,
			name: "Alexandre ramos",
			slug: "alexandre-ramos",
			points: 555,
		},
	],
	Master: [
		{
			id: "1",
			rank: 1,
			name: "Joaquim Carvalho",
			slug: "joaquim-carvalho",
			points: 2260,
		},
		{
			id: "2",
			rank: 2,
			name: "Andre Paiva",
			slug: "andre-paiva",
			points: 2030,
		},
		{
			id: "3",
			rank: 3,
			name: "Paulo Victor",
			slug: "paulo-victor",
			points: 1888,
		},
		{
			id: "4",
			rank: 4,
			name: "Diogo tabuada",
			slug: "diogo-tabuada",
			points: 1840,
		},
		{
			id: "5",
			rank: 5,
			name: "Dennys rosa",
			slug: "dennys-rosa",
			points: 1595,
		},
		{
			id: "6",
			rank: 6,
			name: "Felipe Colombo",
			slug: "felipe-colombo",
			points: 1555,
		},
		{
			id: "7",
			rank: 7,
			name: "Cristiano Freitas",
			slug: "cristiano-freitas",
			points: 1522,
		},
		{
			id: "8",
			rank: 8,
			name: "Erisberto abrantes",
			slug: "erisberto-abrantes",
			points: 1500,
		},
		{
			id: "9",
			rank: 9,
			name: "Antônio japa",
			slug: "antonio-japa",
			points: 1467,
		},
		{
			id: "10",
			rank: 10,
			name: "Gugu Barcelos",
			slug: "gugu-barcelos",
			points: 1400,
		},
		{
			id: "11",
			rank: 11,
			name: "Erick poiseidon",
			slug: "erick-poiseidon",
			points: 1335,
		},
		{
			id: "12",
			rank: 12,
			name: "Franklin Carlos",
			slug: "franklin-carlos",
			points: 1055,
		},
	],
	"Sub-18-Masc": [
		{
			id: "1",
			rank: 1,
			name: "Leonardo da Silva",
			slug: "leonardo-da-silva",
			points: 1590,
		},
		{
			id: "2",
			rank: 2,
			name: "Lucas Figueiredo",
			slug: "lucas-figueiredo",
			points: 1555,
		},
		{
			id: "3",
			rank: 3,
			name: "João Gabriel",
			slug: "joao-gabriel",
			points: 1280,
		},
		{ id: "4", rank: 4, name: "Luiz breno", slug: "luiz-breno", points: 1110 },
		{
			id: "5",
			rank: 5,
			name: "Alisson Silva",
			slug: "alisson-silva",
			points: 1055,
		},
		{
			id: "6",
			rank: 6,
			name: "Matheus Figueiredo",
			slug: "matheus-figueiredo",
			points: 1000,
		},
		{
			id: "7",
			rank: 7,
			name: "Abel Ribeiro",
			slug: "abel-ribeiro",
			points: 1000,
		},
		{
			id: "8",
			rank: 8,
			name: "Alberto Jasmin",
			slug: "alberto-jasmin",
			points: 860,
		},
		{
			id: "9",
			rank: 9,
			name: "Guilherme Araújo",
			slug: "guilherme-araujo",
			points: 730,
		},
		{
			id: "10",
			rank: 10,
			name: "Luan azeredo",
			slug: "luan-azeredo",
			points: 670,
		},
		{
			id: "11",
			rank: 11,
			name: "Daniel Silva",
			slug: "daniel-silva",
			points: 610,
		},
		{
			id: "12",
			rank: 12,
			name: "Adenilson Santos",
			slug: "adenilson-santos",
			points: 610,
		},
	],
	"Sub-15-Masc": [
		{
			id: "1",
			rank: 1,
			name: "Arthur Silva",
			slug: "arthur-silva",
			points: 1730,
		},
		{
			id: "2",
			rank: 2,
			name: "Matheus Figueiredo",
			slug: "matheus-figueiredo",
			points: 1590,
		},
		{
			id: "3",
			rank: 3,
			name: "Noah Ribeiro",
			slug: "noah-ribeiro",
			points: 1500,
		},
		{
			id: "4",
			rank: 4,
			name: "Davi Carvalho",
			slug: "davi-carvalho",
			points: 1360,
		},
		{
			id: "5",
			rank: 5,
			name: "Guilherme Almeida",
			slug: "guilherme-almeida",
			points: 1170,
		},
		{
			id: "6",
			rank: 6,
			name: "Lucas avelar",
			slug: "lucas-avelar",
			points: 1135,
		},
		{
			id: "7",
			rank: 7,
			name: "Arthur Carvalho",
			slug: "arthur-carvalho",
			points: 1132,
		},
		{
			id: "8",
			rank: 8,
			name: "Caio Henrique",
			slug: "caio-henrique",
			points: 1098,
		},
		{
			id: "9",
			rank: 9,
			name: "Rafael lorenzo",
			slug: "rafael-lorenzo",
			points: 913,
		},
		{
			id: "10",
			rank: 10,
			name: "Ryan Suricato",
			slug: "ryan-suricato",
			points: 912,
		},
		{
			id: "11",
			rank: 11,
			name: "Cauã Guedes",
			slug: "caua-guedes",
			points: 912,
		},
		{ id: "12", rank: 12, name: "Leyr neto", slug: "leyr-neto", points: 830 },
	],
	"Sub-15-Fem": [
		{
			id: "1",
			rank: 1,
			name: "Sophia Vargas",
			slug: "sophia-vargas",
			points: 2000,
		},
		{
			id: "2",
			rank: 2,
			name: "Larissa Brandão",
			slug: "larissa-brandao",
			points: 1470,
		},
		{
			id: "3",
			rank: 3,
			name: "Alyne Moreira",
			slug: "alyne-moreira",
			points: 1460,
		},
		{
			id: "4",
			rank: 4,
			name: "Aline Fonseca",
			slug: "aline-fonseca",
			points: 1220,
		},
		{
			id: "5",
			rank: 5,
			name: "Yone Fernandes",
			slug: "yone-fernandes",
			points: 1000,
		},
		{
			id: "6",
			rank: 6,
			name: "Sofia Gonçalves",
			slug: "sofia-goncalves",
			points: 860,
		},
		{
			id: "7",
			rank: 7,
			name: "Micaelly Oliveira",
			slug: "micaelly-oliveira",
			points: 860,
		},
		{ id: "8", rank: 8, name: "Emily Alves", slug: "emily-alves", points: 670 },
	],
	"Sub-12-Masc": [
		{
			id: "1",
			rank: 1,
			name: "Henrique glaglionele",
			slug: "henrique-glaglionele",
			points: 1860,
		},
		{
			id: "2",
			rank: 2,
			name: "Nyas chalfun",
			slug: "nyas-chalfun",
			points: 1730,
		},
		{
			id: "3",
			rank: 3,
			name: "Davi Martins",
			slug: "davi-martins",
			points: 1400,
		},
		{
			id: "4",
			rank: 4,
			name: "Rafael Silva",
			slug: "rafael-silva",
			points: 860,
		},
		{ id: "5", rank: 5, name: "Vitinho", slug: "vitinho", points: 670 },
		{
			id: "6",
			rank: 6,
			name: "Lucas Coelho",
			slug: "lucas-coelho",
			points: 610,
		},
		{
			id: "7",
			rank: 7,
			name: "Guilherme perre",
			slug: "guilherme-perre",
			points: 610,
		},
	],
};

const athletes: Athlete[] = [];

for (const categoryName in rankings) {
	if (Object.hasOwn(rankings, categoryName)) {
		const athletesData = rankings[categoryName as keyof Rankings];

		athletesData.forEach((athleteInfo) => {
			// check if the athlete already exists in athletes
			const athleteExists = athletes.find(
				(athlete) => athlete.slug === athleteInfo.slug,
			);
			// if exists, update the athlete with the new category
			if (athleteExists) {
				athleteExists.categories.push({
					name: categoryName,
					points: athleteInfo.points,
					rank: athleteInfo.rank,
				});
				athleteExists.points += athleteInfo.points;
				return;
			}

			const athlete: Athlete = {
				id: athleteInfo.id,
				name: athleteInfo.name,
				slug: athleteInfo.slug,
				rank: athleteInfo.rank,
				category: categoryName as Athlete["category"], // Type assertion for category
				categories: [
					{
						name: categoryName,
						points: athleteInfo.points,
						rank: athleteInfo.rank,
					},
				],
				points: athleteInfo.points,
				country: "Brasil",
				countryCode: "br",
				photo: "/bb-lagos-logo.png",
				stats: {
					events: 0,
					wins: 0,
					podiums: 0,
					top10s: 0,
				},
				photos: [],
				videos: [],
			};
			athletes.push(athlete);
		});
	}
}
export default athletes;

export type Event = {
	id: string;
	name: string;
	date: string;
	location: string;
	poster: string;
	"data-ai-hint"?: string;
	highlights: string;
	results: string;
	slug: string;
};

const events: Event[] = [
	{
		id: "1",
		name: "Saquarema",
		slug: "saquarema",
		date: "2025-02-08",
		location: "Praia da Vila - Saquarema",
		poster: "/etapa-01-2025.jpg",
		highlights:
			"Massive waves and incredible barrel rides from the world's best.",
		results:
			"1st: Pierre-Louis Costes, 2nd: Tristan Roberts, 3rd: Tanner McDaniel",
	},
	{
		id: "2",
		name: "Arraial do Cabo",
		slug: "arraial-do-cabo",
		date: "2025-03-30",
		location: "Praia Brava - Arraial do Cabo",
		poster: "/etapa-02-2025.jpg",
		highlights: "High-performance surfing in challenging conditions.",
		results: "1st: Alan Muñoz, 2nd: Amaury Lavernhe, 3rd: Iain Campbell",
	},
	{
		id: "3",
		name: "Rio das Ostras",
		slug: "rio-das-ostras",
		date: "2025-05-24",
		location: "Praia de Costa Azul - Rio das Ostras",
		poster: "/etapa-03-2025.jpg",
		highlights: "Explosive aerial maneuvers and deep tube rides.",
		results: "1st: Dudu Pedra, 2nd: Uri Valadão, 3rd: Socrates Santana",
	},
	{
		id: "4",
		name: "Araruama",
		slug: "araruama",
		date: "2025-06-15",
		location: "Praia Seca - Araruama",
		poster: "/etapa-04-2025.jpg",
		highlights: "A showcase of power surfing in a beautiful location.",
		results: "1st: Tristan Roberts, 2nd: Jared Houston, 3rd: Mark McCarthy",
	},
	{
		id: "5",
		name: "Cabo Frio",
		slug: "cabo-frio",
		date: "2025-07-09",
		location: "Peró - Cabo Frio",
		poster: "/etapa-05-2025.jpg",
		highlights: "A showcase of power surfing in a beautiful location.",
		results: "1st: Tristan Roberts, 2nd: Jared Houston, 3rd: Mark McCarthy",
	},
	{
		id: "6",
		name: "Macaé",
		slug: "macae",
		date: "2025-08-28",
		location: "Macaé",
		poster: "/bb-lagos-logo.png",
		highlights: "A showcase of power surfing in a beautiful location.",
		results: "1st: Tristan Roberts, 2nd: Jared Houston, 3rd: Mark McCarthy",
	},
	{
		id: "7",
		name: "Búzios",
		slug: "buzios",
		date: "2025-10-18",
		location: "Tucuns - Búzios",
		poster: "/etapa-07-2025.jpg",
		highlights: "A showcase of power surfing in a beautiful location.",
		results: "1st: Tristan Roberts, 2nd: Jared Houston, 3rd: Mark McCarthy",
	},
];

export type Media = {
	id: string;
	type: "photo" | "video";
	title: string;
	event: string;
	thumbnail: string;
};

const media: Media[] = [
	{
		id: "1",
		type: "photo",
		title: "Fronton King Gallery",
		event: "Fronton King",
		thumbnail: "https://placehold.co/600x400/png",
	},
	{
		id: "2",
		type: "video",
		title: "Fronton King Highlights",
		event: "Fronton King",
		thumbnail: "https://placehold.co/600x400/png",
	},
	{
		id: "3",
		type: "photo",
		title: "Arica Cultura Gallery",
		event: "Arica Cultura Bodyboard",
		thumbnail: "https://placehold.co/600x400/png",
	},
	{
		id: "4",
		type: "video",
		title: "Arica Cultura Highlights",
		event: "Arica Cultura Bodyboard",
		thumbnail: "https://placehold.co/600x400/png",
	},
	{
		id: "5",
		type: "photo",
		title: "Itacoatiara Pro Shots",
		event: "Itacoatiara Pro",
		thumbnail: "https://placehold.co/600x400/png",
	},
	{
		id: "6",
		type: "video",
		title: "Itacoatiara Pro Action",
		event: "Itacoatiara Pro",
		thumbnail: "https://placehold.co/600x400/png",
	},
];

// export const getAthlete = (id: string) => athletes.find(a => a.id === id);
export const getEvent = (id: string) => events.find((e) => e.id === id);

export { athletes, events, media };
