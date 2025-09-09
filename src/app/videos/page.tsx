"use client";
import { VideoCard } from "./video-card";
import { useYouTube } from "@/context/youtube-context";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function VideosPage() {
	const { videos, loadingVideos } = useYouTube();

	if (loadingVideos) {
		return (
			<div className="space-y-8">
				<header>
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight leading-tight">
						Vídeos
					</h1>
					<p className="mt-2 text-base md:text-lg text-muted-foreground">
						Assista aos melhores momentos em vídeo dos eventos recentes.
					</p>
				</header>
				<div className="w-full py-10 flex justify-center">
					<LoadingSpinner />
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<header>
				<h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight leading-tight">
					Vídeos
				</h1>
				<p className="mt-2 text-base md:text-lg text-muted-foreground">
					Assista aos melhores momentos em vídeo dos eventos recentes.
				</p>
			</header>
			{videos.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
					{videos
						.filter((v) => v.id.kind === "youtube#video") // ignora playlists/shorts
						.map((video) => (
							<div key={video.id.videoId} className="flex flex-col">
								<VideoCard
									videoId={video.id.videoId}
									title={video.snippet.title}
								/>
								<p className="mt-2 text-sm font-medium">{video.snippet.title}</p>
							</div>
						))}
				</div>
			) : (
				<div className="text-center py-8 text-muted-foreground">
					<p>Não foi possível carregar os vídeos no momento.</p>
				</div>
			)}
		</div>
	);
}
