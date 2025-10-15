import { Link, useLocation } from "wouter";
import { Home, Zap, ShoppingBag, Grid3x3 } from "lucide-react";

export function MobileNav() {
  const [location] = useLocation();
  
  const navItems = [
    { href: "/", icon: Home, label: "Sale" },
    { href: "/drops", icon: Zap, label: "Fresh" },
    { href: "/marketplace", icon: ShoppingBag, label: "Resell" },
    { href: "/collection", icon: Grid3x3, label: "Collection" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`link-mobile-${item.label.toLowerCase()}`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "fill-primary/20" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
