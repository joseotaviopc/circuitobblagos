"use client";
import { Instagram } from 'lucide-react';
import { useData } from '@/context/data-context';
import ResponsiveInsta from '@/components/instagram';
import { FirstHero } from './(home)/first-hero';
import { HomeEvents } from './(home)/home-events';
import { HomeAtletas } from './(home)/home-atletas';
import { HomeMedias } from './(home)/home-medias';
import { HomeInstagram } from './(home)/home-instagram';

export default function Home() {
  const { events, atletas } = useData();

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <FirstHero />
      <HomeEvents events={events} />
      <HomeAtletas />
      <HomeMedias />
      <HomeInstagram />
    </div>
  );
}
