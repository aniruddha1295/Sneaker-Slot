"use client"

import { SneakerCard } from "@/components/sneakers/SneakerCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { Sneaker } from "@/types";

interface TrendingSectionProps {
  sneakers: Sneaker[];
}

export function TrendingSection({ sneakers }: TrendingSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Most Trending</h2>
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              data-testid="button-trending-prev"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              data-testid="button-trending-next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {sneakers.map((sneaker) => (
            <Card 
              key={sneaker.id}
              className="flex-none w-80 snap-start overflow-hidden transition-all duration-300 group bg-card border border-border"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted/20 to-muted/50">
                <img
                  src={sneaker.image}
                  alt={sneaker.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  data-testid={`img-trending-${sneaker.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1" data-testid={`text-trending-name-${sneaker.id}`}>
                    {sneaker.name}
                  </h3>
                  <p className="text-sm opacity-90 mb-3">{sneaker.brand}</p>
                  <Button 
                    asChild
                    className="w-full bg-primary text-black hover:bg-primary/90 font-semibold rounded-sm"
                    data-testid={`button-trending-buy-${sneaker.id}`}
                  >
                    <a href="/store">
                      Mint as NFT
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
