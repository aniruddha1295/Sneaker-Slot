"use client"

import { Card } from "@/components/ui/card";
import Link from "next/link";

interface PriceRange {
  id: string;
  label: string;
  maxPrice: string;
  image: string;
  bgGradient: string;
}

const priceRanges: PriceRange[] = [
  {
    id: "15k",
    label: "UNDER ₹15K",
    maxPrice: "15000",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80",
    bgGradient: "from-purple-600/90 to-purple-900/90",
  },
  {
    id: "20k",
    label: "UNDER ₹20K",
    maxPrice: "20000",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80",
    bgGradient: "from-teal-600/90 to-teal-900/90",
  },
  {
    id: "25k",
    label: "UNDER ₹25K",
    maxPrice: "25000",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
    bgGradient: "from-red-600/90 to-red-900/90",
  },
  {
    id: "50k",
    label: "UNDER ₹50K",
    maxPrice: "50000",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&q=80",
    bgGradient: "from-blue-600/90 to-blue-900/90",
  },
];

export function PriceRangeSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Shop by Price</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {priceRanges.map((range) => (
            <Link key={range.id} href={`/?maxPrice=${range.maxPrice}`} data-testid={`link-price-${range.id}`}>
              <Card className="group relative overflow-hidden aspect-[4/3] hover-elevate active-elevate-2 transition-all duration-300">
                {/* Background Image */}
                <img
                  src={range.image}
                  alt={range.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${range.bgGradient}`} />
                
                {/* Content */}
                <div className="relative h-full flex items-center justify-center p-6">
                  <h3 className="text-2xl md:text-3xl font-black text-white text-center tracking-tight">
                    {range.label}
                  </h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
