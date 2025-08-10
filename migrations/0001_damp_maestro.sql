ALTER TABLE `foo` RENAME TO `atletas`;--> statement-breakpoint
ALTER TABLE `atletas` RENAME COLUMN "bar" TO "id";--> statement-breakpoint
CREATE TABLE `eventos` (
	`id` text PRIMARY KEY NOT NULL,
	`nome` text NOT NULL,
	`local` text,
	`data` text,
	`cartaz_url` text,
	`fotos` text,
	`videos` text,
	`resultados` text
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_atletas` (
	`id` text PRIMARY KEY NOT NULL,
	`nome` text NOT NULL,
	`nascimento` text,
	`estado` text,
	`profile_url` text,
	`social_links` text,
	`fotos` text,
	`videos` text,
	`estatisticas` text
);
--> statement-breakpoint
INSERT INTO `__new_atletas`("id", "nome", "nascimento", "estado", "profile_url", "social_links", "fotos", "videos", "estatisticas") SELECT "id", "nome", "nascimento", "estado", "profile_url", "social_links", "fotos", "videos", "estatisticas" FROM `atletas`;--> statement-breakpoint
DROP TABLE `atletas`;--> statement-breakpoint
ALTER TABLE `__new_atletas` RENAME TO `atletas`;--> statement-breakpoint
PRAGMA foreign_keys=ON;