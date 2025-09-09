"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface Owner {
	id: string;
	username: string;
	profile_picture_url: string;
}

interface Insights {
	name: string;
	period: string;
	values: { value: number }[];
	title: string;
	description: string;
	id: string;
}

interface Collaborators {
	id: string;
	username: string;
}

export interface InstagramData {
	id: string;
	caption: string;
	media_type: string;
	media_url: string;
	thumbnail_url: string;
	permalink: string;
	timestamp: string;
	username: string;
	like_count: number;
	comments_count: number;
	children: { data: { id: string; media_url: string; media_type: string }[] };
	owner: Owner;
	collaborators: { data: Collaborators[] };
	insights: { data: Insights[] };
}

interface InstagramResponse {
	data: InstagramData[];
}

interface InstagramContextType {
	instagramData: InstagramData[];
	loadingInstagram: boolean;
	fetchInstagramData: () => Promise<InstagramResponse | null>;
}

const InstagramContext = createContext<InstagramContextType | undefined>(undefined);

export function InstagramProvider({ children }: { children: ReactNode }) {
	const [instagramData, setInstagramData] = useState<InstagramData[]>([]);
	const [loadingInstagram, setLoadingInstagram] = useState(false);

	const fetchInstagramData = async () => {
		setLoadingInstagram(true);
		try {
			const response = await fetch("/api/instagram");
			const responseJson = (await response.json()) as InstagramResponse;

			setInstagramData(responseJson.data);
			return responseJson;
		} catch (error) {
			console.error("Error fetching Instagram data:", error);
			return null;
		} finally {
			setLoadingInstagram(false);
		}
	};

	useEffect(() => {
		fetchInstagramData();
	}, []);

	return (
		<InstagramContext.Provider
			value={{ instagramData, loadingInstagram, fetchInstagramData }}
		>
			{children}
		</InstagramContext.Provider>
	);
}

export function useInstagram() {
	const context = useContext(InstagramContext);
	if (context === undefined) {
		throw new Error("useInstagram must be used within an InstagramProvider");
	}
	return context;
}

// Helper hooks for filtered data
export function useInstagramImages() {
	const { instagramData, loadingInstagram, fetchInstagramData } = useInstagram();
	
	const imageData = instagramData.filter(
		(item) =>
			item.media_type === "IMAGE" ||
			item.media_type === "CAROUSEL_ALBUM",
	);

	return {
		instagramData: imageData,
		loadingInstagram,
		fetchInstagramData,
	};
}

export function useInstagramVideos() {
	const { instagramData, loadingInstagram, fetchInstagramData } = useInstagram();
	
	const videoData = instagramData.filter((item) => item.media_type === "VIDEO");

	return {
		instagramData: videoData,
		loadingInstagram,
		fetchInstagramData,
	};
}
