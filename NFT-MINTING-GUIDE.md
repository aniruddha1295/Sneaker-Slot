# NFT Minting Guide for SneakerVerse

## ✅ What's Been Completed

### 1. Store Page with Full NFT Minting Flow
- **Location**: `app/store/page.tsx`
- **Features**:
  - Image upload to IPFS via Lighthouse
  - NFT metadata form (Sneaker Name, Brand, Price)
  - Mint as NFT button with MetaMask integration
  - Transaction confirmation tracking
  - Success screen with transaction hash
  - Links to NFT Dashboard

### 2. Smart Contract
- **Location**: `contracts/SneakerNFT.sol`
- **Type**: ERC-721 NFT contract
- **Features**:
  - Multiple images per NFT support
  - On-chain sneaker metadata (name, brand, price)
  - Token URI for off-chain metadata
  - User NFT tracking

### 3. Contract ABI & Configuration
- **Location**: `lib/sneaker-nft-contract.ts`
- **Exports**: `SNEAKER_NFT_ABI`, `SNEAKER_NFT_ADDRESS`
- **Current Address**: `0x0000000000000000000000000000000000000000` (NOT DEPLOYED)

### 4. NFT Dashboard
- **Location**: `app/nft-dashboard/page.tsx`
- **Features**:
  - Display all user's minted NFTs
  - Image carousel for multiple images
  - Stats cards (Total Supply, User NFTs, Contract Address)
  - Sneaker details (name, brand, price)

### 5. Navigation
- **Location**: `components/layout/SimpleNav.tsx`
- **Links**:
  - Home (/)
  - Mint NFT (/store)
  - My NFTs (/nft-dashboard)

## 🔴 Critical Next Steps

### Step 1: Deploy Smart Contract

**Option A: Using Remix IDE (Recommended for beginners)**

1. Go to [Remix IDE](https://remix.ethereum.org/)

2. Create a new file `SneakerNFT.sol` and paste the code from `contracts/SneakerNFT.sol`

3. Install OpenZeppelin contracts:
   - In Remix, go to File Explorer
   - Create folder `@openzeppelin/contracts`
   - Or use the Remix plugin manager to install OpenZeppelin

4. Compile the contract:
   - Go to "Solidity Compiler" tab
   - Select compiler version 0.8.0 or higher
   - Click "Compile SneakerNFT.sol"

5. Deploy to Filecoin Calibration:
   - Go to "Deploy & Run Transactions" tab
   - Change Environment to "Injected Provider - MetaMask"
   - Make sure MetaMask is connected to Filecoin Calibration testnet:
     - Network Name: `Filecoin Calibration`
     - RPC URL: `https://api.calibration.node.glif.io/rpc/v1`
     - Chain ID: `314159`
     - Currency Symbol: `tFIL`
     - Block Explorer: `https://calibration.filscan.io/`
   
6. Get test FIL:
   - Go to [Filecoin Calibration Faucet](https://faucet.calibration.fildev.network/)
   - Enter your wallet address
   - Request test FIL

7. Deploy:
   - Select "SneakerNFT" contract
   - Click "Deploy"
   - Confirm transaction in MetaMask
   - **Copy the deployed contract address**

**Option B: Using Hardhat**

See detailed instructions in `DEPLOYMENT.md`

### Step 2: Update Environment Variables

1. Open `.env.local`

2. Replace the contract address:
```env
NEXT_PUBLIC_SNEAKER_NFT_CONTRACT=0xYourDeployedContractAddressHere
```

3. Save the file

4. Restart the dev server:
```bash
npm run dev
```

### Step 3: Test the Complete Flow

1. **Connect Wallet**
   - Go to http://localhost:3000/store
   - Click "Connect Wallet" in the header
   - Select MetaMask
   - Make sure you're on Filecoin Calibration testnet

2. **Upload Image**
   - Click "Choose File" and select a sneaker image
   - Click "Upload to IPFS"
   - Wait for upload to complete
   - You'll see the uploaded image and IPFS CID

3. **Fill NFT Details**
   - Enter Sneaker Name (e.g., "Air Jordan 1 Retro High")
   - Enter Brand (e.g., "Nike")
   - Enter Price (e.g., "15000" for $150.00)

4. **Mint NFT**
   - Click "Mint as NFT" button
   - **MetaMask popup will appear** - this is what you were asking about!
   - Review the transaction details
   - Click "Confirm" in MetaMask
   - Wait for transaction confirmation (you'll see "Confirming..." state)

5. **View Success**
   - After confirmation, you'll see:
     - "NFT Minted Successfully!" message
     - Transaction hash
     - Your uploaded image
     - Buttons to "Mint Another NFT" or "View Dashboard"

6. **Check Dashboard**
   - Click "View Dashboard" or go to http://localhost:3000/nft-dashboard
   - You should see your newly minted NFT
   - Image carousel if you add multiple images later

## 🎯 Current Status

### Working ✅
- Image upload to IPFS (Lighthouse API key configured)
- Wallet connection (WalletConnect configured)
- NFT metadata form
- Transaction triggering logic
- Success/error handling
- Dashboard UI

### Pending ⚠️
- **Smart contract deployment** (blocks all minting)
- Contract address configuration in `.env.local`
- Full flow testing with real blockchain transactions

## 🐛 Troubleshooting

### MetaMask Not Showing Transaction

**Symptoms**: Clicking "Mint as NFT" doesn't open MetaMask

**Possible Causes**:
1. ✅ **FIXED**: Contract address is `0x0000...0000` 
   - The app now shows an alert if contract is not deployed
   - Deploy the contract and update `.env.local`

2. Wrong network in MetaMask
   - Make sure you're on Filecoin Calibration (Chain ID: 314159)
   - Add the network manually if needed (see Step 1 above)

3. Wallet not connected
   - Click "Connect Wallet" in the header
   - Make sure you see your address in the navbar

4. Missing form fields
   - All fields (Sneaker Name, Brand, Price) must be filled
   - Button will be disabled if any field is empty

### Transaction Fails

**Check**:
1. Do you have enough test FIL for gas fees?
   - Get more from the faucet
2. Is the contract address correct in `.env.local`?
3. Check the browser console for errors (F12)
4. Check MetaMask for rejected/failed transactions

### Image Not Displaying

**Check**:
1. IPFS CID is valid (starts with "Qm" or "bafy")
2. Gateway URL is accessible: `https://gateway.lighthouse.storage/ipfs/{CID}`
3. Image file format is supported (jpg, png, gif)

## 📝 Code Flow

### Upload Flow
```
1. User selects file → handleFileChange()
2. File preview generated → setPreviewUrl()
3. Click "Upload to IPFS" → uploadToLighthouse()
4. File uploaded via Lighthouse SDK
5. CID received → setUploadedCID()
6. Success card shows with image
```

### Minting Flow
```
1. User fills form → setSneakerName/Brand/Price()
2. Click "Mint as NFT" → mintNFT()
3. Validate all fields present
4. Check contract deployed (if 0x000...000, alert and exit)
5. Create metadata JSON
6. Upload metadata to IPFS → get metadataURI
7. Call writeContract() with params:
   - sneakerName
   - brand
   - [imageURI] (array of one image)
   - price (converted to BigInt * 100)
   - metadataURI
8. MetaMask popup appears → user confirms
9. Transaction submitted → setMinting(true)
10. Wait for confirmation → isConfirming = true
11. Confirmed → setMintedTokenId(hash)
12. Success screen shows
```

## 🔗 Important Links

- **Filecoin Calibration Faucet**: https://faucet.calibration.fildev.network/
- **Filecoin Calibration Explorer**: https://calibration.filscan.io/
- **Remix IDE**: https://remix.ethereum.org/
- **Lighthouse Gateway**: https://gateway.lighthouse.storage/ipfs/{CID}
- **OpenZeppelin Contracts**: https://docs.openzeppelin.com/contracts/

## 🚀 Future Enhancements

- [ ] Support multiple images per NFT (contract already supports this)
- [ ] Add image compression before upload
- [ ] Implement listing NFTs for sale
- [ ] Add transfer NFT functionality
- [ ] Show NFT price history
- [ ] Add search/filter in dashboard
- [ ] Export metadata as JSON
- [ ] Integrate with OpenSea/NFT marketplaces

## 📞 Support

If you encounter any issues:
1. Check browser console (F12 → Console tab)
2. Check MetaMask for transaction history
3. Verify contract address in `.env.local`
4. Check Filecoin explorer for transaction status
5. Review this guide's troubleshooting section
