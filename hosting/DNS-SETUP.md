# DNS setup — free (GoDaddy only, no Route 53)

Your site runs on **CloudFront (free tier)**. DNS stays on **GoDaddy at no extra cost**.

CloudFront URL (always works): `d1test7if1ww5r.cloudfront.net`

---

## Why those locked `@` A records exist

```
A  @  15.197.225.128   (Can't delete)
A  @  3.33.251.168     (Can't delete)
```

GoDaddy **locks** these when **Website Builder** or **Domain Forwarding** is active. They are normal — you fix behavior in GoDaddy settings, not by deleting them.

---

## Free setup (recommended)

### 1. Disconnect GoDaddy Website Builder

1. GoDaddy → **My Products**
2. Find **Website Builder** or **Websites** tied to `theiconicstones.com`
3. **Delete / unpublish / disconnect** the site (the “launching soon” page)
4. Domain should show **No website connected**

Until this is done, `theiconicstones.com` will keep showing GoDaddy’s placeholder.

### 2. Domain Forwarding (root → www only)

GoDaddy → **theiconicstones.com** → **Forwarding** (not the DNS tab)

| Setting | Value |
|---------|--------|
| Forward **theiconicstones.com** | `https://www.theiconicstones.com` |
| Type | Permanent (301) |
| Forward **www** | **None / remove** |

If www forwards to the root, your site will break. Only forward **root → www**.

### 3. DNS tab records

Keep:

| Type | Name | Data |
|------|------|------|
| CNAME | www | `d1test7if1ww5r.cloudfront.net` |
| CNAME | `_4777fddb...www` | (ACM validation — keep) |
| CNAME | `_6896fdd...` | (ACM validation — keep) |
| MX | @ | `smtp.google.com` (Priority 1) |
| TXT | @ | Google verification (keep) |

**Do not add** a manual A record on `@` — GoDaddy manages `@` when forwarding is on.

Locked `@` A records from forwarding are **OK** if step 2 forwards root → www.

---

## Expected result

| URL | Behavior |
|-----|----------|
| https://www.theiconicstones.com | Your Iconic Stones site (CloudFront) |
| https://theiconicstones.com | Redirects to www → your site |

---

## If www still redirects to the root

1. Forwarding tab → **remove** any www rule
2. DNS tab → www must be **only** CNAME → `d1test7if1ww5r.cloudfront.net`
3. Wait 15–30 minutes, test in **incognito**

---

## Total cost

| Service | Cost |
|---------|------|
| GoDaddy DNS | Included with domain |
| CloudFront + S3 | AWS free tier |
| Route 53 | **Not used** ($0) |
