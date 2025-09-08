"use client"
import { useEffect, useState } from "react";

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

export default function useInstagram({
  onlyImage = false,
  onlyVideo = false,
}: {
  onlyImage?: boolean;
  onlyVideo?: boolean;
}) {
  const [instagramData, setInstagramData] = useState<InstagramData[]>([]);
  const [loadingInstagram, setLoadingInstagram] = useState(false);

  const fetchInstagramData = async () => {
    setLoadingInstagram(true);
    try {
      const response = await fetch("/api/instagram");
      const responseJson = (await response.json()) as InstagramResponse;

      if (onlyImage) {
        const filteredData = {
          ...responseJson,
          data: responseJson.data.filter(
            (item) =>
              item.media_type === "IMAGE" ||
              item.media_type === "CAROUSEL_ALBUM",
          ),
        };

        setInstagramData(filteredData.data);
        return filteredData;
      }

      if (onlyVideo) {
        const filteredData = {
          ...responseJson,
          data: responseJson.data.filter((item) => item.media_type === "VIDEO"),
        };

        setInstagramData(filteredData.data);
        return filteredData;
      }

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

  return {
    loadingInstagram,
    instagramData,
    fetchInstagramData,
  };
}
