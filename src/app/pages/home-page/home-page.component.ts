import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { collectionAsset } from '../../data/asset-url';
import { SITE_ASSETS } from '../../data/site-assets';
import {
  COMPLIANCE_BADGES,
  HERO_SUBTITLE,
  HERO_TITLE_PRIMARY,
  HERO_TITLE_SECONDARY,
  STORY_PARAGRAPHS,
  WORKFLOW_STEPS
} from '../../data/home-page.data';
import { MATERIAL_OPTIONS } from '../../data/products.data';
import { COLLECTION_ITEMS } from '../../data/collections.catalog';
import { LeadApiService } from '../../services/lead-api.service';
import {
  fieldInvalid,
  focusFirstFormError,
  getFieldErrorMessage,
  invalidFieldCount
} from '../../utils/form-validation';

export interface WholesaleTickerItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bundleLabel: string;
  origin: string;
  exportNote: string;
  routeCategory: string;
  routeItem: string;
}

export interface FeaturedCollection {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  application: string;
  category: 'marble' | 'granite' | 'quartz';
  slug: string;
  layout: 'hero' | 'tall' | 'standard' | 'wide' | 'accent';
  aspect: 'portrait' | 'landscape';
}

export interface StoryMosaicTile {
  src: string;
  alt: string;
  layout: 'hero' | 'accent' | 'detail';
}

const WHOLESALE_DIR = 'wholesale inventory';
const FEATURED_DIR = 'featured collection';
const STORY_DIR = 'story';

const wholesaleAsset = (file: string) => collectionAsset(`${WHOLESALE_DIR}/${file}`);
const featuredAsset = (file: string) => collectionAsset(`${FEATURED_DIR}/${file}`);

function shortSubtitle(editorial: string): string {
  const sentence = editorial.split('.')[0].trim();
  if (sentence.length <= 80) {
    return `${sentence}.`;
  }
  return `${sentence.slice(0, 77).trim()}…`;
}

function wholesaleTickerFromCatalog(itemId: string, imageFile: string): WholesaleTickerItem {
  const item = COLLECTION_ITEMS.find((entry) => entry.id === itemId)!;
  const categoryLabel = item.category.charAt(0).toUpperCase() + item.category.slice(1);

  return {
    id: `${itemId}-${imageFile}`,
    title: item.name,
    subtitle: shortSubtitle(item.editorial),
    image: wholesaleAsset(imageFile),
    bundleLabel: `${categoryLabel} · Raw Slab`,
    origin: item.quarry,
    exportNote: item.specs.qualityGrade,
    routeCategory: item.category,
    routeItem: item.id
  };
}

/** Maps each file in `public/assets/wholesale inventory` to its catalog collection. */
const WHOLESALE_INVENTORY: readonly { itemId: string; image: string }[] = [
  { itemId: 'alaska-gold', image: 'alaska-gold-raw-slab.png' },
  { itemId: 'alaska-white', image: 'alaska-white-raw-slab.jpg' },
  { itemId: 'cloud-azure', image: 'cloud-azure-carousel-1.png' },
  { itemId: 'fantasy-brown', image: 'fantasy-brown-raw-slab.jpg' },
  { itemId: 'green-marble', image: 'green-marble.png' },
  { itemId: 'sahara-linen', image: 'sahara-linen-carousel-1.png' },
  { itemId: 'viscon-white', image: 'Viscon-White-raw-slab.jpg' },
  { itemId: 'patagonia-quartz', image: 'patagonia-quartz-raw-slab.jpeg' }
];

const WHOLESALE_TICKER_ITEMS: WholesaleTickerItem[] = WHOLESALE_INVENTORY.map(({ itemId, image }) =>
  wholesaleTickerFromCatalog(itemId, image)
);

const HOME_ASSETS = {
  heroQuarry: '/assets/hero-quarry.jpg',
  storyQuarryPanorama: collectionAsset(`${STORY_DIR}/PHOTO-2026-05-09-12-11-13_2.jpg`),
  storyExtraction: collectionAsset(`${STORY_DIR}/our-story-sickel.png`),
  storyQuarryBlocks: collectionAsset(`${STORY_DIR}/quarry.jpg`),
  workflowLogistics: '/assets/export.jpg'
} as const;

/**
 * Finished-application photography from `public/assets/featured collection`.
 * Titles and routes are mapped from what each photo actually shows — not from filenames alone.
 * Quarry / logistics frames in that folder are excluded.
 */
const FEATURED_COLLECTIONS: FeaturedCollection[] = [
  {
    id: 'raw-patagonia-commercial',
    image: featuredAsset('raw-patagonia-commercial.jpg'),
    imageAlt: 'Backlit Patagonia quartzite feature wall and reception desk in a commercial atrium',
    title: 'Patagonia Quartz',
    application: 'Backlit Commercial Atrium Cladding',
    category: 'quartz',
    slug: 'patagonia-quartz',
    layout: 'hero',
    aspect: 'landscape'
  },
  {
    id: 'makrana-marble-carousel-1',
    image: featuredAsset('makrana-marble-carousel-1.jpeg'),
    imageAlt: 'Makrana marble book-matched kitchen island and full-height feature wall',
    title: 'Makrana Marble',
    application: 'Book-Matched Culinary Suite',
    category: 'marble',
    slug: 'makrana-marble',
    layout: 'tall',
    aspect: 'portrait'
  },
  {
    id: 'green-marble-carousel-1',
    image: featuredAsset('green-marble-carousel-1.png'),
    imageAlt: 'Book-matched green marble garden feature wall with arched entry',
    title: 'Green Marble',
    application: 'Exterior Book-Matched Feature Wall',
    category: 'marble',
    slug: 'green-marble',
    layout: 'standard',
    aspect: 'landscape'
  },
  {
    id: 'cloud-azure-carousel-2',
    image: featuredAsset('cloud-azure-carousel-2.png'),
    imageAlt: 'Book-matched Cloud Azure granite fireplace wall in a minimalist living room',
    title: 'Cloud Azure',
    application: 'Book-Matched Living Room Feature Wall',
    category: 'granite',
    slug: 'cloud-azure',
    layout: 'standard',
    aspect: 'landscape'
  },
  {
    id: 'raw-patagonia-quartz',
    image: featuredAsset('raw-patagonia-quartz.jpg'),
    imageAlt: 'Patagonia quartzite kitchen island with full-height slab backsplash',
    title: 'Patagonia Quartz',
    application: 'Monolithic Kitchen Island & Backsplash',
    category: 'quartz',
    slug: 'patagonia-quartz',
    layout: 'standard',
    aspect: 'portrait'
  },
  {
    id: 'gemini-commercial-reception',
    image: featuredAsset('gemini-commercial-reception.png'),
    imageAlt: 'Alaska White granite kitchen island with under-mount sink and dark wood cabinetry',
    title: 'Alaska White',
    application: 'Residential Kitchen Island Surface',
    category: 'granite',
    slug: 'alaska-white',
    layout: 'standard',
    aspect: 'portrait'
  },
  {
    id: 'gemini-patagonia-wall',
    image: featuredAsset('gemini-patagonia-wall.jpg'),
    imageAlt: 'Alaska White granite waterfall island and full-height kitchen backsplash',
    title: 'Alaska White',
    application: 'Waterfall Island & Full-Height Backsplash',
    category: 'granite',
    slug: 'alaska-white',
    layout: 'wide',
    aspect: 'landscape'
  },
  {
    id: 'sahara-linen-carousel-3',
    image: featuredAsset('sahara-linen-carousel-3.png'),
    imageAlt: 'Sahara Linen granite monolithic coffee table in a light-filled residential interior',
    title: 'Sahara Linen',
    application: 'Vein-Cut Monolithic Living Table',
    category: 'granite',
    slug: 'sahara-linen',
    layout: 'accent',
    aspect: 'landscape'
  }
];

const STORY_MOSAIC: StoryMosaicTile[] = [
  {
    src: HOME_ASSETS.storyQuarryPanorama,
    alt: 'Aerial quarry panorama at Rajsamand operations',
    layout: 'hero'
  },
  {
    src: HOME_ASSETS.storyExtraction,
    alt: 'Heavy machinery extracting stone blocks at quarry',
    layout: 'accent'
  },
  {
    src: HOME_ASSETS.storyQuarryBlocks,
    alt: 'Graded quarry blocks staged for export processing',
    layout: 'detail'
  }
];

const WHOLESALE_COPY = {
  eyebrow: 'Wholesale Inventory & Raw Slabs Program',
  title: 'Quarry-direct extraction. Global supply curation.',
  lead:
    'Iconic Stones extracts directly from our flagship Rajsamand quarries while curating world-class stone bundles through an elite international supply network — transparent wholesale programs built for distributors, not blanket ownership claims on every exported lot.',
  body:
    'Every allocation is photographed, graded, and documented for B2B procurement. We coordinate container-ready lots across granite, marble, and engineered quartz — pairing quarry-owned production with vetted partner quarries when your specification demands broader global reach.'
};

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgClass, RouterLink, ReactiveFormsModule, RevealOnScrollDirective],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly leadApi = inject(LeadApiService);

  readonly assets = { ...SITE_ASSETS, ...HOME_ASSETS };
  readonly heroTitlePrimary = HERO_TITLE_PRIMARY;
  readonly heroTitleSecondary = HERO_TITLE_SECONDARY;
  readonly heroSubtitle = HERO_SUBTITLE;
  readonly storyParagraphs = STORY_PARAGRAPHS;
  readonly storyMosaic = STORY_MOSAIC;
  readonly wholesaleCopy = WHOLESALE_COPY;
  readonly wholesaleTickerItems = WHOLESALE_TICKER_ITEMS;
  readonly wholesaleTickerLoop = [...WHOLESALE_TICKER_ITEMS, ...WHOLESALE_TICKER_ITEMS];
  readonly featuredCollections = FEATURED_COLLECTIONS;
  readonly workflow = WORKFLOW_STEPS;
  readonly complianceBadges = COMPLIANCE_BADGES;
  readonly materialOptions = MATERIAL_OPTIONS;

  activeWorkflowStep = 0;
  formSubmitted = false;
  formLoading = false;
  formStatus: 'idle' | 'success' | 'error' = 'idle';

  readonly inquiryForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    destinationPort: ['', [Validators.required, Validators.minLength(2)]],
    materialInterest: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  setActiveWorkflow(step: number): void {
    this.activeWorkflowStep = step;
  }

  readonly fieldInvalid = fieldInvalid;
  readonly fieldError = getFieldErrorMessage;

  invalidFieldCount(): number {
    return invalidFieldCount(this.inquiryForm, this.formSubmitted);
  }

  submitInquiry(): void {
    this.formSubmitted = true;
    this.formStatus = 'idle';
    if (this.inquiryForm.invalid) {
      this.inquiryForm.markAllAsTouched();
      focusFirstFormError();
      return;
    }

    this.formLoading = true;
    const v = this.inquiryForm.getRawValue();
    this.leadApi
      .submitB2BInquiry({
        name: v.name!,
        email: v.email!,
        company: '—',
        destinationPort: v.destinationPort!,
        materialInterest: v.materialInterest!,
        volume: '—',
        message: v.message!
      })
      .pipe(finalize(() => (this.formLoading = false)))
      .subscribe({
        next: () => {
          this.formStatus = 'success';
          this.inquiryForm.reset();
          this.formSubmitted = false;
        },
        error: () => (this.formStatus = 'error')
      });
  }
}
