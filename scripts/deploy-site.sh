#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REGION="${AWS_REGION:-us-east-1}"
STACK="iconic-stones-site"

echo "→ Building Angular production bundle…"
cd "$ROOT"
npm run build -- --configuration production

BUCKET=$(aws cloudformation describe-stacks \
  --stack-name "$STACK" \
  --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='SiteBucketName'].OutputValue" \
  --output text)

DIST_ID=$(aws cloudformation describe-stacks \
  --stack-name "$STACK" \
  --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" \
  --output text)

SITE_URL=$(aws cloudformation describe-stacks \
  --stack-name "$STACK" \
  --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='SiteUrl'].OutputValue" \
  --output text)

echo "→ Syncing to s3://$BUCKET …"
aws s3 sync "$ROOT/dist/marble-granite-site/browser/" "s3://$BUCKET/" \
  --delete \
  --region "$REGION" \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html" \
  --exclude "*.html"

aws s3 cp "$ROOT/dist/marble-granite-site/browser/index.html" "s3://$BUCKET/index.html" \
  --region "$REGION" \
  --cache-control "public,max-age=0,must-revalidate" \
  --content-type "text/html"

echo "→ Invalidating CloudFront cache…"
aws cloudfront create-invalidation \
  --distribution-id "$DIST_ID" \
  --paths "/*" \
  --query "Invalidation.Id" \
  --output text > /dev/null

echo "✓ Site live at $SITE_URL"
