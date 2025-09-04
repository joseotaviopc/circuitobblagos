import { VideoCard } from "./video-card";

export default async function VideosPage() {
	const apiKey = process.env.YOUTUBE_API_KEY;
	const channelId = "UCeYjiIso6WdWbU_MAy_zDcQ";

	const res = await fetch(
		`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=12`,
		{ cache: "no-store" }
	);

	if (!res.ok) {
		throw new Error("Erro ao buscar vídeos do YouTube");
	}

	const data = await res.json();
	const videos = data.items || [];

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
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
				{videos
					.filter((v: any) => v.id.kind === "youtube#video") // ignora playlists/shorts
					.map((video: any) => (
						<div key={video.id.videoId} className="flex flex-col">
							<VideoCard
								videoId={video.id.videoId}
								title={video.snippet.title}
							/>
							<p className="mt-2 text-sm font-medium">{video.snippet.title}</p>
						</div>
					))}
			</div>
		</div>
	);
}
