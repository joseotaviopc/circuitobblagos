import { GalleryHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { media } from "@/lib/data";

export default function FotosPage() {
	const photos = media.filter((m) => m.type === "photo");

	return (
		<div className="space-y-8">
			<header>
				<h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight leading-tight">
					Fotos
				</h1>
				<p className="mt-2 text-base md:text-lg text-muted-foreground">
					Acompanhe toda a ação com galerias de fotos dos eventos recentes.
				</p>
			</header>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{photos.map((item) => (
					<Card key={item.id} className="group overflow-hidden">
						<CardHeader className="p-0">
							<div className="aspect-video relative">
								<Image
									src={item.thumbnail}
									alt={item.title}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-300"
									data-ai-hint="surfing photo"
								/>
							</div>
						</CardHeader>
						<CardContent className="p-4">
							<h2 className="font-bold font-headline truncate">{item.title}</h2>
							<p className="text-sm text-muted-foreground truncate">
								{item.event}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
