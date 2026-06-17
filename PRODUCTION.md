# Production deployment

Iconic Stones runs entirely on AWS free-tier services at normal traffic.

## Live URLs

| Resource | URL |
|----------|-----|
| **Website (CloudFront)** | https://d1test7if1ww5r.cloudfront.net |
| **Custom domain (after DNS)** | https://www.theiconicstones.com |
| **Lead API** | https://wujhzg97lc.execute-api.us-east-1.amazonaws.com/lead |

## Stacks (us-east-1)

| Stack | Purpose |
|-------|---------|
| `iconic-stones-site` | S3 + CloudFront static hosting |
| `iconic-stones-leads` | Lambda + DynamoDB + SES email |

## Redeploy after code changes

```bash
# Frontend only
npm run site:deploy

# Backend only
npm run backend:deploy

# First-time hosting stack + site
npm run production:deploy
```

## Free tier summary

| Service | Usage |
|---------|--------|
| S3 | ~400 MB static assets |
| CloudFront | HTTPS CDN, SPA routing |
| Lambda + HTTP API | Form submissions |
| DynamoDB | Lead backup storage |
| SES | 1 email per inquiry (from Lambda) |

Set a **$1 AWS budget alert** in Billing for peace of mind.

## Custom domain — www.theiconicstones.com

Domain registrar: **GoDaddy**. SSL certificate requested in ACM (us-east-1).

**Follow `hosting/DNS-SETUP.md`** — add validation CNAMEs in GoDaddy, then run:

```bash
npm run domain:setup
```

This deploys CloudFront with your domain once the certificate is issued.

## SES production access

Production access was requested so forms can email you from any visitor address (not just verified test emails). Check status in **SES → Account dashboard**. Approval usually takes 24–48 hours.
