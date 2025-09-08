import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const apiToken = process.env.INSTAGRAM_API_TOKEN;

        if (!apiToken) {
            return NextResponse.json(
                { error: "YouTube API key não configurada" },
                { status: 500 }
            );
        }

        const ACCOUNT_ID = "17841461520299971";

        const instagramApiUrl = `https://graph.facebook.com/v23.0/${ACCOUNT_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username,like_count,comments_count,children{ id,media_type,media_url,thumbnail_url,permalink },owner{id,username,profile_picture_url},user_tags{username,profile,position},collaborators,insights.metric(views)&limit=48&access_token=${apiToken}`;

        const response = await fetch(instagramApiUrl);

        if (!response.ok) {
            throw new Error("Erro ao buscar dados do Instagram");
        }

        const responseJson = await response.json();
        return NextResponse.json(responseJson);
    } catch (error) {
        console.error("Erro na API de dados do Instagram:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor", data: [] },
            { status: 500 }
        );
    }
}