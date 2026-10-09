# LUMA

A streaming-style site: logo intro animation → browse page with rows of (blank, for now) tiles.

No images needed — the logo is just styled text.

## Files
- `index.html` — page structure
- `style.css` — all styling + the intro animation
- `script.js` — site name, intro timing, and the list of rows (edit the CONFIG at the top)

## Put it on GitHub Pages
1. Create a new repo on GitHub (e.g. `luma`).
2. Upload `index.html`, `style.css`, `script.js` and this README to the repo root.
3. Go to **Settings → Pages**, set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. After a minute your site is live at `https://<your-username>.github.io/luma/`.

## Customize
- Rename the site: change `BRAND` in `script.js`.
- Add/remove rows: edit the `ROWS` list in `script.js`.
- Change colors: edit `--accent-1` / `--accent-2` at the top of `style.css`.
