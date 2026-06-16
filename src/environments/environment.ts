export const environment = {
  production: false,
  /** Local dev: use deployed API URL, or forms will fail. See backend/README.md */
  apiBaseUrl: 'https://REPLACE_WITH_API_ID.execute-api.ap-south-1.amazonaws.com/Prod',
  corporateEmail: 'info@theiconicstones.com',
  /** Bump after replacing images in `public/` before a production deploy. */
  assetVersion: ''
};
