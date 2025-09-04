import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const maxResults = searchParams.get("maxResults") || "12";
		
		const apiKey = process.env.YOUTUBE_API_KEY;
		const channelId = "UCeYjiIso6WdWbU_MAy_zDcQ";

		if (!apiKey) {
			return NextResponse.json(
				{ error: "YouTube API key não configurada" },
				{ status: 500 }
			);
		}

		const res = await fetch(
			`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`,
			{ cache: "no-store" }
		);

		if (!res.ok) {
			throw new Error("Erro ao buscar vídeos do YouTube");
		}

		const data = await res.json();
		const videos = data.items?.filter((v: any) => v.id.kind === "youtube#video") || [];

		return NextResponse.json({ videos });
	} catch (error) {
		console.error("Erro na API de vídeos do YouTube:", error);
		return NextResponse.json(
			{ error: "Erro interno do servidor", videos: [] },
			{ status: 500 }
		);
	}
}
