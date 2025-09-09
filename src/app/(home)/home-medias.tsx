"use client";
import { GalleryHorizontal } from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { VideoCard } from "@/app/videos/video-card";
import { useYouTube } from "@/context/youtube-context";

export function HomeMedias() {
	const { videos, loadingVideos } = useYouTube();

	if (loadingVideos) {
		return (
			<section className="space-y-6">
				<h2 className="text-2xl md:text-3xl font-bold font-headline flex items-center gap-2">
					<GalleryHorizontal className="text-primary" />
					Últimos Vídeos
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="aspect-video bg-muted rounded-xl animate-pulse" />
					))}
				</div>
			</section>
		);
	}

	return (
		<section className="space-y-6">
			<h2 className="text-2xl md:text-3xl font-bold font-headline flex items-center gap-2">
				<GalleryHorizontal className="text-primary" />
				Últimos Vídeos
			</h2>
			{videos.length > 0 ? (
				<Carousel opts={{ align: "start" }} className="w-full">
					<CarouselContent>
						{videos.slice(0, 6).map((video) => (
							<CarouselItem
								key={video.id.videoId}
								className="basis-full md:basis-1/2 lg:basis-1/3"
							>
								<div className="flex flex-col space-y-2">
									<VideoCard
										videoId={video.id.videoId}
										title={video.snippet.title}
									/>
									<h3 className="text-sm font-medium line-clamp-2 px-1">
										{video.snippet.title}
									</h3>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			) : (
				<div className="text-center py-8 text-muted-foreground">
					<p>Não foi possível carregar os vídeos no momento.</p>
				</div>
			)}
		</section>
	);
}
