"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { AtletaResult } from "@/context/data-context"
import Link from "next/link"
import { slugify } from "@/lib/utils"
import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { Atleta } from "../../db/schema"

type Athlete = {
  name: string
  results: Array<{
    categoria: string
    evento: string
    posicao: string | number
  }>
}

export const columns: ColumnDef<Atleta>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => <Link href={`/atletas/${slugify(row.getValue("nome"))}`} className="text-left cursor-pointer">
      <div className="flex items-center gap-2">
        <Image src={row.original.profileUrl || 'https://placehold.co/400x400/png'} alt={row.original.nome} className="w-7 h-7 rounded-full" width={28} height={28} />
        {row.getValue("nome")} {row.original.estado && ` (${row.original.estado})`} 
        {row.original.isAffiliated === "true" && <CheckCircle className="ml-1 h-4 w-4 text-green-500 inline-block" />}
        <span className="text-xs text-muted-foreground">{[...new Set(row.original.resultados?.results.map(result => result.categoria))].join(', ')}</span>
      </div>
      </Link>,
    enableSorting: true,
    enableHiding: false,
  },
  // {
  //   accessorKey: "categorias",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Categoria(s)"/>
  //   ),
  //   cell: ({ row }) => {
  //     const categories = Array.from(
  //       new Set(row.original.results.map(result => result.categoria))
  //     ).join(', ')
  //     return <div>{categories}</div>
  //   },
  //   enableSorting: true,
  // },
  // {
  //   accessorKey: "eventos",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Eventos" className="text-right" />
  //   ),
  //   cell: ({ row }) => {
  //     const eventCount = new Set(row.original.results.map(result => result.evento)).size
  //     return <div className="text-right">{eventCount}</div>
  //   },
  //   enableSorting: true,
  // },
  // {
  //   accessorKey: "resultados",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Resultados" className="text-right" />
  //   ),
  //   cell: ({ row }) => {
  //     const results = row.original.results.map(result => result.posicao).join(', ')
  //     return <div className="text-right">{results}</div>
  //   },
  //   enableSorting: false,
  // },
]
