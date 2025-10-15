'use client';

import { useAccount, useReadContract } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Image as ImageIcon, ExternalLink, Plus } from 'lucide-react';
import { SNEAKER_NFT_ABI, SNEAKER_NFT_ADDRESS } from '@/lib/sneaker-nft-contract';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface SneakerNFT {
  tokenId: number;
  name: string;
  brand: string;
  imageURIs: string[];
  price: bigint;
  mintedAt: bigint;
  minter: string;
}

export default function NFTDashboard() {
  const { address, isConnected } = useAccount();
  const [selectedNFT, setSelectedNFT] = useState<SneakerNFT | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get user's token IDs
  const { data: tokenIds, isLoading: isLoadingIds } = useReadContract({
    address: SNEAKER_NFT_ADDRESS as `0x${string}`,
    abi: SNEAKER_NFT_ABI,
    functionName: 'getUserSneakers',
    args: address ? [address] : undefined,
  });

  // Get total supply
  const { data: totalSupply } = useReadContract({
    address: SNEAKER_NFT_ADDRESS as `0x${string}`,
    abi: SNEAKER_NFT_ABI,
    functionName: 'getTotalSupply',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              NFT Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              View and manage your minted sneaker NFTs
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/store">
              <Plus className="mr-2 h-5 w-5" />
              Mint New NFT
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Supply
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {totalSupply ? totalSupply.toString() : '0'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                NFTs minted globally
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Your NFTs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {tokenIds ? (tokenIds as bigint[]).length : '0'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Sneakers you own
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Contract Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-sm break-all">
                {SNEAKER_NFT_ADDRESS.slice(0, 10)}...{SNEAKER_NFT_ADDRESS.slice(-8)}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto mt-1"
                asChild
              >
                <a 
                  href={`https://calibration.filfox.info/en/address/${SNEAKER_NFT_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View on Explorer
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {!isConnected ? (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Connect Wallet</CardTitle>
              <CardDescription>
                Connect your wallet to view your NFTs
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ConnectButton />
            </CardContent>
          </Card>
        ) : isLoadingIds ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : !tokenIds || (tokenIds as bigint[]).length === 0 ? (
          <Card className="text-center py-20">
            <CardContent>
              <ImageIcon className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
              <h3 className="text-2xl font-bold mb-2">No NFTs Yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't minted any sneaker NFTs yet. Start by uploading your first sneaker!
              </p>
              <Button asChild size="lg">
                <Link href="/store">
                  <Plus className="mr-2 h-5 w-5" />
                  Mint Your First NFT
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(tokenIds as bigint[]).map((tokenId) => (
              <NFTCard key={tokenId.toString()} tokenId={tokenId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NFTCard({ tokenId }: { tokenId: bigint }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: sneaker, isLoading } = useReadContract({
    address: SNEAKER_NFT_ADDRESS as `0x${string}`,
    abi: SNEAKER_NFT_ABI,
    functionName: 'getSneaker',
    args: [tokenId],
  }) as { data: SneakerNFT | undefined; isLoading: boolean };

  if (isLoading || !sneaker) {
    return (
      <Card className="overflow-hidden">
        <div className="aspect-square bg-muted animate-pulse" />
        <CardContent className="p-4">
          <div className="h-6 bg-muted rounded animate-pulse mb-2" />
          <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
        </CardContent>
      </Card>
    );
  }

  const formattedPrice = (Number(sneaker.price) / 100).toFixed(2);
  const formattedDate = new Date(Number(sneaker.mintedAt) * 1000).toLocaleDateString();

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
      {/* Image Carousel */}
      <div className="relative aspect-square bg-gradient-to-br from-muted/20 to-muted/50">
        <img
          src={sneaker.imageURIs[selectedImageIndex]}
          alt={sneaker.name}
          className="w-full h-full object-cover"
        />
        
        {/* Image Counter Badge */}
        {sneaker.imageURIs.length > 1 && (
          <Badge className="absolute top-3 right-3 bg-black/70 text-white">
            {selectedImageIndex + 1} / {sneaker.imageURIs.length}
          </Badge>
        )}

        {/* Image Navigation */}
        {sneaker.imageURIs.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {sneaker.imageURIs.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === selectedImageIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

        {/* Token ID Badge */}
        <Badge className="absolute top-3 left-3 bg-primary text-black font-bold">
          #{tokenId.toString()}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="p-6 space-y-3">
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">
            {sneaker.brand}
          </p>
          <h3 className="text-xl font-bold line-clamp-2">
            {sneaker.name}
          </h3>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Price</p>
            <p className="text-2xl font-bold">₹{formattedPrice}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Minted</p>
            <p className="text-sm font-medium">{formattedDate}</p>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {sneaker.imageURIs.length > 1 && (
          <div className="flex gap-2 pt-2">
            {sneaker.imageURIs.map((uri, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${
                  index === selectedImageIndex
                    ? 'border-primary scale-110'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={uri}
                  alt={`${sneaker.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <Button variant="outline" className="w-full" asChild>
            <a
              href={`https://calibration.filfox.info/en/token/${SNEAKER_NFT_ADDRESS}/${tokenId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View on Explorer
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            asChild
          >
            <a
              href={sneaker.imageURIs[selectedImageIndex]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              View IPFS Image
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
