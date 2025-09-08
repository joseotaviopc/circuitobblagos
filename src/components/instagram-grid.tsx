import { InstagramData } from "@/hooks/useInstagram";
import { Card } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { ExternalLink, PlayCircle } from "lucide-react";

export default function InstagramGrid({
  instagramData,
}: {
  instagramData: InstagramData[];
}) {
  if (!instagramData) return null;

  if (!instagramData.length) return null;

  return (
    <div className="grid grid-cols-3 gap-4 ">
      {instagramData.map((item) => (
        <Card
          key={item.id}
          className="flex flex-col overflow-hidden hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center flex-1 aspect-[calc(640/1136)] ">
            {item.media_type === "VIDEO" && (
              <video className="w-full h-auto " src={item.media_url} controls />
            )}
            {item.media_type === "IMAGE" && (
              <img
                className="w-full h-auto "
                src={item.media_url}
                alt={item.caption.slice(0, 20)}
              />
            )}
            {item.media_type === "CAROUSEL_ALBUM" && (
              <Carousel className="w-full ">
                <CarouselContent className="ml-0">
                  {item.children.data.map((child) => (
                    <CarouselItem key={child.id} className="ml-0 px-0">
                      <img
                        src={child.media_url}
                        alt={"some text"}
                        className="w-full h-auto "
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            )}
          </div>
          <div className="flex flex-col justify-between p-2 gap-2">
            <div className="relative first-line:left-2">
              {item.media_type === "VIDEO" && (
                <PlayCircle
                  className="absolute top-0 left-0 text-primary"
                  size={18}
                />
              )}
              <p
                className={`text-sm line-clamp-3 ${item.media_type === "VIDEO" ? "indent-6" : ""}`}
              >
                {item.caption.slice(0, 200)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-500">
                {new Date(item.timestamp).toLocaleString("pt-BR", {
                  dateStyle: "short",
                })}
              </p>
              <a
                href={item.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary items-center flex gap-2"
              >
                Ver +<ExternalLink className="text-primary" size={18} />
              </a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
