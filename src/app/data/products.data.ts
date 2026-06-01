import { StoneProduct } from '../models/stone-product.model';
import { SITE_ASSETS } from './site-assets';

export const FEATURED_MATERIALS: StoneProduct[] = [
  {
    id: 1,
    name: 'Alaskan White',
    category: 'Granite',
    origin: 'India',
    description: 'Premium white granite with consistent grain for high-volume export programs.',
    imageUrl: SITE_ASSETS.rawAlaskanWhite,
    quarryLabel: 'Origin: Rajsamand Quarry',
    finishNote: 'Polished · Export Grade A',
    featured: true
  },
  {
    id: 2,
    name: 'Fantasy Brown',
    category: 'Quartzite',
    origin: 'India',
    description: 'Exotic brown veining with dramatic movement for architectural facades.',
    imageUrl: SITE_ASSETS.rawFantasyBrown,
    quarryLabel: 'Origin: Rajsamand Quarry',
    finishNote: 'Honed / Polished · Exotic Grade',
    featured: true
  },
  {
    id: 3,
    name: 'Patagonia Marble',
    category: 'Marble',
    origin: 'India',
    description: 'Luxury exotic marble for flagship commercial and hospitality projects.',
    imageUrl: SITE_ASSETS.rawPatagoniaCommercial,
    quarryLabel: 'Origin: Rajasthan Processing Hub',
    finishNote: 'Bookmatched Slabs Available',
    featured: true
  },
  {
    id: 4,
    name: 'Viscon White',
    category: 'Granite',
    origin: 'India',
    description: 'Classic durable white granite for cladding and large-format slabs.',
    imageUrl: SITE_ASSETS.luxuryAlaskaWhiteKitchen,
    quarryLabel: 'Origin: Rajsamand Quarry',
    finishNote: 'Polished · High Density',
    featured: true
  }
];

export const MATERIAL_OPTIONS = [
  'Alaskan White (Granite)',
  'Fantasy Brown (Quartzite)',
  'Patagonia Marble',
  'Viscon White (Granite)',
  'Quartz Slabs',
  'Artificial Stone Slabs',
  'Mixed Container / Multiple Varieties',
  'Other — Specify in Message'
];
