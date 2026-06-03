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

export interface GalleryPiece {
  id: string;
  layout: 'wide' | 'offset' | 'glow';
  title: string;
  subtitle: string;
  category: string;
  image: string;
  specs?: string;
}

export interface StoryMosaicImage {
  src: string;
  alt: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  location: string;
}

export interface ComplianceBadge {
  code: string;
  title: string;
  subtitle: string;
  value?: string;
  prominent?: boolean;
}

export const HERO_TITLE_PRIMARY = 'Sourced from the Earth.';
export const HERO_TITLE_SECONDARY = 'Delivered to the World.';
export const HERO_TAGLINE = 'From Rajsamand to the Global Horizon.';
export const HERO_SUBTITLE =
  'Streamlined export pipelines to the United States, China, and the Middle East — precision quarrying, QA, and port-ready logistics.';

export const STORY_PARAGRAPHS = [
  'Iconic Stones owns and operates quarry assets in Rajsamand, Rajasthan — supplying granite, marble, quartzite, and engineered programs to distributors and developers across North America, China, and the Middle East.',
  'We are processors, not brokers. From block extraction and gang-saw processing to resin treatment, QA inspection, and ISPM-15 export crating, every container is documented for B2B procurement teams.',
  'Our asymmetric supply model pairs finished architectural applications with transparent raw bundle inventory — built for commercial importers who need both specification confidence and wholesale volume.'
];

export const STORY_MOSAIC: StoryMosaicImage[] = [
  {
    src: SITE_ASSETS.storyQuarryBlocks,
    alt: 'Quarry floor blocks at Rajsamand extraction site'
  },
  {
    src: SITE_ASSETS.storyCraneRajsamand,
    alt: 'Heavy crane operating in Rajsamand quarry'
  }
];

export const GALLERY_SHOWCASE: GalleryPiece[] = [
  {
    id: 'alaska-white-kitchen',
    layout: 'wide',
    title: 'Alaska White Granite',
    subtitle: 'Premium kitchen countertop application',
    category: 'Finished Application',
    image: SITE_ASSETS.luxuryAlaskaWhiteKitchen,
    specs: 'Polished slab · Residential & commercial fit-out'
  },
  {
    id: 'commercial-reception',
    layout: 'offset',
    title: 'Commercial Reception',
    subtitle: 'Luxury bookmatched marble reception desk',
    category: 'High-End B2B Project',
    image: SITE_ASSETS.luxuryCommercialReception,
    specs: 'Flagship hospitality & corporate interiors'
  },
  {
    id: 'patagonia-backlit',
    layout: 'glow',
    title: 'Patagonia Quartzite',
    subtitle: 'Backlit architectural feature wall',
    category: 'Architectural Feature',
    image: SITE_ASSETS.luxuryPatagoniaBacklit,
    specs: 'Translucent quartzite · Illuminated installation'
  }
];

export const RAW_SLIDER_CARDS: ShowcaseCard[] = [
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
    id: 'fantasy-brown-raw',
    title: 'Fantasy Brown',
    subtitle: 'Warm-toned granite bundle program',
    category: 'Raw Inventory',
    image: SITE_ASSETS.rawFantasyBrown,
    kind: 'raw',
    specs: 'Commercial & hospitality projects'
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

export const GST_NUMBER = 'XXAAAAA0000A1Z5';
export const IEC_NUMBER = 'XXXXXXXXXX';

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Rajsamand Quarrying',
    description: 'Precision quarrying, vein mapping, and block grading at our Rajasthan operations.',
    location: 'Rajsamand District, India'
  },
  {
    step: 2,
    title: 'Quality Assurance',
    description: 'Thickness calibration, finish control, resin treatment, and pre-export inspection.',
    location: 'Processing & QA Facilities'
  },
  {
    step: 3,
    title: 'Global Export',
    description: 'Port programs to USA, China, UAE, and expanding North American distributor networks.',
    location: 'USA · China · UAE · Canada'
  }
];

export const COMPLIANCE_BADGES: ComplianceBadge[] = [
  {
    code: 'GST',
    title: 'GST Registration',
    subtitle: 'Government of India',
    value: GST_NUMBER,
    prominent: true
  },
  {
    code: 'IEC',
    title: 'Export-Import Code',
    subtitle: 'DGFT Authorized',
    value: IEC_NUMBER,
    prominent: true
  },
  {
    code: 'QA',
    title: 'Quality Assurance',
    subtitle: 'Pre-Export Inspection'
  },
  {
    code: 'EXP',
    title: 'Export Verified',
    subtitle: 'International Trade Ready'
  }
];
