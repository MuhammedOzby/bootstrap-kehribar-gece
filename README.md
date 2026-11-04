# Kehribar Gece — Bootstrap distribution & examples

Kehribar Gece, gece mavisi ve kehribar renkleriyle hazırlanmış, Bootstrap üzerine uygulanabilen bir **tema katmanı örneğidir**.

> **Current status:** This repository still contains the original Bootstrap 6.0.0-alpha.1 development source tree, build scripts and documentation. The existing `dist/css/bootstrap*.css` and `dist/js/bootstrap*.js` are upstream Bootstrap builds. `dist/css/kehribar-gece.css` is an optional custom theme override; it is **not** a compiled Bootstrap fork or a stable release.

## Quick preview

Open [examples/index.html](examples/index.html) in a browser, or host the repository as static files. The example uses local assets, with no CDN dependency.

## Directory map

| Path | Purpose |
| --- | --- |
| [dist/css](dist/css) | Compiled upstream Bootstrap CSS plus optional Kehribar Gece CSS |
| [dist/js](dist/js) | Compiled upstream Bootstrap JavaScript |
| [examples](examples) | Static HTML theme demos |
| [scss](scss), [js](js), [build](build), [site](site) | Upstream development sources and tooling retained for now |

## Use in a static website

```html
<link rel="stylesheet" href="./dist/css/bootstrap.min.css">
<link rel="stylesheet" href="./dist/css/kehribar-gece.css">
<script src="./dist/js/bootstrap.bundle.min.js"></script>
```

Copy the referenced files into your site and adjust relative paths as needed. This sample theme is an initial preview, not a compatibility-tested release.

## Planned cleanup

The long-term goal is a lightweight distribution-focused repository with prebuilt assets and HTML examples. Any removal of upstream source folders or large Git history should be reviewed separately; deleting files in a new commit **does not shrink existing Git history**.

## Attribution and license

Based on [Bootstrap](https://github.com/twbs/bootstrap), copyright © Bootstrap Authors, licensed under the [MIT License](LICENSE). This is an independent personal theme experiment, not an official Bootstrap release or Bootstrap-maintained distribution.
