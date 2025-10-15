# SneakerVerse on Orbit Starter Kit# 🚀 Orbit Starter Kit - SneakerVerse Edition



A premium sneaker marketplace built with Next.js 15, featuring the SneakerVerse UI integrated with Filecoin/IPFS storage capabilities.A Next.js starter kit for building decentralized sneaker marketplace applications with **Lighthouse Storage** (IPFS) and **Smart Contracts**. Features a complete UI component library from SneakerVerse.



## 🚀 Features## ✨ Features



- **Beautiful UI**: SneakerVerse design with hero banners, product grids, and smooth animations- 🔐 **Wallet Integration** - Rainbow Kit + Wagmi (Multi-chain support)

- **Web3 Wallet Integration**: Rainbow Kit for seamless wallet connections- 📦 **IPFS Storage** - Lighthouse SDK for decentralized storage

- **Blockchain Storage**: Lighthouse SDK for IPFS/Filecoin storage- 🔗 **Smart Contracts** - Store sneaker metadata on blockchain

- **47+ UI Components**: Complete shadcn/ui component library- 🎨 **47+ UI Components** - Complete shadcn/ui + SneakerVerse components

- **Type-Safe**: Full TypeScript support- 📱 **Responsive Design** - Mobile-first with dark mode support

- **Responsive**: Mobile-first design with elegant layouts- ⚡ **Upload Flow** - Complete image upload with progress tracking



## 📦 Tech Stack## 🎯 What's Working Now



- **Framework**: Next.js 15.3.0 (App Router)✅ Wallet connection (Rainbow Kit)  

- **Styling**: Tailwind CSS 3.4.1✅ Lighthouse IPFS uploads  

- **UI Components**: Radix UI + shadcn/ui✅ Smart contract integration  

- **Wallet**: Rainbow Kit 2.2.8 + Wagmi 2.18.0✅ Store & retrieve CIDs on-chain  

- **Storage**: Lighthouse SDK 0.4.3✅ Complete UI component library  

- **State**: TanStack React Query 5.83.0✅ Toast notifications  

- **Forms**: React Hook Form + Zod validation✅ Upload with progress tracking  



## 🛠️ Getting Started## 🚀 Quick Start (5 Minutes)



### Prerequisites```bash

- Node.js 18+ # 1. Install dependencies

- npm or yarnnpm install



### Installation# 2. Setup environment

cp .env.sample .env.local

```bash# Edit .env.local and add your API keys:

# Install dependencies# - NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

npm install# - NEXT_PUBLIC_LIGHTHOUSE_API_KEY



# Run development server# 3. Start development server

npm run devnpm run dev

```

# 4. Open in browser

Open [http://localhost:3000](http://localhost:3000) to see the app.# http://localhost:3000

```

## 📁 Project Structure

## 🔑 Get API Keys

```

orbit-starter-kit/- **Wallet Connect ID**: https://cloud.reown.com (free)

├── app/                    # Next.js app directory- **Lighthouse API**: https://files.lighthouse.storage/dashboard/apikey (free)

│   ├── page.tsx           # Home page with SneakerVerse UI

│   ├── layout.tsx         # Root layout## 📁 Key Pages & Features

│   ├── globals.css        # Global styles

│   └── providers.tsx      # Web3 providers### Working Now:

├── components/- `/` - Home page with wallet connection

│   ├── home/              # Hero banner, price range, trending- `/store` - **Lighthouse storage demo** ✅ Fully working!

│   ├── marketplace/       # Filter bar  - Upload images to IPFS

│   ├── product/           # Product detail views  - Store CIDs on blockchain

│   ├── sneakers/          # Sneaker cards  - Retrieve and display images

│   ├── layout/            # Navigation components (needs routing conversion)- `/upload` - Upload sneakers with metadata

│   └── ui/                # 47 shadcn/ui components  - Name, brand, image

├── lib/  - Automatic IPFS upload

│   ├── api.ts             # Mock API with sneaker data  - Progress tracking

│   └── utils.ts           # Utility functions- `/wallet` - Wallet connection page

├── types/

│   └── index.ts           # TypeScript type definitions### UI Components Available:

└── hooks/                 # Custom React hooksAll ready to use in your pages:

```- Navigation, Cards, Buttons, Forms

- HeroBanner, SneakerCard, ProductDetail

## 🎨 UI Components- FilterBar, PriceRangeSection

- 47+ shadcn/ui components

### SneakerVerse Components

- **HeroBanner**: Auto-advancing carousel with navigation## 📚 Documentation

- **PriceRangeSection**: Interactive price filter cards

- **TrendingSection**: Horizontal scrollable showcase- **[QUICK-START.md](./QUICK-START.md)** - Complete setup checklist

- **SneakerCard**: Product cards with images, pricing, badges- **[STATUS.md](./STATUS.md)** - Current status & testing guide

- **ProductDetail**: Full product view with image gallery- **[INTEGRATION-GUIDE.md](./INTEGRATION-GUIDE.md)** - Full integration details

- **FilterBar**: Advanced filtering for marketplace- **[MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md)** - Component migration info



### shadcn/ui Library (47 components)## 🏗️ Project Structure

Button, Card, Dialog, Sheet, Tabs, Form, Input, Select, Dropdown Menu, Toast, Skeleton, Badge, Avatar, Calendar, Carousel, Chart, Checkbox, Command, Context Menu, Drawer, Hover Card, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Scroll Area, Separator, Sidebar, Slider, Switch, Table, Textarea, Toggle, Tooltip, and more...

```

## 🔧 Configurationorbit-starter-kit/

├── app/

### Environment Variables│   ├── page.tsx              # Home page

│   ├── store/page.tsx        # Lighthouse demo ✅ Working!

Create a `.env.local` file:│   ├── upload/page.tsx       # Sneaker upload page

│   └── globals.css           # Styles with SneakerVerse theme

```env├── components/

# Wallet Connect Project ID│   ├── ui/                   # 47 shadcn/ui components

NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id│   ├── home/                 # HeroBanner, PriceRange, Trending

│   ├── layout/               # Navigation, MobileNav

# Lighthouse API Key│   ├── sneakers/             # SneakerCard, SneakerUpload

NEXT_PUBLIC_LIGHTHOUSE_API_KEY=your_api_key│   ├── product/              # ProductDetail

│   └── marketplace/          # FilterBar

# RPC URL├── contracts/

NEXT_PUBLIC_RPC_URL=https://sepolia.base.org│   └── SneakerStorage.sol    # Enhanced smart contract

├── lib/

# Contract Address│   ├── contract.ts           # Contract ABI & address

NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address│   ├── utils.ts              # Utility functions

```│   └── api.ts                # API layer (mock/replace)

├── hooks/

## ⚠️ Known Issues│   ├── useEthers.ts          # Ethers provider/signer

│   ├── use-mobile.tsx        # Mobile breakpoint

### Navigation Components│   └── use-toast.ts          # Toast notifications

The Navigation and MobileNav components currently use `wouter` routing from the original SneakerVerse project. They need to be converted to Next.js routing (`next/link` and `usePathname`) to work properly.└── types/

    └── index.ts              # TypeScript interfaces

**Temporary Solution**: Navigation is disabled in `layout.tsx` until routing conversion is complete.```



## 🚧 TODO## 🔧 Smart Contract



- [ ] Convert Navigation components from wouter to Next.js routing### Current Contract (Deployed)

- [ ] Add more marketplace pages (Collection, Drops, Profile)- **Address**: `0xc50dd07ae5CdE4B1bFf213881b87180e22e34A9c`

- [ ] Integrate real backend API- **Network**: Base Sepolia

- [ ] Deploy enhanced smart contract- **Functions**: `store(cid)`, `retrieve()`

- [ ] Add product detail pages with dynamic routing

- [ ] Implement cart and checkout flow### Enhanced Contract (Ready to Deploy)

- [ ] Add user authenticationLocated in `contracts/SneakerStorage.sol`:

- Store sneaker metadata (name, brand, CIDs)

## 📝 Scripts- Link sneakers to owners

- Query by ID or owner address

```bash- Backward compatible

# Development

npm run dev          # Start dev server with Turbopack**Deploy via Remix**: https://remix.ethereum.org/



# Production## 🧪 Testing

npm run build        # Build for production

npm start            # Start production server```bash

# Test wallet connection

# LintingVisit any page and click "Connect Wallet"

npm run lint         # Run ESLint

```# Test Lighthouse upload (Working Now!)

1. Visit /store

## 🌐 Deployment2. Connect wallet

3. Upload an image

This project is ready to deploy on Vercel:4. Click "Store on Blockchain"

5. See stored image displayed

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo)

# Test sneaker upload

## 📄 License1. Visit /upload

2. Enter name and brand

MIT License3. Upload image

4. Auto-uploads to IPFS + stores on chain

## 🤝 Contributing```



Contributions welcome! Please open an issue or PR.## 🛠️ Development



---```bash

# Run dev server

**Built with ❤️ using SneakerVerse UI + Orbit Starter Kit**npm run dev


# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📦 Tech Stack

- **Framework**: Next.js 15
- **Blockchain**: Wagmi + Ethers.js + Rainbow Kit
- **Storage**: Lighthouse SDK (IPFS)
- **UI**: Tailwind CSS + shadcn/ui + Radix UI
- **Forms**: React Hook Form + Zod
- **State**: TanStack Query
- **Icons**: Lucide React

## 🎨 UI Components

All components are production-ready:

### Layout
- Navigation, MobileNav, Footer, Header

### Sneakers
- SneakerCard, SneakerUpload, ProductDetail

### Home
- HeroBanner, PriceRangeSection, TrendingSection

### Marketplace
- FilterBar (with sorting, filtering)

### UI Library (47+ components)
- Buttons, Cards, Inputs, Select, Checkbox
- Dialog, Sheet, Popover, Tooltip
- Tabs, Accordion, Table, Form
- Toast, Progress, Avatar, Badge
- And many more...

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Other Platforms
Works with any Next.js hosting:
- Netlify
- Railway
- Render
- AWS Amplify

## 🐛 Troubleshooting

### "Lighthouse API key not configured"
**Fix**: Add `NEXT_PUBLIC_LIGHTHOUSE_API_KEY` to `.env.local`

### "Please connect your wallet"
**Fix**: 
1. Add Wallet Connect ID to `.env.local`
2. Click "Connect Wallet" button

### Contract calls fail
**Fix**:
1. Switch to Base Sepolia network
2. Get test ETH from faucet
3. Verify contract address

### Components use wouter
**Fix**: Some copied components need routing updates (see MIGRATION-GUIDE.md)

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please read contributing guidelines first.

## 🔗 Links

- **Lighthouse Docs**: https://docs.lighthouse.storage/
- **Rainbow Kit**: https://www.rainbowkit.com/docs
- **Base Sepolia Faucet**: https://www.coinbase.com/faucets
- **Remix IDE**: https://remix.ethereum.org/

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using Filecoin, Lighthouse, and Next.js**
