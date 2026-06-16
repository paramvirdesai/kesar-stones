import { environment } from '../../environments/environment';

/** Bust browser cache on each dev page load when static assets are replaced in `public/`. */
const DEV_ASSET_BUST = Date.now();

/** Build a root-absolute URL for files under `/public/assets/` (handles spaces in folder names). */
export function collectionAsset(relativePath: string): string {
  const base = `/assets/${relativePath.split('/').map(encodeURIComponent).join('/')}`;
  const version = environment.production ? environment.assetVersion : DEV_ASSET_BUST;
  return version ? `${base}?v=${version}` : base;
}
