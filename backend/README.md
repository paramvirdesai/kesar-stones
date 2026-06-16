# Lead capture backend (AWS SAM)

Form submissions from the Angular site POST to `/lead`. Each inquiry is:

1. Saved to DynamoDB (`marble-granite-leads`)
2. Emailed via Amazon SES to `info@theiconicstones.com` (reply-to set to the submitter)

## Prerequisites

- [AWS CLI](https://aws.amazon.com/cli/) configured (`aws configure`)
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- Node.js 18+

## One-time SES setup

SES starts in **sandbox** mode. Until you request production access:

1. Open **Amazon SES** in your deploy region (default: `ap-south-1`).
2. **Verified identities** → verify `info@theiconicstones.com` (or your chosen sender).
3. In sandbox, **also verify** any recipient addresses you test with.
4. When ready for live traffic: SES → **Account dashboard** → **Request production access**.

`FromEmail` and `RecipientEmail` in the stack must use verified identities while in sandbox.

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
| Region | `ap-south-1` (or your preferred region) |
| FromEmail | `info@theiconicstones.com` |
| RecipientEmail | `info@theiconicstones.com` |

After deploy, copy **LeadApiBaseUrl** from stack Outputs.

## Connect the frontend

Edit `src/environments/environment.production.ts`:

```ts
apiBaseUrl: 'https://YOUR_API_ID.execute-api.ap-south-1.amazonaws.com/Prod',
```

Rebuild and redeploy the static site:

```bash
npm run build
```

## Test the endpoint

```bash
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
| `MessageRejected` from SES | Verify sender/recipient in SES; check sandbox limits |
| CORS error in browser | Redeploy stack; confirm `apiBaseUrl` has no trailing slash |
| 500 after form submit | CloudWatch logs for `marble-granite-lead` Lambda |
| Form succeeds, no email | SES identity not verified or wrong region |
