# falkma.github.io

A minimal personal academic website. Static HTML/CSS/JS — no build step.
Content for each section lives in Markdown files under `content/` and is
loaded into the page at runtime.

## Structure

```
index.html          Page shell: header, nav, empty sections, footer
styles.css          Custom styles on top of water.css (loaded from CDN)
config.js           Your settings: header image + which Markdown file feeds each section
main.js             Loads the Markdown into the page and shows the header image
content/            One Markdown file per section (about, research, publications)
images/             Header banner image (header.jpg)
files/              Downloadable files, e.g. cv.pdf
```

## Editing

- **Text:** edit the files in `content/` (plain Markdown). Refresh the browser.
- **Your name / page title:** edit `index.html` (the `<title>`, `<h1>`, and footer).
- **Header images:** drop files in `images/` and list them in `config.js`.

## Preview locally

Because the page fetches Markdown files, opening `index.html` directly
(`file://`) is blocked by the browser. Run a tiny local server instead:

```sh
cd /Users/falkma/Desktop/webpage
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Deploy

Push to the `falkma.github.io` repo on the `main` branch; GitHub Pages
serves it at https://falkma.github.io automatically.
