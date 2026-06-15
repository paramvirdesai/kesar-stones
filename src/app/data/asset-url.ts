/** Build a root-absolute URL for files under `/public/assets/` (handles spaces in folder names). */
export function collectionAsset(relativePath: string): string {
  return `/assets/${relativePath.split('/').map(encodeURIComponent).join('/')}`;
}
