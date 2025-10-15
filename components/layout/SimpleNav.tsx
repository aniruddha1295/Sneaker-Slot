'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Home, Upload, Sparkles } from 'lucide-react';

export function SimpleNav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">SneakerSlot</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/store">
              <Button variant="ghost" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Mint NFT
              </Button>
            </Link>
            <Link href="/nft-dashboard">
              <Button variant="ghost" size="sm">
                <Sparkles className="mr-2 h-4 w-4" />
                My NFTs
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}
