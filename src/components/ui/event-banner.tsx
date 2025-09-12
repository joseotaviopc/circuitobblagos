"use client";

import { useState } from "react";
import { X, Utensils, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

export function EventBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-0 lg:top-20 z-30 w-full bg-gradient-to-r from-primary/90 to-primary/80 backdrop-blur-sm border-b border-primary/20"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-white" />
                <Utensils className="h-5 w-5 text-white" />
              </div>
              <div className="text-white">
                <p className="text-sm md:text-base font-medium">
                  Hospedagem e alimentação para o evento
                </p>
                <p className="text-xs md:text-sm text-white/80">
                  Saiba mais sobre nossos pacotes especiais
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Saiba mais
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => setIsVisible(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
