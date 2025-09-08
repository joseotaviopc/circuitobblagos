"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { useData } from "@/context/data-context";
import { FirstHero } from "./(home)/first-hero";
import { HomeAtletas } from "./(home)/home-atletas";
import { HomeEvents } from "./(home)/home-events";
import { HomeInstagram } from "./(home)/home-instagram";
import { HomeMedias } from "./(home)/home-medias";
import { NextEvent } from "./(home)/next-event";

export default function Home() {
  const { events } = useData();
  const { state, isMobile } = useSidebar();

  const eventsSorted = events
    ? events.sort((a, b) => {
        if (a.data && b.data) {
          return new Date(b.data).getTime() - new Date(a.data).getTime();
        }
        return 0;
      })
    : [];

  return (
    <>
      <NextEvent />
      <div
        className={`space-y-12 px-4 mx-auto ${isMobile ? "w-full" : state === "expanded" ? "w-[min(calc(100%-14.5rem),72rem)]" : "max-w-6xl"}`}
      >
        <FirstHero />
        <HomeEvents events={eventsSorted} />
        <HomeAtletas />
        <HomeMedias />
        <HomeInstagram />
      </div>
    </>
  );
}
