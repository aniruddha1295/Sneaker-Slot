# Smart Contract Deployment Guide

## Overview
The `SneakerNFT.sol` contract allows users to mint sneakers as NFTs with multiple images stored on IPFS.

## Prerequisites
1. Install Hardhat or Foundry
2. Have test FIL tokens on Filecoin Calibration testnet
3. OpenZeppelin contracts installed

## Installation

```bash
# Install OpenZeppelin contracts
npm install @openzeppelin/contracts
```

## Deployment Steps

### Option 1: Using Hardhat

1. **Install Hardhat:**
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

2. **Create `hardhat.config.js`:**
```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    calibration: {
      url: "https://api.calibration.node.glif.io/rpc/v1",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 314159,
    },
  },
};
```

3. **Create deployment script `scripts/deploy.js`:**
```javascript
const hre = require("hardhat");

async function main() {
  const SneakerNFT = await hre.ethers.getContractFactory("SneakerNFT");
  const sneakerNFT = await SneakerNFT.deploy();

  await sneakerNFT.waitForDeployment();

  console.log("SneakerNFT deployed to:", await sneakerNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

4. **Deploy:**
```bash
npx hardhat run scripts/deploy.js --network calibration
```

### Option 2: Using Remix IDE

1. Go to https://remix.ethereum.org/
2. Create a new file `SneakerNFT.sol`
3. Copy the contract code from `contracts/SneakerNFT.sol`
4. Install OpenZeppelin plugin or add imports
5. Compile with Solidity 0.8.20
6. Deploy to Filecoin Calibration using MetaMask

## After Deployment

1. **Copy the deployed contract address**

2. **Update `.env.local`:**
```bash
NEXT_PUBLIC_SNEAKER_NFT_CONTRACT=0xYourDeployedContractAddress
```

3. **Restart the dev server:**
```bash
npm run dev
```

## Network Configuration

### Filecoin Calibration Testnet
- **Network Name:** Filecoin Calibration
- **RPC URL:** https://api.calibration.node.glif.io/rpc/v1
- **Chain ID:** 314159
- **Currency Symbol:** tFIL
- **Block Explorer:** https://calibration.filfox.info/

### Get Test FIL
- Faucet: https://faucet.calibration.fildev.network/

## Contract Features

- **ERC-721 NFT Standard**
- **Multiple images per NFT** (up to 10)
- **On-chain metadata** (name, brand, price, mint date)
- **User dashboard** to view all minted NFTs
- **IPFS storage** via Lighthouse

## Functions

- `mintSneaker()` - Mint a new sneaker NFT
- `getSneaker()` - Get NFT metadata
- `getUserSneakers()` - Get all NFTs owned by address
- `getTotalSupply()` - Get total number of minted NFTs
- `getSneakerImages()` - Get all image URIs for an NFT

## Testing

```bash
npx hardhat test
```

## Verification

```bash
npx hardhat verify --network calibration DEPLOYED_CONTRACT_ADDRESS
```

## Troubleshooting

1. **"Insufficient funds"** - Get test FIL from faucet
2. **"Nonce too high"** - Reset MetaMask account
3. **"Contract not deployed"** - Check `.env.local` has correct address
4. **"Transaction reverted"** - Check gas limits and contract requirements
