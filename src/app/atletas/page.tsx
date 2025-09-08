"use client";

import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useData } from "@/context/data-context";

export default function Atletas() {
	const { atletas, loadingData } = useData();

    const atletasOrdenados = atletas.sort((a, b) => a.nome.localeCompare(b.nome));

	if (loadingData) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<h1>Atletas</h1>
			<DataTable data={atletasOrdenados} columns={columns} />
			{/* <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Categoria (s)</TableHead>
                        <TableHead className="text-right">Eventos</TableHead>
                        <TableHead className="text-right">Resultados</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {atletasOrdenados.map((athlete, ind) => (
                        <TableRow key={ind+athlete.name}>
                            <TableCell>{athlete.name}</TableCell>
                            <TableCell>
                                {Array.from(new Set(athlete.results.map(result => result.categoria))).join(', ')}
                            </TableCell>
                            <TableCell className="text-right">{Array.from(new Set(athlete.results.map(result => result.evento))).length}</TableCell>
                            <TableCell className="text-right">{athlete.results.map(result => result.posicao).join(', ')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> */}
		</div>
	);
}
