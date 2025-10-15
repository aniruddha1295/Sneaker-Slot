// Frontend-only TypeScript types extracted from shared schema
// No database dependencies - pure TypeScript interfaces

export interface Sneaker {
  id: string;
  name: string;
  brand: string;
  model: string;
  colorway: string;
  price: string;
  originalPrice?: string;
  image: string;
  images: string[];
  description: string;
  category: string;
  sizes: string[];
  stock: number;
  condition?: string;
  featured: boolean;
  createdAt: Date;
}

export interface PriceRange {
  id: string;
  label: string;
  maxPrice: string;
  displayOrder: number;
}

export interface Drop {
  id: string;
  sneakerId: string;
  title: string;
  subtitle?: string;
  dropDate: Date;
  endDate?: Date;
  type: string; // "queue", "raffle", "instant"
  status: string; // "upcoming", "active", "ended"
  limited: boolean;
  quantity: number;
  remainingQuantity: number;
}

export interface DropWithSneaker extends Drop {
  sneaker: {
    id: string;
    name: string;
    brand: string;
    image: string;
    price: string;
  };
}

export interface Listing {
  id: string;
  sneakerId: string;
  sellerId: string;
  price: string;
  size: string;
  condition: string;
  conditionGrade?: number;
  conditionDescription?: string;
  images: string[];
  proofUrl?: string;
  nftMetadataUrl?: string;
  nftId?: string;
  description?: string;
  verified: boolean;
  status: string; // "active", "sold", "cancelled"
  createdAt: Date;
}

export interface ListingWithSneaker extends Listing {
  sneaker: {
    id: string;
    name: string;
    brand: string;
    image: string;
  };
}

export interface CartItem {
  id: string;
  sessionId: string;
  sneakerId: string;
  size: string;
  quantity: number;
  price: string;
  createdAt: Date;
}

export interface CartItemWithSneaker extends CartItem {
  sneaker: {
    id: string;
    name: string;
    brand: string;
    image: string;
  };
}

export interface UserCollection {
  id: string;
  userId: string;
  sneakerId: string;
  nftId?: string;
  size: string;
  purchasePrice: string;
  purchaseDate: Date;
  verified: boolean;
  nfcTagId?: string;
}

export interface CollectionWithSneaker extends UserCollection {
  sneaker: {
    id: string;
    name: string;
    brand: string;
    model: string;
    image: string;
  };
}

export interface User {
  id: string;
  username: string;
  password: string;
  email?: string;
  walletAddress?: string;
  avatar?: string;
  isVerifiedSeller: boolean;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  sneakerId: string;
  listingId?: string;
  size: string;
  quantity: number;
  price: string;
  total: string;
  status: string; // "pending", "processing", "shipped", "delivered", "cancelled"
  paymentStatus: string; // "pending", "paid", "refunded"
  paymentIntentId?: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  trackingNumber?: string;
  nftId?: string;
  nftMetadataUrl?: string;
  escrowStatus?: string; // "held", "released", "refunded"
  createdAt: Date;
  deliveredAt?: Date;
}

export interface OrderWithSneaker extends Order {
  sneaker: Sneaker;
}

export interface SellerVerification {
  id: string;
  userId: string;
  status: string; // "pending", "approved", "rejected"
  proofDocuments: string[];
  businessName?: string;
  businessAddress?: string;
  taxId?: string;
  notes?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
  createdAt: Date;
}

export interface Dispute {
  id: string;
  orderId: string;
  buyerId: string;
  sellerId?: string;
  reason: string;
  description?: string;
  evidenceUrls: string[];
  status: string; // "open", "investigating", "resolved", "closed"
  resolution?: string; // "refund", "release_payment", "partial_refund"
  resolutionNotes?: string;
  resolvedBy?: string;
  resolvedAt?: Date;
  createdAt: Date;
}

export interface Favorite {
  id: string;
  userId: string;
  sneakerId: string;
  createdAt: Date;
}

export interface DropNotification {
  id: string;
  userId: string;
  dropId: string;
  notified: boolean;
  createdAt: Date;
}

// Form types for creating/updating data
export interface CreateListingData {
  sneakerId: string;
  price: string;
  size: string;
  condition: string;
  conditionGrade?: number;
  conditionDescription?: string;
  description?: string;
  images: string[];
  proofUrl?: string;
}

export interface CreateOrderData {
  items: {
    sneakerId: string;
    listingId?: string;
    size: string;
    quantity: number;
    price: string;
    total: string;
  }[];
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
}

export interface AddToCartData {
  sneakerId: string;
  size: string;
  quantity: number;
  price: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
