# Marble Granite Premium Website

Apple-level Angular 17 + Tailwind luxury stone website with serverless AWS lead-capture backend.

## What Is Included

- Full-screen immersive hero with animated typography and scroll indicator
- Scroll-based storytelling sections with IntersectionObserver reveal utility
- Premium product showcase with hover zoom/parallax feel, filters, and detail modal carousel
- Luxury micro-interactions (buttons, navbar morph on scroll, smooth transitions)
- Sliding testimonials, process timeline, and premium stats section
- Sticky WhatsApp floating CTA
- Lead/contact forms integrated with AWS API Gateway endpoint
- Lambda + DynamoDB backend for lead storage

## Project Structure

```text
src/
  app/
    components/
    pages/
    directives/reveal-on-scroll.directive.ts
    services/lead-api.service.ts
  environments/environment.ts
backend/
  lambda/lead/index.mjs
  lambda/lead/package.json
  template.yaml
```

## Local Development

```bash
npm install
npm start
```

Build for production:

```bash
npm run build
```

## Environment Setup

Set your API Gateway base URL in `src/environments/environment.ts`:

```ts
apiBaseUrl: 'https://<api-id>.execute-api.<region>.amazonaws.com/prod'
```

Use `.env.example` as reference for deployment-time values.

## Backend Deployment (AWS Free Tier)

Prerequisites:

- AWS account (free tier)
- AWS CLI configured (`aws configure`)
- SAM CLI installed
- Region example: `ap-south-1`

### 1) Prepare Lambda package dependencies

```bash
cd backend/lambda/lead
npm install
cd ../../..
```

### 2) Deploy Lambda + API Gateway + DynamoDB

```bash
cd backend
sam build
sam deploy --guided
```

During `sam deploy --guided`:

- Stack name: `marble-granite-stack`
- Region: your region
- Confirm changes: `Y`
- Allow IAM role creation: `Y`
- Save arguments: `Y`

After deployment, note API URL from stack outputs and update:

- `src/environments/environment.ts`

### 3) CORS

CORS is already handled in Lambda responses (`OPTIONS,POST` + `Access-Control-Allow-Origin: *`).

## Frontend Deployment (S3 + optional CloudFront)

### 1) Build frontend

```bash
npm run build
```

### 2) Create S3 bucket (free tier eligible)

```bash
aws s3 mb s3://your-marble-site-bucket --region ap-south-1
```

### 3) Enable static website hosting and upload

```bash
aws s3 website s3://your-marble-site-bucket --index-document index.html --error-document index.html
aws s3 sync dist/marble-granite-site/browser s3://your-marble-site-bucket --delete
```

### 4) Bucket policy for public read (static hosting)

Apply a bucket policy allowing `s3:GetObject` for `arn:aws:s3:::your-marble-site-bucket/*`.

### 5) Optional CloudFront (recommended)

- Create CloudFront distribution with S3 website endpoint as origin
- Set default root object to `index.html`
- Invalidate cache on deploy:

```bash
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"
```

## Lead API Contract

`POST /lead` body:

```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "company": "ACME Interiors",
  "message": "Need premium marble for lobby."
}
```

Success: `201 { "message": "Lead captured successfully." }`
