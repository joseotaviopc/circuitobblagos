CREATE TABLE `feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`message` text NOT NULL,
	`created_at` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL
);
