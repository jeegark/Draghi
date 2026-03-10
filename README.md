# Draghi Cost of Inaction Tracker

This directory is structured so it can be lifted out and used as its own
standalone GitHub repository.

## What It Does

This is a static tracker for the cost of not implementing the Draghi agenda.
It:

- starts the counter on `9 September 2024`
- uses a baseline annual exposure of `EUR 800bn`
- fetches the live Draghi Observatory dataset at runtime
- discovers the current observatory JSON file automatically from
  `dashboard2.js`
- applies a weighted implementation offset:
  `Implemented = 1.00`, `Partially Implemented = 0.67`,
  `In Progress = 0.33`, `Not Implemented = 0.00`
- caps recoverable future cost at `75%`

## Project Structure

- `index.html`: page structure
- `styles.css`: visual system and responsive layout
- `app.js`: live data loading, cost model, theme mapping, and rendering
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow
- `.nojekyll`: disables Jekyll processing on GitHub Pages

## Local Development

This is a plain static site. No build step is required.

From the directory that contains this `README.md`:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000
```

## Deployment

This tracker is set up for deployment on GitHub Pages using GitHub Actions.

Expected deployment model:

1. Put the contents of this directory at the root of a dedicated GitHub repo.
2. Push to the `main` branch.
3. In GitHub, enable Pages with `GitHub Actions` as the source if it is not
   already selected.

The included workflow publishes the repository root as a Pages artifact.

## Recommended Repo Name

Use a dedicated repo, for example:

- `draghi-cost-tracker`
- `draghi-cost-of-inaction`

## Notes

- The site is intentionally separate from the OxCam tracker. It does not import
  any local OxCam assets, build tooling, or data files.
- The tracker depends on the Draghi Observatory remaining publicly accessible
  with CORS enabled for its JavaScript and JSON assets.
