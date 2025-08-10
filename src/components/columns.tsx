"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"

type Athlete = {
  name: string
  results: Array<{
    categoria: string
    evento: string
    posicao: string | number
  }>
}

export const columns: ColumnDef<Athlete>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => <div className="text-left">{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "categorias",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria(s)"/>
    ),
    cell: ({ row }) => {
      const categories = Array.from(
        new Set(row.original.results.map(result => result.categoria))
      ).join(', ')
      return <div>{categories}</div>
    },
    enableSorting: true,
  },
  {
    accessorKey: "eventos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Eventos" className="text-right" />
    ),
    cell: ({ row }) => {
      const eventCount = new Set(row.original.results.map(result => result.evento)).size
      return <div className="text-right">{eventCount}</div>
    },
    enableSorting: true,
  },
  {
    accessorKey: "resultados",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resultados" className="text-right" />
    ),
    cell: ({ row }) => {
      const results = row.original.results.map(result => result.posicao).join(', ')
      return <div className="text-right">{results}</div>
    },
    enableSorting: false,
  },
]
