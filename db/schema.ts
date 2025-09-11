import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const atletas = sqliteTable("atletas", {
  id: text("id").notNull().primaryKey(),
  nome: text("nome").notNull(),
  email: text("email"),
  telefone: text("telefone"),
  cpf: text("cpf"),
  nascimento: text("nascimento"),
  estado: text("estado"),
  profileUrl: text("profile_url"),
  actionUrl: text("action_url"),
  bio: text("bio"),
  isAffiliated: text("is_affiliated"),
  socialLinks: text("social_links", { mode: 'json' }).$type<string[]>(),
  fotos: text("fotos", { mode: 'json' }).$type<string[]>(),
  videos: text("videos", { mode: 'json' }).$type<string[]>(),
  resultados: text("resultados", { mode: 'json' }).$type<{ results: { evento: string, categoria: string, posicao: number, pontos: number }[] }>(),
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

export const messagesContact = sqliteTable("messages_contact", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
});

export type Event = typeof eventos.$inferSelect;
export type Result = typeof eventos.$inferSelect.resultados;
export type Atleta = typeof atletas.$inferSelect;
export type MessageContact = typeof messagesContact.$inferSelect;