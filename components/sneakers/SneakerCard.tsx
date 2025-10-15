"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, CheckCircle } from "lucide-react";
import Link from "next/link";
import type { Sneaker } from "@/types";

interface SneakerCardProps {
  sneaker: Sneaker;
  showBuyButton?: boolean;
  showCondition?: boolean;
  verified?: boolean;
}

export function SneakerCard({ 
  sneaker, 
  showBuyButton = true,
  showCondition = false,
  verified = false 
}: SneakerCardProps) {
  const hasDiscount = sneaker.originalPrice && parseFloat(sneaker.originalPrice) > parseFloat(sneaker.price);
  const discountPercent = hasDiscount 
    ? Math.round(((parseFloat(sneaker.originalPrice!) - parseFloat(sneaker.price)) / parseFloat(sneaker.originalPrice!)) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden transition-all duration-300 flex flex-col relative bg-card border border-border">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/20 to-muted/50">
        <Link href={`/product/${sneaker.id}`} data-testid={`link-product-${sneaker.id}`} className="block h-full">
          <img
            src={sneaker.image}
            alt={sneaker.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            data-testid={`img-sneaker-${sneaker.id}`}
          />
        </Link>
        
        {/* Verified Badge */}
        {verified && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <Badge className="bg-primary text-black gap-1 font-medium">
              <CheckCircle className="h-3 w-3" />
              Verified
            </Badge>
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 z-10 pointer-events-none">
            <Badge variant="destructive" className="font-bold bg-red-600 text-white">
              {discountPercent}% OFF
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex-1 bg-card">
        <Link href={`/product/${sneaker.id}`} className="block">
          {/* Brand */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {sneaker.brand}
            </p>
            <h3 className="text-base font-semibold mt-1 line-clamp-2 text-foreground" data-testid={`text-name-${sneaker.id}`}>
              {sneaker.name}
            </h3>
            {showCondition && sneaker.condition && (
              <p className="text-sm text-muted-foreground mt-1">
                {sneaker.condition}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-xl font-bold text-foreground" data-testid={`text-price-${sneaker.id}`}>
              ₹{parseFloat(sneaker.price).toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{parseFloat(sneaker.originalPrice!).toLocaleString()}
              </span>
            )}
          </div>
        </Link>

        {/* Buy Button */}
        {showBuyButton && (
          <Button 
            asChild
            className="w-full bg-primary text-black hover:bg-primary/90 font-semibold mt-4 rounded-sm"
            data-testid={`button-buy-${sneaker.id}`}
          >
            <Link href="/store">Mint as NFT</Link>
          </Button>
        )}
      </div>
    </Card>
  );
}
