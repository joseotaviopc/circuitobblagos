import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HistoriaPage() {
	return (
		<div className="space-y-8">
			<header>
				<h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight leading-tight">
					Nossa História
				</h1>
				<p className="mt-2 text-base md:text-lg text-muted-foreground">
					A jornada da BBLagos e o crescimento do bodyboard na região.
				</p>
			</header>

			<Card>
				<CardHeader>
					<CardTitle className="text-xl md:text-2xl font-headline">
						As Origens
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 text-sm md:text-base">
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-4">
						<div className="relative w-full sm:w-1/2 md:w-1/3 aspect-video rounded-lg overflow-hidden shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
							<Image
								src="/historia-bb-lagos-2005.jpg"
								alt="Bodyboarder in action"
								fill
								className="object-cover"
								data-ai-hint="bodyboarder in action"
							/>
						</div>
						<div className="relative w-full sm:w-1/2 md:w-1/3 aspect-video rounded-lg overflow-hidden shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
							<Image
								src="/historia-bb-lagos-atletas.jpg"
								alt="Bodyboarders on the beach"
								fill
								className="object-cover"
								data-ai-hint="bodyboarders on the beach"
							/>
						</div>
					</div>
					<p>
						O Circuito BB Lagos nasceu em 2005, criado e organizado por Gabriel,
						em sua primeira gestão. Durante 5 anos, o campeonato se firmou como
						referência, escolhendo sempre as melhores praias da Região dos Lagos
						para sediar as etapas, proporcionando condições de ondas
						desafiadoras e de alta performance para os atletas.
					</p>
					<p>
						Em 2023, o circuito foi retomado por Ramon Valuche, mantendo a
						essência original e trazendo ainda mais estrutura e visibilidade
						para o bodyboard. Já no segundo ano dessa nova fase, o circuito
						passou a contar com 5 etapas anuais, incluindo a famosa Praia Brava
						de Arraial do Cabo, reconhecida como a mais desafiadora da região.
					</p>
					<p>
						Em 2025, o Circuito BB Lagos deu um salto ainda maior, com 6 etapas
						no calendário. Já realizamos etapas em Arraial do Cabo, Saquarema,
						Rio das Ostras, Praia Seca e Cabo Frio. As próximas serão em Búzios
						e Macaé. E para 2026, já está prevista a estreia de Ponta Negra
						entre as sedes.
					</p>

					<p className="text-right text-sm">
						Fonte:{" "}
						<Link
							className="text-primary"
							href={
								"https://www.waves.com.br/arquivo/fred-vercosa-vence-bblagos/"
							}
						>
							Waves
						</Link>
					</p>

					<h4 className="text-lg font-semibold font-headline mt-4">
						Categorias oficiais
					</h4>
					<p>
						O Circuito BB Lagos é inclusivo e abrange todas as gerações do
						bodyboard, com disputas para todas as idades e níveis:
					</p>
					<ul className="list-disc list-inside space-y-1">
						<li>Sub-12</li>
						<li>Sub-15</li>
						<li>Sub-18</li>
						<li>Sub-15 Feminino</li>
						<li>Pro Open Masculino</li>
						<li>Pro Open Feminino</li>
						<li>Master</li>
						<li>Legend</li>
					</ul>
					<h4 className="text-lg font-semibold font-headline mt-4">
						Transparência e emoção
					</h4>
					<p>
						Todos os campeonatos do Circuito BB Lagos são realizados com um
						sistema de notas em tempo real, que garante transparência para
						atletas e público. O competidor sabe, na hora, a nota que recebeu em
						cada onda, quanto precisa para avançar e se está liderando a
						bateria. Essa dinâmica traz ainda mais emoção para quem assiste e
						credibilidade para o campeonato.
					</p>
					<h4 className="text-lg font-semibold font-headline mt-4">
						Excelência técnica
					</h4>
					<p>
						Hoje, o Circuito BB Lagos conta com o melhor quadro de juízes do
						Brasil, entregando avaliações justas e de alto nível. Essa busca
						pela excelência faz parte do DNA do circuito desde sua criação,
						elevando o padrão do bodyboard no estado e no país.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
