// Mock API layer for development
import { Sneaker } from '@/types';

const mockSneakers: Sneaker[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  name: ['Air Jordan 1', 'Nike Dunk Low', 'Yeezy 350 V2', 'New Balance 550', 'Air Force 1', 'Jordan 4', 'SB Dunk High', 'Samba OG', 'Chuck 70', 'Suede Classic', 'Old Skool', 'Club C 85'][i],
  brand: ['Nike', 'Nike', 'Adidas', 'New Balance', 'Nike', 'Nike', 'Nike', 'Adidas', 'Converse', 'Puma', 'Vans', 'Reebok'][i],
  model: String(i + 1),
  colorway: 'Classic',
  price: i === 0 ? '17999' : i === 1 ? '9999' : i === 2 ? '23999' : i === 3 ? '15999' : i === 4 ? '6999' : i === 5 ? '19999' : i === 6 ? '21999' : i === 7 ? '11999' : String(100 + i * 20),
  originalPrice: i % 3 === 0 ? String(120 + i * 20) : undefined,
  image: i === 0 ? '/AJ1.jpeg' : i === 1 ? '/cacao.jpeg' : i === 2 ? '/cbr.jpg' : i === 3 ? '/nb550.jpeg' : i === 4 ? '/Af1.jpeg' : i === 5 ? '/AJ4.jpeg' : i === 6 ? '/sb.avif' : i === 7 ? '/samba.jpeg' : `https://images.unsplash.com/photo-${i + 1}-7eec264c27ff?w=500&h=500&fit=crop`,
  images: i === 0 ? ['/AJ1.jpeg'] : i === 1 ? ['/cacao.jpeg'] : i === 2 ? ['/cbr.jpg'] : i === 3 ? ['/nb550.jpeg'] : i === 4 ? ['/Af1.jpeg'] : i === 5 ? ['/AJ4.jpeg'] : i === 6 ? ['/sb.avif'] : i === 7 ? ['/samba.jpeg'] : [`https://images.unsplash.com/photo-${i + 1}-7eec264c27ff?w=500&h=500&fit=crop`],
  description: 'Premium sneaker with exceptional quality and style.',
  category: i % 2 === 0 ? 'Basketball' : 'Lifestyle',
  sizes: ['8', '9', '10', '11', '12'],
  stock: 20 + i * 5,
  featured: i < 6,
  createdAt: new Date(),
}));

export const api = {
  getCartItems: async () => { await new Promise(r => setTimeout(r, 500)); return []; },
  addToCart: async (item: any) => { console.log('Add to cart:', item); return { success: true }; },
  removeFromCart: async (itemId: string) => { console.log('Remove from cart:', itemId); return { success: true }; },
  getSneakers: async () => { await new Promise(r => setTimeout(r, 800)); return mockSneakers; },
  getSneakerById: async (id: string) => { await new Promise(r => setTimeout(r, 400)); return mockSneakers.find(s => s.id === id) || null; },
  getTrendingSneakers: async () => { await new Promise(r => setTimeout(r, 600)); return mockSneakers.filter(s => s.featured); },
  getMarketplaceSneakers: async () => { await new Promise(r => setTimeout(r, 700)); return mockSneakers.filter(s => s.stock > 0); },
  getUserProfile: async () => null,
};
