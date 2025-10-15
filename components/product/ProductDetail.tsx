import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, Truck, Shield, CheckCircle, Minus, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import type { Sneaker } from "@/types";

interface ProductDetailProps {
  sneaker: Sneaker;
}

export function ProductDetail({ sneaker }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const images = sneaker.images.length > 0 ? sneaker.images : [sneaker.image];
  const hasDiscount = sneaker.originalPrice && parseFloat(sneaker.originalPrice) > parseFloat(sneaker.price);

  const sizes = ["6.5", "7.0", "7.5", "8.0", "8.5", "9.0", "9.5", "10.0", "10.5", "11.0", "11.5", "12.0", "12.5", "13.0"];

  const addToCartMutation = useMutation({
    mutationFn: async (item: { sneakerId: string; size: string; quantity: number; price: string }) => {
      return await apiRequest("POST", "/api/cart", item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to cart",
        description: `${sneaker.name} has been added to your cart.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const buyNowMutation = useMutation({
    mutationFn: async (item: { sneakerId: string; size: string; quantity: number; price: string }) => {
      return await apiRequest("POST", "/api/cart", item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      router.push("/cart");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Select a size",
        description: "Please select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    addToCartMutation.mutate({
      sneakerId: sneaker.id,
      size: selectedSize,
      quantity,
      price: sneaker.price,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({
        title: "Select a size",
        description: "Please select a size before purchasing.",
        variant: "destructive",
      });
      return;
    }

    buyNowMutation.mutate({
      sneakerId: sneaker.id,
      size: selectedSize,
      quantity,
      price: sneaker.price,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/30">
            <img
              src={images[selectedImage]}
              alt={sneaker.name}
              className="w-full h-full object-cover"
              data-testid="img-product-main"
            />
            {hasDiscount && (
              <div className="absolute top-4 right-4">
                <Badge variant="destructive" className="text-lg font-bold px-3 py-1">
                  {Math.round(((parseFloat(sneaker.originalPrice!) - parseFloat(sneaker.price)) / parseFloat(sneaker.originalPrice!)) * 100)}% OFF
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                    selectedImage === index 
                      ? "border-primary" 
                      : "border-transparent hover:border-muted-foreground/50"
                  }`}
                  data-testid={`button-thumbnail-${index}`}
                >
                  <img
                    src={image}
                    alt={`${sneaker.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand & Name */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
              {sneaker.brand}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-product-name">
              {sneaker.name}
            </h1>
            <p className="text-lg text-muted-foreground">{sneaker.model}</p>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-primary" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">2.5K Reviews</span>
          </div>

          {/* Description */}
          <p className="text-foreground leading-relaxed">
            {sneaker.description}
          </p>

          <Separator />

          {/* Size Chart */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Size Chart</h3>
              <Button variant="link" className="text-sm p-0 h-auto" data-testid="button-size-guide">
                Size Guide
              </Button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className={`${selectedSize === size ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={() => setSelectedSize(size)}
                  data-testid={`button-size-${size}`}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Quantity & Price */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Item Quantity</p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  data-testid="button-decrease-quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center" data-testid="text-quantity">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-increase-quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Total Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground" data-testid="text-total-price">
                  ₹{(parseFloat(sneaker.price) * quantity).toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{(parseFloat(sneaker.originalPrice!) * quantity).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Membership Discount */}
          {hasDiscount && (
            <Card className="p-4 bg-primary/10 border-primary/20">
              <p className="text-sm font-semibold text-primary mb-1">15% Discount For Membership</p>
              <p className="text-xs text-muted-foreground">
                Every SNEAKERSLOT membership customers can get 15% discount plus free shipping for every order
              </p>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
              disabled={!selectedSize || buyNowMutation.isPending}
              onClick={handleBuyNow}
              data-testid="button-buy-now"
            >
              {buyNowMutation.isPending ? "Processing..." : "Buy Now"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 font-semibold text-base"
              disabled={!selectedSize || addToCartMutation.isPending}
              onClick={handleAddToCart}
              data-testid="button-add-to-cart"
            >
              {addToCartMutation.isPending ? "Adding..." : "Add To Cart"}
            </Button>
          </div>

          <Button
            variant="ghost"
            className="w-full gap-2"
            data-testid="button-add-to-wishlist"
          >
            <Heart className="h-5 w-5" />
            Add to Wishlist
          </Button>

          <Separator />

          {/* Trust Badges */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-primary" />
              <span>Free shipping on orders over ₹5,000</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-5 w-5 text-primary" />
              <span>100% Authentic & Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Easy returns within 30 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <Button variant="outline" data-testid="button-write-review">Write a Review</Button>
        </div>
        {/* Reviews would be rendered here */}
      </div>

      {/* Shipping Method Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shipping Method</h2>
        </div>
        <Card className="p-6">
          <p className="text-muted-foreground">
            Standard shipping: 5-7 business days<br />
            Express shipping: 2-3 business days
          </p>
        </Card>
      </div>
    </div>
  );
}
