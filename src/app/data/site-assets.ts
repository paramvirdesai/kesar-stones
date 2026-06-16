/**
 * Public assets live in `/public/assets/` (copied to `/assets/` at build time).
 * Use root-absolute paths so images resolve on every route.
 */
const asset = (file: string) => `/assets/${file}`;

export const SITE_ASSETS = {
  heroQuarryPanorama: asset('story/quarry.jpg'),
  storyQuarryBlocks: asset('story-quarry-blocks.jpg'),
  storyCraneRajsamand: asset('story-crane.jpg'),
  luxuryAlaskaWhiteKitchen: asset('luxury-alaska-kitchen.jpg'),
  luxuryCommercialReception: asset('luxury-reception.jpg'),
  luxuryPatagoniaBacklit: asset('luxury-patagonia-wall.jpg'),
  rawFantasyBrown: asset('raw-fantasy-brown.jpg'),
  rawAlaskanWhite: asset('raw-alaskan-white.jpg'),
  rawPatagoniaCommercial: asset('raw-patagonia-commercial.jpg'),
  rawPatagoniaQuartz: asset('patagonia-quartz.png'),
  workflowLogistics: asset('workflow-logistics.jpg')
} as const;
