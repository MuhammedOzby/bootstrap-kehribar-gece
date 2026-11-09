import * as sass from 'sass';
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('./', import.meta.url);
mkdirSync(new URL('css/', root), { recursive: true });
mkdirSync(new URL('js/', root), { recursive: true });
const result = sass.compile(fileURLToPath(new URL('scss/kehribar-gece.scss', root)), {
  loadPaths: [fileURLToPath(new URL('node_modules/bootstrap/scss/', root))],
  style: 'compressed'
});
writeFileSync(new URL('css/kehribar-gece.min.css', root), result.css);
for (const name of ['bootstrap.bundle.min.js', 'bootstrap.bundle.min.js.map']) {
  copyFileSync(new URL(`node_modules/bootstrap/dist/js/${name}`, root), new URL(`js/${name}`, root));
}
console.log('Kehribar Gece built with Bootstrap 5.3.8.');
