"use client";
import { useData } from '@/context/data-context';
import { FirstHero } from './(home)/first-hero';
import { HomeEvents } from './(home)/home-events';
import { HomeAtletas } from './(home)/home-atletas';
import { HomeMedias } from './(home)/home-medias';
import { HomeInstagram } from './(home)/home-instagram';

export default function Home() {
  const { events } = useData();

  return (
    <div className="space-y-12 w-full px-4 mx-auto max-w-6xl">
      <FirstHero />
      <HomeEvents events={events} />
      <HomeAtletas />
      <HomeMedias />
      <HomeInstagram />
    </div>
  );
}
