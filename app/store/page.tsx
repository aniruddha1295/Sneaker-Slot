'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import lighthouse from '@lighthouse-web3/sdk';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { SNEAKER_NFT_ABI, SNEAKER_NFT_ADDRESS } from '@/lib/sneaker-nft-contract';
import Link from 'next/link';

export default function StorePage() {
  const { address, isConnected } = useAccount();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedCID, setUploadedCID] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  // NFT Metadata
  const [sneakerName, setSneakerName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [minting, setMinting] = useState(false);
  const [mintedTokenId, setMintedTokenId] = useState<string>('');

  const { writeContract, data: hash, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const uploadToLighthouse = async () => {
    if (!file) return;

    try {
      setUploading(true);
      setUploadProgress(0);

      const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
      
      if (!apiKey) {
        throw new Error('Lighthouse API key not found');
      }

      console.log('Starting upload with API key:', apiKey.substring(0, 10) + '...');
      
      const output = await lighthouse.upload([file], apiKey);

      console.log('Upload response:', output);

      if (output?.data?.Hash) {
        setUploadedCID(output.data.Hash);
        setUploadProgress(100);
      } else {
        throw new Error('No CID returned from upload');
      }
    } catch (error) {
      console.error('Error uploading to Lighthouse:', error);
      alert('Error uploading file: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const mintNFT = async () => {
    if (!sneakerName || !brand || !price || !uploadedCID) {
      alert('Please fill all fields and upload image first');
      return;
    }

    // Check if contract address is configured
    if (SNEAKER_NFT_ADDRESS === '0x0000000000000000000000000000000000000000') {
      alert('Smart contract not deployed yet! Please deploy the contract first.\n\nSee DEPLOYMENT.md for instructions.');
      return;
    }

    try {
      setMinting(true);

      // Create metadata JSON
      const metadata = {
        name: sneakerName,
        brand: brand,
        price: price,
        image: `ipfs://${uploadedCID}`,
        attributes: [
          { trait_type: "Brand", value: brand },
          { trait_type: "Price", value: `₹${price}` },
        ]
      };

      // Upload metadata to IPFS
      const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!;
      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      const metadataFile = new File([metadataBlob], 'metadata.json');
      const metadataUpload = await lighthouse.upload([metadataFile], apiKey);
      const metadataURI = `ipfs://${metadataUpload.data.Hash}`;

      const imageURI = `https://gateway.lighthouse.storage/ipfs/${uploadedCID}`;

      console.log('Minting NFT with params:', {
        sneakerName,
        brand,
        imageURI,
        price: BigInt(Math.floor(parseFloat(price) * 100)),
        metadataURI
      });

      // Mint NFT
      writeContract({
        address: SNEAKER_NFT_ADDRESS as `0x${string}`,
        abi: SNEAKER_NFT_ABI,
        functionName: 'mintSneaker',
        args: [
          sneakerName,
          brand,
          [imageURI], // imageURIs array
          BigInt(Math.floor(parseFloat(price) * 100)),
          metadataURI
        ],
      });

    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Error minting NFT: ' + (error as Error).message);
      setMinting(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreviewUrl('');
    setUploadedCID('');
    setSneakerName('');
    setBrand('');
    setPrice('');
    setUploadProgress(0);
    setMintedTokenId('');
  };

  // Handle mint confirmation
  if (isConfirmed && minting) {
    setMinting(false);
    setMintedTokenId(hash || '');
  }

  // Show write error
  if (writeError && minting) {
    console.error('Write contract error:', writeError);
    alert('Transaction failed: ' + writeError.message);
    setMinting(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Filecoin Storage with Lighthouse
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload multiple images to decentralized storage
          </p>
        </div>

        {!isConnected ? (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Connect Wallet</CardTitle>
              <CardDescription>
                Connect your wallet to upload and mint NFTs
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ConnectButton />
            </CardContent>
          </Card>
        ) : mintedTokenId ? (
          <Card className="border-green-500/50">
            <CardHeader>
              <CardTitle className="text-green-600 dark:text-green-400 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6" />
                NFT Minted Successfully!
              </CardTitle>
              <CardDescription>
                Your sneaker has been minted as an NFT
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Transaction Hash</Label>
                <div className="p-3 bg-muted rounded-lg font-mono text-xs break-all">
                  {mintedTokenId}
                </div>
              </div>

              <div className="aspect-square rounded-lg overflow-hidden border max-w-md mx-auto">
                <img
                  src={`https://gateway.lighthouse.storage/ipfs/${uploadedCID}`}
                  alt="Minted NFT"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={resetForm} className="flex-1">
                  Mint Another NFT
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/nft-dashboard">View Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : uploadedCID ? (
          <div className="space-y-6">
            <Card className="border-green-500/50">
              <CardHeader>
                <CardTitle className="text-green-600 dark:text-green-400 flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6" />
                  Image Uploaded Successfully
                </CardTitle>
                <CardDescription>
                  Now add sneaker details to mint it as an NFT
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden border max-w-sm mx-auto">
                  <img
                    src={`https://gateway.lighthouse.storage/ipfs/${uploadedCID}`}
                    alt="Uploaded to Filecoin"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Filecoin CID</Label>
                  <div className="p-2 bg-muted rounded font-mono text-xs break-all">
                    {uploadedCID}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  NFT Details
                </CardTitle>
                <CardDescription>
                  Enter the sneaker information to mint as NFT
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sneakerName">Sneaker Name *</Label>
                  <Input
                    id="sneakerName"
                    placeholder="e.g., Air Jordan 1 Retro High"
                    value={sneakerName}
                    onChange={(e) => setSneakerName(e.target.value)}
                    disabled={minting || isConfirming}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Brand *</Label>
                  <Input
                    id="brand"
                    placeholder="e.g., Nike, Adidas, New Balance"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    disabled={minting || isConfirming}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (in smallest units) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g., 15000 (will be converted to 150.00)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={minting || isConfirming}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter price in smallest units (e.g., 15000 = $150.00)
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={mintNFT}
                    disabled={!sneakerName || !brand || !price || minting || isConfirming}
                    className="flex-1"
                  >
                    {minting || isConfirming ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {minting ? "Minting..." : "Confirming..."}
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Mint as NFT
                      </>
                    )}
                  </Button>
                  <Button onClick={resetForm} variant="outline">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>
                Select an image to upload to Filecoin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file">Choose File</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </div>

              {previewUrl && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="aspect-square rounded-lg overflow-hidden border max-w-md mx-auto">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {file && (
                <Button
                  onClick={uploadToLighthouse}
                  disabled={uploading}
                  className="w-full"
                  size="lg"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Uploading... {uploadProgress}%
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      Upload to Filecoin
                    </>
                  )}
                </Button>
              )}

              {uploading && (
                <div className="space-y-2">
                  <Label>Upload Progress</Label>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About Filecoin Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Upload images directly to Filecoin using Lighthouse SDK</p>
            <p>• Files are permanently stored on decentralized storage</p>
            <p>• Each file gets a unique Content Identifier (CID)</p>
            <p>• Retrieve files using the Filecoin CID from any gateway</p>
            <p>• No centralized servers - your data is truly yours</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
