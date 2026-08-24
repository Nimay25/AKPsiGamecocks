# Fix missing images on the Vercel deployment

## Why images are missing

163 of the site's images (all headshots, employer logos, hero/background photos) are not stored in the repo. They are stored on Lovable's CDN, and the code points to them with paths like:

```text
/__l5e/assets-v1/<id>/jpmorgan.webp
```

That `/__l5e/` path is served by Lovable's own hosting layer. On Vercel there is nothing behind that path, so every one of those requests 404s and the browser shows a broken-image icon — exactly what your screenshot shows. Everything else works because the rest of the site is normal code.

Total size of those images: ~16.8 MB across 163 files.

## Where your changes get pushed

The only git remote this project has is Lovable's internal storage repo (id `dcedc91f-f04a-4800-8810-4b3a6942af6f`). I cannot see a GitHub remote from here, which means the GitHub repo Vercel builds from is connected through Lovable's GitHub integration, not through a remote in the code. So: I commit to Lovable's repo, Lovable's GitHub sync mirrors that to your GitHub repo, and Vercel redeploys. If you tell me the repo name (or check Plus menu > GitHub in the editor) I'll confirm it back to you on every change.

## The fix

Pull all 163 images back down from the CDN into the repository so they ship with the build and work on any host:

1. Download each asset from its CDN URL into the real file path it points at (`src/assets/...`, `public/...`).
2. Replace each `import x from "....asset.json"` + `x.url` usage with a normal image import (`import x from "@/assets/....webp"`), which Vite bundles and fingerprints.
3. Update any CSS/string references that use a `/__l5e/...` URL literal.
4. Delete the `.asset.json` pointer files.
5. Run a production build and verify no `/__l5e/` reference remains anywhere in the output.

Result: repo grows by ~17 MB, images load on Vercel, Lovable preview, and any future host.

## Technical notes

- Affected files include `src/components/EmployerLogoWall.tsx`, `src/components/BrothersAtWork.tsx`, `src/lib/roster.ts` / `src/data/roster.csv` headshot paths, and the route files (`index`, `about`, `alumni`, `brothers`, `recruitment`).
- Headshots are referenced by path from the CSV, so that resolution layer needs to map to bundled URLs (Vite `import.meta.glob` over `src/assets/headshots/*.webp`) rather than pointer JSON.
- The favicon stays a real file in `public/`.

## Alternative (not recommended)

Rewrite the pointer URLs to absolute `https://akpsi-beta-upsilon-site.lovable.app/__l5e/...`. Faster, keeps the repo small, but your Vercel site would depend on the Lovable-hosted site staying published forever.
