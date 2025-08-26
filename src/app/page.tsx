"use client";
import { useData } from '@/context/data-context';
import { FirstHero } from './(home)/first-hero';
import { HomeEvents } from './(home)/home-events';
import { HomeAtletas } from './(home)/home-atletas';
import { HomeMedias } from './(home)/home-medias';
import { HomeInstagram } from './(home)/home-instagram';
import { useSidebar } from '@/components/ui/sidebar';

export default function Home() {
  const { events } = useData();
  const { state, isMobile } = useSidebar()

  return (
    <div className={`space-y-12 px-4 mx-auto ${isMobile ? 'w-full' : state === 'expanded' ? 'w-[min(calc(100%-14.5rem),72rem)]' : 'max-w-6xl'}`}>
      <FirstHero />
      <HomeEvents events={events} />
      <HomeAtletas />
      <HomeMedias />
      <HomeInstagram />
    </div>
  );
}
