#!/usr/bin/env bash
set -euo pipefail

CERT_ARN="arn:aws:acm:us-east-1:019847571143:certificate/c70ea148-e72c-4d68-a895-7b8fa8a92680"
REGION="us-east-1"

STATUS=$(aws acm describe-certificate \
  --region "$REGION" \
  --certificate-arn "$CERT_ARN" \
  --query "Certificate.Status" \
  --output text)

echo "Certificate status: $STATUS"

if [[ "$STATUS" != "ISSUED" ]]; then
  echo ""
  echo "Certificate not issued yet. Add the ACM validation CNAME records in GoDaddy."
  echo "See hosting/DNS-SETUP.md Step 1."
  aws acm describe-certificate \
    --region "$REGION" \
    --certificate-arn "$CERT_ARN" \
    --query "Certificate.DomainValidationOptions[*].{Domain:DomainName,Name:ResourceRecord.Name,Value:ResourceRecord.Value}" \
    --output table
  exit 1
fi

echo "→ Deploying CloudFront with custom domain…"
npm run hosting:deploy

echo ""
echo "✓ Custom domain configured on CloudFront."
echo "  Add www CNAME → d1test7if1ww5r.cloudfront.net in GoDaddy (see hosting/DNS-SETUP.md Step 3)."
