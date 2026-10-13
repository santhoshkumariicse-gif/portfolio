# Deployment guide

## Local preview

From the repository root:

```text
python -m http.server 8000
```

Open `http://127.0.0.1:8000/`.

## GitHub Pages

The workflow in [`deploy-pages.yml`](../.github/workflows/deploy-pages.yml) deploys the repository root when changes are pushed to `main`:

1. Push the changes to the `main` branch.
2. Open the repository's **Actions** tab.
3. Wait for **Deploy static content to Pages** to complete.
4. Open the published Pages URL: `https://santhoshkumariicse-gif.github.io/portfolio/`.

The page uses relative URLs and no client-side routes, so the `/portfolio/` project path is preserved. Do not add absolute asset paths beginning with `/` unless the Pages base path is updated too.

## Updating content

Only add project links, screenshots, technologies, and metrics when they are authentic and verified. Keep the navigation IDs (`work`, `about`, `skills`, and `contact`) stable so anchor links and active-section detection continue to work.
