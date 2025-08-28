import { Instagram } from "lucide-react";
import ResponsiveInsta from "@/components/instagram";

export function HomeInstagram() {
	return (
		<section className="space-y-6">
			<h2 className="text-2xl md:text-3xl font-bold font-headline flex items-center gap-2">
				<Instagram className="text-primary" />
				Siga-nos no Instagram
			</h2>
			<div className="rounded-lg shadow-sm overflow-hidden">
				<ResponsiveInsta />
			</div>
		</section>
	);
}
