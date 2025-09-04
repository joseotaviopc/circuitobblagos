"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// 🔹 Componente que mostra thumbnail HD e abre vídeo em modal quando clicado
export function VideoCard({ videoId, title }: { videoId: string; title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="aspect-video relative cursor-pointer group">
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover rounded-xl shadow group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors rounded-xl">
            <div className="text-white text-4xl group-hover:scale-110 transition-transform duration-200">
              ▶
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl w-[95vw] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-left">{title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full px-6 pb-6">
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}