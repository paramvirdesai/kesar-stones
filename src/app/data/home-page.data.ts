import { SITE_ASSETS } from './site-assets';

export interface ShowcaseCard {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  kind: 'application' | 'raw';
  specs?: string;
}

export interface StoryMosaicImage {
  src: string;
  alt: string;
  span: string;
}

export const HERO_HEADLINE =
  'FROM OUR QUARRIES IN INDIA TO THE WORLD: ICONIC STONES.';

export const STORY_MOSAIC: StoryMosaicImage[] = [
  {
    src: SITE_ASSETS.storyQuarryBlocks,
    alt: 'Quarry floor blocks at Rajsamand extraction site',
    span: 'col-span-7 row-span-6'
  },
  {
    src: SITE_ASSETS.storyCraneRajsamand,
    alt: 'Heavy crane operating in Rajsamand quarry',
    span: 'col-span-5 row-span-6'
  }
];

export const LUXURY_APPLICATION_CARDS: ShowcaseCard[] = [
  {
    id: 'alaska-white-kitchen',
    title: 'Alaska White Granite',
    subtitle: 'Premium kitchen countertop application',
    category: 'Finished Application',
    image: SITE_ASSETS.luxuryAlaskaWhiteKitchen,
    kind: 'application',
    specs: 'Polished slab · Residential & commercial fit-out'
  },
  {
    id: 'commercial-reception',
    title: 'Commercial Reception',
    subtitle: 'High-end B2B hospitality project',
    category: 'Finished Application',
    image: SITE_ASSETS.luxuryCommercialReception,
    kind: 'application',
    specs: 'Bookmatched marble · Flagship interiors'
  },
  {
    id: 'patagonia-backlit',
    title: 'Patagonia Quartzite',
    subtitle: 'Backlit architectural feature wall',
    category: 'Finished Application',
    image: SITE_ASSETS.luxuryPatagoniaBacklit,
    kind: 'application',
    specs: 'Translucent quartzite · Architectural lighting'
  }
];

export const RAW_INVENTORY_CARDS: ShowcaseCard[] = [
  {
    id: 'fantasy-brown',
    title: 'Fantasy Brown',
    subtitle: 'Exotic quartzite texture · bundle grade',
    category: 'Raw Inventory',
    image: SITE_ASSETS.rawFantasyBrown,
    kind: 'raw',
    specs: 'Rajsamand quarry origin'
  },
  {
    id: 'alaskan-white-raw',
    title: 'Alaskan White',
    subtitle: 'High-volume white granite bundles',
    category: 'Raw Inventory',
    image: SITE_ASSETS.rawAlaskanWhite,
    kind: 'raw',
    specs: 'Export-grade slab stock'
  },
  {
    id: 'patagonia-commercial',
    title: 'Patagonia — Commercial',
    subtitle: 'Mixed commercial bundle program',
    category: 'Raw Inventory',
    image: SITE_ASSETS.rawPatagoniaCommercial,
    kind: 'raw',
    specs: 'Container-ready commercial lots'
  },
  {
    id: 'patagonia-quartz',
    title: 'Patagonia — Quartz',
    subtitle: 'Quartz program variety',
    category: 'Raw Inventory',
    image: SITE_ASSETS.rawPatagoniaQuartz,
    kind: 'raw',
    specs: 'Wholesale distributor allocations'
  }
];

export const RAW_HOVER_OVERLAY = 'Available for Container Load / Wholesale Export';
