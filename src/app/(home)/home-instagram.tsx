"use client";
import { Instagram } from "lucide-react";
import { useInstagram } from "@/context/instagram-context";
import InstagramGrid from "@/components/instagram-grid";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function HomeInstagram() {
  const { instagramData, loadingInstagram } = useInstagram();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold font-headline flex items-center gap-2">
        <Instagram className="text-primary" />
        Siga-nos no Instagram
      </h2>
      {loadingInstagram && <div className="w-full py-10 justify-center"><LoadingSpinner /></div>}
      {instagramData && !loadingInstagram && <InstagramGrid instagramData={instagramData.slice(0, 12)} />}
      {!instagramData && !loadingInstagram && <div className="w-full py-10 justify-center"><p>Não há dados para exibir</p></div>}
    </section>
  );
}
