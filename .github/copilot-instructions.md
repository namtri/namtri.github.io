**Purpose**
- **Repo Type:** Static personal website served via GitHub Pages (`namtri.github.io`). Root `index.html` redirects to `cv/index.html`.

**Quick Preview / Deploy**
- **Preview locally:** from the repo root run `python3 -m http.server 8000` then open `http://localhost:8000`.
- **Deploy:** push to `master` (this repo is named `namtri.github.io`) — GitHub Pages serves the root. Example:
  - `git add . && git commit -m "site update" && git push origin master`

**Key files & layout**
- `index.html` : root page (currently redirects to `cv/index.html`).
- `cv/index.html` : the CV / main landing page (uses W3.CSS and font-awesome).
- `3d-print-designs/index.html` : gallery of 3D projects (uses Bootstrap + lightGallery).
- `js/3d-prints.js` : site script for galleries & UI toggles (ES module; imports lightGallery via CDN/skypack).
- `css/3d-prints.css` : styling for gallery and site-specific UI (see `.work-in-progress` ribbon).
- `media/3d_prints/` : images and assets referenced by pages (use relative paths like `../media/...`).

**Project-specific conventions & patterns**
- **Static, CDN-first:** Libraries are included via CDN links in HTML (Bootstrap, jQuery, Font Awesome, lightGallery). Avoid adding a local bundler unless necessary.
- **Script ordering:** `3d-print-designs/index.html` loads jQuery before `js/3d-prints.js` (which is `type="module"`). Keep this order — `js/3d-prints.js` expects global `$`/jQuery to be available.
- **Gallery pattern:** Galleries use containers with class `gallery-container` and items with `class="gallery-item"` and `data-src`/`data-lg-size` attributes. Example to add an item in `3d-print-designs/index.html`:

```html
<a data-lg-size="800-600" class="gallery-item" data-src="../media/3d_prints/my-image.png" data-sub-html="<h4>Caption</h4>">
  <img class="img-fluid" src="../media/3d_prints/my-image.png"/>
</a>
```

- **Work-in-progress marker:** Add `class="work-in-progress"` to an `div.accordion-body` to enable the CSS ribbon defined in `css/3d-prints.css`.
- **Toggle UI:** The extra projects toggle is an anchor with `id="toggle-additional-projects"`; corresponding JS shows/hides `div.limited-vis`.

**Notable code comments / TODOs**
- `js/3d-prints.js` contains a TODO: the custom toolbar uses element IDs `lg-toolbar-prev` / `lg-toolbar-next` and will conflict for multiple gallery containers. When adding another gallery on the same page, either namespace the IDs or use event handlers scoped to the `pluginInstance` element.

**Editing recommendations for AI agents**
- Prefer making small, targeted edits: update a single HTML fragment or add an image under `media/` and reference it with the same relative path pattern.
- When changing JS, maintain `type="module"` semantics and the dependency order (jQuery before the module). If adding new libraries, prefer CDN imports unless you also add a package manager and CI changes.
- Avoid global ID collisions (see toolbar IDs). Use `data-*` attributes or generate unique IDs when injecting UI elements.

**Debugging & testing**
- No automated tests or build step. Use a local HTTP server (see above) and browser DevTools for testing.
- Watch the console for module import / CORS errors when editing CDN imports.

**Common tasks — quick recipes**
- Add a new print image: put file into `media/3d_prints/`, then add the `<a class="gallery-item" ...>` snippet inside the appropriate `.gallery-container` in `3d-print-designs/index.html`.
- Mark a project WIP: add `work-in-progress` class to the accordion body.
- Update site styling: edit `css/3d-prints.css` (styles are small and self-contained).

**What not to do**
- Do not assume a Node/npm toolchain exists — there is no `package.json` or build pipeline in the repo. If you add one, document it and include simple `README` steps.

If anything here is unclear or you'd like guidance for a specific change (e.g., add a new gallery, fix toolbar id conflicts, or add a simple CI/CD workflow), tell me which task and I'll update these instructions with concrete step-by-step edits.
