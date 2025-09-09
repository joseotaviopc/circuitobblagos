"use client"
import InstagramGrid from "@/components/instagram-grid";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useInstagramImages } from "@/context/instagram-context";

export default function FotosPage() {
	const { instagramData, loadingInstagram } = useInstagramImages();

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
			{loadingInstagram && <div className="w-full py-10 justify-center"><LoadingSpinner /></div>}
			{instagramData && !loadingInstagram && <InstagramGrid instagramData={instagramData} />}
			{!instagramData && !loadingInstagram && <div className="w-full py-10 justify-center"><p>Não há dados para exibir</p></div>}
		</div>
	);
}
