# Lead capture backend (AWS SAM) — free-tier friendly

Form submissions POST to `/lead`. Each inquiry is:

1. Saved to DynamoDB (`marble-granite-leads`)
2. Emailed via Amazon SES to `info@theiconicstones.com` (reply-to = submitter)

## Is this completely free?

**Yes, for a B2B site at normal inquiry volume** — this stack is designed to stay within AWS free-tier limits.

| Service | What we use | Free tier (typical) | Your expected usage |
|---------|-------------|---------------------|---------------------|
| **Lambda** | 1 function, 128 MB | **Always free:** 1M requests + 400K GB-seconds / month | Dozens–hundreds of form submits / month |
| **API Gateway (HTTP API)** | 1 route `/lead` | **1M calls / month** (free tier on new accounts) | Same as form submits |
| **DynamoDB** | On-demand, 1 write per lead | **Always free:** 25 GB storage + generous request allowance | 1 row per inquiry |
| **SES** | 1 email per lead, sent from Lambda | **Free when sent from Lambda** (62K/month in eligible regions) | 1 email per inquiry |
| **CloudWatch Logs** | Lambda logs | First 5 GB ingestion / month free | Minimal |

**Example:** 200 inquiries/month → well under every limit → **$0/month**.

After free-tier periods expire on some services, cost at this scale is still negligible (e.g. API Gateway ≈ $0.20 per 200K calls). No servers, no always-on charges.

### What is NOT included here

- **Static site hosting** (S3 + CloudFront) — separate; also has free tier (5 GB S3, 1 TB CloudFront out / month).
- **Custom domain / Route 53** — domain registration costs ~$12/year; hosted zone ~$0.50/month.
- **SES sandbox** — free to use, but you must verify identities; production access is free to request.

### Cost safety tips

- Do not add NAT Gateway, EC2, or RDS — those are not free.
- Keep this single Lambda + HTTP API stack; no provisioned DynamoDB capacity.
- Monitor **AWS Billing → Free tier** in the console after deploy.

---

## Prerequisites

- [AWS CLI](https://aws.amazon.com/cli/) configured (`aws configure`)
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- Node.js 18+

## One-time SES setup

SES starts in **sandbox** mode. Until you request production access:

1. Open **Amazon SES** in your deploy region (recommended: `us-east-1` or `ap-south-1`).
2. **Verified identities** → verify `info@theiconicstones.com` (or your sender).
3. In sandbox, **also verify** any recipient addresses you test with.
4. When ready for live traffic: SES → **Account dashboard** → **Request production access** (no charge).

`FromEmail` and `RecipientEmail` must be verified while in sandbox.

> **Region note:** Deploy the stack in the **same region** where you verified SES identities.

## Deploy

```bash
cd backend
npm install --prefix lambda/lead
sam build
sam deploy --guided
```

Suggested guided answers:

| Prompt | Value |
|--------|--------|
| Stack name | `iconic-stones-leads` |
| Region | Same region as SES verification |
| FromEmail | `info@theiconicstones.com` |
| RecipientEmail | `info@theiconicstones.com` |

After deploy, copy **LeadApiBaseUrl** from stack Outputs.

Or from the repo root:

```bash
npm run backend:install
npm run backend:deploy
```

## Connect the frontend

Edit `src/environments/environment.production.ts`:

```ts
apiBaseUrl: 'https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com',
```

Use the exact **LeadApiBaseUrl** output — **no `/Prod` suffix** (HTTP API).

Rebuild and redeploy the static site:

```bash
npm run build
```

## Test the endpoint

```bash
API_BASE="https://YOUR_API_ID.execute-api.REGION.amazonaws.com"

curl -X POST "$API_BASE/lead" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "you@example.com",
    "company": "Test Co",
    "message": "B2B test inquiry from curl"
  }'
```

Expected: `201` and an email in the recipient inbox.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `MessageRejected` from SES | Verify sender/recipient in SES; same region as Lambda |
| CORS error in browser | Redeploy stack; `apiBaseUrl` must match Output exactly |
| 500 after form submit | CloudWatch logs → `/aws/lambda/marble-granite-lead` |
| Form succeeds, no email | SES identity not verified or wrong region |
| Unexpected AWS bill | Billing → Cost Explorer; set a **$1 budget alert** |

## Stack design (why these choices)

- **HTTP API** instead of REST API — lower cost, built-in CORS, sufficient for one POST route.
- **Lambda 128 MB** — enough for this handler; minimizes compute free-tier usage.
- **DynamoDB on-demand** — no provisioned capacity charges; pay only per request (free at low volume).
- **No VPC** — avoids NAT Gateway fees (~$32/month).
