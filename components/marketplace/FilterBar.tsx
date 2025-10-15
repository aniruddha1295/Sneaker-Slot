import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FilterBarProps {
  onFilterChange?: (filters: any) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const brands = ["All Brands", "Nike", "Adidas", "Jordan", "New Balance", "Puma", "Reebok"];
  const sizes = ["All Sizes", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0", "9.5", "10.0", "10.5", "11.0", "11.5", "12.0"];
  const conditions = ["All", "Deadstock", "Like New", "Very Good", "Good", "Fair"];

  const clearFilters = () => {
    setPriceRange([0, 100000]);
    setSelectedBrand("");
    setSelectedSize("");
    setSelectedCondition("");
    setSortBy("newest");
  };

  const hasActiveFilters = selectedBrand || selectedSize || selectedCondition || priceRange[0] > 0 || priceRange[1] < 100000;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort By */}
      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger data-testid="select-sort">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2">
        <Label>Brand</Label>
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger data-testid="select-brand">
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Size Filter */}
      <div className="space-y-2">
        <Label>Size</Label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger data-testid="select-size">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Condition Filter */}
      <div className="space-y-2">
        <Label>Condition</Label>
        <Select value={selectedCondition} onValueChange={setSelectedCondition}>
          <SelectTrigger data-testid="select-condition">
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            {conditions.map((condition) => (
              <SelectItem key={condition} value={condition}>
                {condition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label>Price Range</Label>
        <div className="pt-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100000}
            step={1000}
            className="w-full"
            data-testid="slider-price"
          />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
          data-testid="button-clear-filters"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filter Bar */}
      <div className="hidden md:block sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 grid grid-cols-4 gap-3">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger data-testid="select-sort-desktop">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              {/* Brand */}
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger data-testid="select-brand-desktop">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Size */}
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger data-testid="select-size-desktop">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Condition */}
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger data-testid="select-condition-desktop">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                data-testid="button-clear-desktop"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedBrand && (
                <Badge variant="secondary" className="gap-1">
                  {selectedBrand}
                  <button onClick={() => setSelectedBrand("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedSize && (
                <Badge variant="secondary" className="gap-1">
                  Size: {selectedSize}
                  <button onClick={() => setSelectedSize("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedCondition && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCondition}
                  <button onClick={() => setSelectedCondition("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 100000) && (
                <Badge variant="secondary" className="gap-1">
                  ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                  <button onClick={() => setPriceRange([0, 100000])}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <div className="md:hidden sticky top-16 z-40 bg-background border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold">Filters</h2>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" data-testid="button-mobile-filters">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 flex items-center justify-center p-0">
                    !
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
