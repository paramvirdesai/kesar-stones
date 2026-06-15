import { collectionAsset } from './asset-url';

export type StoneCategory = 'marble' | 'granite' | 'quartz';

export interface StoneSpecifications {
  thicknessOptions: string;
  primaryBaseColor: string;
  materialComposition: string;
  qualityGrade: string;
}

export interface CollectionItem {
  id: string;
  category: StoneCategory;
  name: string;
  thumbnail: string;
  carousel: string[];
  editorial: string;
  quarry: string;
  specs: StoneSpecifications;
}

export interface CollectionCategory {
  id: StoneCategory;
  label: string;
  description: string;
}

export const COLLECTION_CATEGORIES: CollectionCategory[] = [
  {
    id: 'marble',
    label: 'Marble',
    description: 'Heritage Rajsamand marble programs — architectural whites, greens, and commercial grades.'
  },
  {
    id: 'granite',
    label: 'Granite',
    description: 'Export-volume granite selections from Rajasthan quarries and calibrated processing lines.'
  },
  {
    id: 'quartz',
    label: 'Quartz',
    description: 'Engineered quartz and artificial slab programs for hospitality, retail, and developer fit-outs.'
  }
];

export const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: 'green-marble',
    category: 'marble',
    name: 'Green Marble',
    thumbnail: collectionAsset('marble/green marble/green-marble-thumbnail.jpeg'),
    carousel: [
      collectionAsset('marble/green marble/green-marble-carousel-1.png'),
      collectionAsset('marble/green marble/green-marble-carousel-2.png'),
      collectionAsset('marble/green marble/green-marble-carousel-3.png')
    ],
    quarry: 'Rajsamand District, Rajasthan',
    editorial:
      'Forest-toned green marble with distinctive veining suited for feature walls, lobby cladding, and premium hospitality interiors. Quarried and block-graded at our Rajsamand operations for consistent export bundles.',
    specs: {
      thicknessOptions: '18 mm · 20 mm · 30 mm · Custom gang-saw',
      primaryBaseColor: 'Deep forest green with lighter mineral streaks',
      materialComposition: 'Natural metamorphic marble',
      qualityGrade: 'Export Grade A / Commercial Select'
    }
  },
  {
    id: 'makrana-marble',
    category: 'marble',
    name: 'Makrana Marble',
    thumbnail: collectionAsset('marble/makrana white/makrana-marble-thumbnail.jpeg'),
    carousel: [
      collectionAsset('marble/makrana white/makrana-marble-carousel-1.jpeg'),
      collectionAsset('marble/makrana white/makrana-marble-carousel-2.jpeg'),
      collectionAsset('marble/makrana white/makrana-marble-carousel-3.jpeg'),
      collectionAsset('marble/makrana white/makrana-marble-carousel-4.jpeg')
    ],
    quarry: 'Makrana · Rajsamand Region',
    editorial:
      'Iconic Makrana white marble prized for luminosity and fine grain — the material of landmark architecture. Our programs supply bookmatched slabs and cut-to-size for luxury residential and civic projects.',
    specs: {
      thicknessOptions: '18 mm · 20 mm · 30 mm',
      primaryBaseColor: 'Luminous white with subtle grey veining',
      materialComposition: 'Natural calcitic marble',
      qualityGrade: 'Premium Export / Statuario Select'
    }
  },
  {
    id: 'rajnagar-marble',
    category: 'marble',
    name: 'Rajnagar Marble',
    thumbnail: collectionAsset('marble/rajnagar marble/rajnagar-marble-thumbnail.jpeg'),
    carousel: [
      collectionAsset('marble/rajnagar marble/rajnagar-marble-carousel-1.png'),
      collectionAsset('marble/rajnagar marble/rajnagar-marble-carousel-2.png'),
      collectionAsset('marble/rajnagar marble/rajnagar-marble-carousel-3.png'),
      collectionAsset('marble/rajnagar marble/rajnagar-marble-carousel-4.png')
    ],
    quarry: 'Rajnagar · Rajasthan',
    editorial:
      'Rajnagar marble delivers balanced pattern movement for large-format flooring and commercial reception programs. Ideal for distributors requiring repeatable bundle consistency across container loads.',
    specs: {
      thicknessOptions: '18 mm · 20 mm · 30 mm',
      primaryBaseColor: 'Warm white-grey with flowing veins',
      materialComposition: 'Natural marble',
      qualityGrade: 'Commercial Export / B2B Standard'
    }
  },
  {
    id: 'alaska-gold',
    category: 'granite',
    name: 'Alaska Gold',
    thumbnail: collectionAsset('granite/alaska gold/alaska-gold-thumbnail.png'),
    carousel: [
      collectionAsset('granite/alaska gold/alaska-gold-carousel-1.png'),
      collectionAsset('granite/alaska gold/alaska-gold-carousel-2.png'),
      collectionAsset('granite/alaska gold/alaska-gold-carousel-3.png')
    ],
    quarry: 'Rajasthan Granite Belt',
    editorial:
      'Alaska Gold granite pairs warm golden mineral flecks with durable crystalline structure — a high-volume choice for kitchen tops, hotel bathrooms, and retail fit-outs requiring visual warmth.',
    specs: {
      thicknessOptions: '18 mm · 20 mm · 30 mm · 40 mm',
      primaryBaseColor: 'Golden beige with amber and grey crystals',
      materialComposition: 'Natural granite',
      qualityGrade: 'Export Grade A'
    }
  },
  {
    id: 'alaska-white',
    category: 'granite',
    name: 'Alaska White',
    thumbnail: collectionAsset('granite/alaska white/alaska-white-thumbnail.png'),
    carousel: [
      collectionAsset('granite/alaska white/alaska-white-carousel-1.jpg'),
      collectionAsset('granite/alaska white/alaska-white-carousel-2.jpg'),
      collectionAsset('granite/alaska white/alaska-white-carousel-3.jpg')
    ],
    quarry: 'Rajasthan Granite Belt',
    editorial:
      'Alaska White is a flagship white granite program with crisp background tone and controlled grey speckling — specified globally for countertops, cladding, and large commercial slabs.',
    specs: {
      thicknessOptions: '18 mm · 20 mm · 30 mm',
      primaryBaseColor: 'Bright white with grey and black flecks',
      materialComposition: 'Natural granite',
      qualityGrade: 'Premium Export / First Choice'
    }
  },
  {
    id: 'cloud-azure',
    category: 'granite',
    name: 'Cloud Azure',
    thumbnail: collectionAsset('granite/Cloud Azure/cloud-azure-thumbnail.png'),
    carousel: [
      collectionAsset('granite/Cloud Azure/cloud-azure-carousel-1.png'),
      collectionAsset('granite/Cloud Azure/cloud-azure-carousel-2.png'),
      collectionAsset('granite/Cloud Azure/cloud-azure-carousel-3.png')
    ],
    quarry: 'Rajasthan · Partner Quarries',
    editorial:
      'Cloud Azure granite features soft blue-grey clouding across a neutral field — suited for contemporary interiors, spa environments, and minimalist architectural stone specifications.',
    specs: {
      thicknessOptions: '18 mm · 20 mm · 30 mm',
      primaryBaseColor: 'Blue-grey cloud on light grey base',
      materialComposition: 'Natural granite',
      qualityGrade: 'Export Grade A / Commercial'
    }
  },
  {
    id: 'fantasy-brown',
    category: 'granite',
    name: 'Fantasy Brown',
    thumbnail: collectionAsset('granite/fantasy brown/fantasy-brown-thumbnail.jpeg'),
    carousel: [
      collectionAsset('granite/fantasy brown/fantasy-brown-carousel-1.jpeg'),
      collectionAsset('granite/fantasy brown/fantasy-brown-carousel-2.jpg'),
      collectionAsset('granite/fantasy brown/fantasy-brown-carousel-3.jpg')
    ],
    quarry: 'Rajasthan Granite Belt',
    editorial:
      'Fantasy Brown delivers dramatic movement with warm brown, amber, and grey tones — a designer favorite for statement islands, feature walls, and hospitality reception desks.',
    specs: {
      thicknessOptions: '18 mm · 20 mm · 30 mm',
      primaryBaseColor: 'Warm brown with amber and grey movement',
      materialComposition: 'Natural granite',
      qualityGrade: 'Premium Select / Export Grade A'
    }
  },
  {
    id: 'sahara-linen',
    category: 'granite',
    name: 'Sahara Linen',
    thumbnail: collectionAsset('granite/Sahara Linen/sahara-linen-thumbnail.png'),
    carousel: [
      collectionAsset('granite/Sahara Linen/sahara-linen-carousel-1.png'),
      collectionAsset('granite/Sahara Linen/sahara-linen-carousel-2.png'),
      collectionAsset('granite/Sahara Linen/sahara-linen-carousel-3.png')
    ],
    quarry: 'Rajasthan Granite Belt',
    editorial:
      'Sahara Linen offers a refined linen-like texture in neutral sand tones — ideal for large floor plates, corporate lobbies, and developer programs requiring understated luxury.',
    specs: {
      thicknessOptions: '18 mm · 20 mm · 30 mm',
      primaryBaseColor: 'Sand linen with subtle taupe veining',
      materialComposition: 'Natural granite',
      qualityGrade: 'Commercial Export / B2B Standard'
    }
  },
  {
    id: 'thorn-frost',
    category: 'granite',
    name: 'Thorn Frost',
    thumbnail: collectionAsset('granite/Thorn Frost/thorn-frost-thumbnail.png'),
    carousel: [
      collectionAsset('granite/Thorn Frost/thorn-frost-carousel-1.png'),
      collectionAsset('granite/Thorn Frost/thorn-frost-carousel-2.jpeg')
    ],
    quarry: 'Rajasthan · Partner Quarries',
    editorial:
      'Thorn Frost granite presents cool frost-white crystalline structure with delicate grey thorns — specified for high-end kitchens and boutique commercial interiors.',
    specs: {
      thicknessOptions: '18 mm · 20 mm · 30 mm',
      primaryBaseColor: 'Frost white with grey thorn-like veining',
      materialComposition: 'Natural granite',
      qualityGrade: 'Premium Export'
    }
  },
  {
    id: 'visconsin-white',
    category: 'granite',
    name: 'Visconsin White',
    thumbnail: collectionAsset('granite/visconsin white/viscon-white-thumbnail.jpg'),
    carousel: [
      collectionAsset('granite/visconsin white/viscon-white-carousel-1.jpg'),
      collectionAsset('granite/visconsin white/Viscon-White-carousel-2.jpg')
    ],
    quarry: 'Rajasthan Granite Belt',
    editorial:
      'Visconsin White is a bright, consistent white granite program for volume export — favored by distributors building container programs for North American and Middle East markets.',
    specs: {
      thicknessOptions: '18 mm · 20 mm · 30 mm',
      primaryBaseColor: 'Clean white with light grey crystals',
      materialComposition: 'Natural granite',
      qualityGrade: 'Export Grade A / High Volume'
    }
  },
  {
    id: 'patagonia-quartz',
    category: 'quartz',
    name: 'Patagonia Quartz',
    thumbnail: collectionAsset('raw-patagonia-quartz.jpg'),
    carousel: [collectionAsset('raw-patagonia-quartz.jpg'), collectionAsset('luxury-patagonia-wall.jpg')],
    quarry: 'Engineered · Partner Facility',
    editorial:
      'Patagonia-inspired engineered quartz with dramatic movement for feature walls and backlit installations. Available for artificial slab export programs and mixed container loads.',
    specs: {
      thicknessOptions: '12 mm · 20 mm · 30 mm',
      primaryBaseColor: 'Warm white-grey with bold veining',
      materialComposition: 'Engineered quartz · resin-bound',
      qualityGrade: 'Commercial / Hospitality Grade'
    }
  },
  {
    id: 'engineered-white',
    category: 'quartz',
    name: 'Engineered White Series',
    thumbnail: collectionAsset('raw-alaskan-white.jpg'),
    carousel: [collectionAsset('raw-alaskan-white.jpg'), collectionAsset('luxury-alaska-kitchen.jpg')],
    quarry: 'Engineered · Partner Facility',
    editorial:
      'High-volume engineered white quartz for developer and distributor programs — consistent slab sizing, calibrated thickness, and export-ready crating for global ports.',
    specs: {
      thicknessOptions: '12 mm · 20 mm · 30 mm',
      primaryBaseColor: 'Pure white with optional fine grain',
      materialComposition: 'Engineered quartz',
      qualityGrade: 'Export Standard / B2B Volume'
    }
  }
];

export function getCategory(id: string): CollectionCategory | undefined {
  return COLLECTION_CATEGORIES.find((c) => c.id === id);
}

export function getItemsByCategory(category: StoneCategory): CollectionItem[] {
  return COLLECTION_ITEMS.filter((item) => item.category === category);
}

export function getCollectionItem(category: string, itemId: string): CollectionItem | undefined {
  return COLLECTION_ITEMS.find((item) => item.category === category && item.id === itemId);
}
