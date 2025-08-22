import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const atletas = sqliteTable("atletas", {
  id: text("id").notNull().primaryKey(),
  nome: text("nome").notNull(),
  nascimento: text("nascimento"),
  estado: text("estado"),
  profileUrl: text("profile_url"),
  // For arrays and objects, we store them as a JSON string
  socialLinks: text("social_links", { mode: 'json' }).$type<string[]>(),
  fotos: text("fotos", { mode: 'json' }).$type<string[]>(),
  videos: text("videos", { mode: 'json' }).$type<string[]>(),
  resultados: text("resultados", { mode: 'json' }).$type<{ name: string, results: { evento: string, categoria: string, posicao: number, pontos: number }[] }>(),
  estatisticas: text("estatisticas", { mode: 'json' }).$type<{ eventos: number, vitorias: number, podios: number }>(),
});

export const eventos = sqliteTable("eventos", {
  id: text("id").notNull().primaryKey(),
  nome: text("nome").notNull(),
  local: text("local"),
  data: text("data"),
  cartazUrl: text("cartaz_url"),
  fotos: text("fotos", { mode: 'json' }).$type<string[]>(),
  videos: text("videos", { mode: 'json' }).$type<string[]>(),
  resultados: text("resultados", { mode: 'json' }).$type<{ categoria: string, atletaId: string, atleta: string, posicao: number, pontos: number }[]>(),
});

export type Event = typeof eventos.$inferSelect;
export type Result = typeof eventos.$inferSelect.resultados;
export type Atleta = typeof atletas.$inferSelect;