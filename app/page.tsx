"use client";
import { HeroBanner } from "@/components/home/HeroBanner";
import { PriceRangeSection } from "@/components/home/PriceRangeSection";
import { TrendingSection } from "@/components/home/TrendingSection";
import { SneakerCard } from "@/components/sneakers/SneakerCard";
import { useQuery } from "@tanstack/react-query";
import type { Sneaker } from "@/types";
import { api } from "@/lib/api";

export default function Home() {
  const { data: sneakers = [], isLoading } = useQuery<Sneaker[]>({
    queryKey: ["sneakers"],
    queryFn: api.getSneakers,
  });

  const { data: trendingSneakers = [] } = useQuery<Sneaker[]>({
    queryKey: ["sneakers", "trending"],
    queryFn: api.getTrendingSneakers,
  });

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Price Range Section */}
      <PriceRangeSection />

      {/* Trending Section */}
      {trendingSneakers.length > 0 && (
        <TrendingSection sneakers={trendingSneakers} />
      )}

      {/* Featured Products */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Featured Sneakers</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sneakers.slice(0, 8).map((sneaker) => (
                <SneakerCard key={sneaker.id} sneaker={sneaker} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* You May Also Like */}
      <section className="py-12 md:py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">You May Also Like</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sneakers.slice(8, 12).map((sneaker) => (
              <SneakerCard key={sneaker.id} sneaker={sneaker} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
