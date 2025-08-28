import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
	return text
		.toString()
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]+/g, "")
		.replace(/--+/g, "-");
}

export function groupByCategory<T>(
	array: T[],
	key: keyof T,
): Record<string, T[]> {
	return array.reduce(
		(acc, item) => {
			const category = item[key];
			if (typeof category === "string" || typeof category === "number") {
				(acc[category] = acc[category] || []).push(item);
			}
			return acc;
		},
		{} as Record<string, T[]>,
	);
}
