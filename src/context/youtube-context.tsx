"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export interface YouTubeVideo {
	id: {
		videoId: string;
		kind: string;
	};
	snippet: {
		title: string;
		description: string;
		thumbnails: {
			medium: {
				url: string;
				width: number;
				height: number;
			};
			high: {
				url: string;
				width: number;
				height: number;
			};
		};
		publishedAt: string;
		channelTitle: string;
	};
}

interface YouTubeResponse {
	items: YouTubeVideo[];
}

interface YouTubeContextType {
	videos: YouTubeVideo[];
	loadingVideos: boolean;
	fetchVideos: (maxResults?: number) => Promise<YouTubeVideo[] | null>;
}

const YouTubeContext = createContext<YouTubeContextType | undefined>(undefined);

export function YouTubeProvider({ children }: { children: ReactNode }) {
	const [videos, setVideos] = useState<YouTubeVideo[]>([]);
	const [loadingVideos, setLoadingVideos] = useState(false);

	const fetchVideos = async (maxResults: number = 12) => {
		setLoadingVideos(true);
		try {
			const response = await fetch(`/api/youtube-videos?maxResults=${maxResults}`);
			if (response.ok) {
				const data = await response.json();
				const videoData = data.videos || [];
				setVideos(videoData);
				return videoData;
			}
			return null;
		} catch (error) {
			console.error("Error fetching YouTube videos:", error);
			return null;
		} finally {
			setLoadingVideos(false);
		}
	};

	useEffect(() => {
		fetchVideos(12);
	}, []);

	return (
		<YouTubeContext.Provider
			value={{ videos, loadingVideos, fetchVideos }}
		>
			{children}
		</YouTubeContext.Provider>
	);
}

export function useYouTube() {
	const context = useContext(YouTubeContext);
	if (context === undefined) {
		throw new Error("useYouTube must be used within a YouTubeProvider");
	}
	return context;
}
