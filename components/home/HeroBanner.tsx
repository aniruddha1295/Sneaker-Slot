"use client"

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  ctaLink: string;
}

const slides: HeroSlide[] = [
  {
    id: "1",
    title: "NEW ARRIVALS",
    subtitle: "EXCLUSIVE DROPS THIS WEEK",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1600&q=80",
    cta: "EXPLORE DROPS",
    ctaLink: "/drops",
  },
  {
    id: "2",
    title: "AUTHENTICATED RESALE",
    subtitle: "VERIFIED MARKETPLACE",
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=1600&q=80",
    cta: "BROWSE MARKET",
    ctaLink: "/marketplace",
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative h-[80vh] md:h-[90vh] overflow-hidden bg-background">
      {/* Slide Image with Dark Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover transition-opacity duration-700"
          data-testid={`img-hero-${slide.id}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col justify-center items-start">
        <div className="max-w-3xl animate-slide-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight leading-none">
            {slide.title}
          </h1>
          <p className="text-xl md:text-3xl font-semibold text-primary mb-8">
            {slide.subtitle}
          </p>
          <Button
            size="lg"
            className="bg-primary text-black hover:bg-primary/90 text-base font-bold px-8 py-3 rounded-sm"
            data-testid="button-hero-cta"
          >
            {slide.cta}
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
        onClick={prevSlide}
        data-testid="button-hero-prev"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
        onClick={nextSlide}
        data-testid="button-hero-next"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index 
                ? "w-8 bg-primary" 
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            data-testid={`button-indicator-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
