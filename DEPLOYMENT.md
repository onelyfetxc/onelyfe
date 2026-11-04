# Deployment handoff

## Current status

| Item | Status |
| --- | --- |
| Responsive static website | Complete |
| Custom 404 page | Complete |
| Custom domain file (`CNAME`) | Complete: `onelyfetxc.com` |
| Local Git repository and commits | Complete on `main` |
| GitHub repository | Pending: GitHub sign-in required |
| GitHub Pages publication | Pending: repository required |
| Squarespace DNS change | Pending: GitHub account name and repository required |
| HTTPS certificate | Pending: GitHub Pages and DNS must be active first |

Public DNS checked on November 3, 2026. The apex domain still resolves to the four Squarespace web-hosting addresses, and `www` still points to `ext-sq.squarespace.com`. No DNS changes have been made.

## 1. Create and publish the GitHub repository

1. Sign in to GitHub.
2. Create a new public repository. Suggested name: `one-lyfe-x-txc`.
3. Do not initialize it with a README, `.gitignore`, or license; this folder already contains a Git history.
4. Add the new repository as this local repository's `origin` and push the `main` branch.
5. In the GitHub repository, open **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Choose branch **main**, folder **/(root)**, and save.
8. Under **Custom domain**, enter `onelyfetxc.com` and save. The repository already contains the matching `CNAME` file.

For stronger takeover protection, verify the domain before changing DNS: open the GitHub account or organization **Settings → Pages**, select **Add a domain**, enter `onelyfetxc.com`, and copy the unique TXT record GitHub provides into Squarespace. Keep that TXT record after verification.

## 2. Replace the Squarespace web-hosting records

In Squarespace, open **Domains dashboard → onelyfetxc.com → DNS → DNS Settings**. Remove the **Squarespace Defaults** web-hosting records, or individually remove only the conflicting web records listed below. Preserve mail and verification records such as MX, TXT, DKIM, and DMARC.

Remove these current web records:

| Type | Name | Current data |
| --- | --- | --- |
| A | `@` | `198.185.159.144` |
| A | `@` | `198.185.159.145` |
| A | `@` | `198.49.23.144` |
| A | `@` | `198.49.23.145` |
| CNAME | `www` | `ext-sq.squarespace.com` |

Then add these GitHub Pages records under **Custom Records**:

| Type | Name | Data |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `<GITHUB-USERNAME>.github.io` |

Replace `<GITHUB-USERNAME>` with the owner of the new repository. Enter only the host name in the CNAME Data field—no `https://` and no trailing path. Squarespace's default custom-record TTL is acceptable.

If GitHub provides a domain-verification TXT record, add it as an additional custom record using the exact Name and Text values GitHub displays. Do not substitute a guessed value.

## 3. Verify publication and HTTPS

1. Wait for GitHub's Pages deployment to complete in **Settings → Pages**.
2. Wait for the DNS check beside `onelyfetxc.com` to pass. DNS updates can take time to propagate.
3. When GitHub makes the option available, enable **Enforce HTTPS**.
4. Test both `https://onelyfetxc.com` and `https://www.onelyfetxc.com`. With the apex domain set as the custom domain, GitHub should redirect `www` to the apex.

Avoid wildcard DNS records such as `*.onelyfetxc.com`; GitHub warns that they increase domain-takeover risk.
