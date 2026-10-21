import * as sass from 'sass';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('./', import.meta.url);
mkdirSync(new URL('css/', root), { recursive: true });
const result = sass.compile(fileURLToPath(new URL('scss/kehribar-gece.scss', root)), {
  loadPaths: [fileURLToPath(new URL('../scss/', root))],
  style: 'compressed'
});
writeFileSync(new URL('css/kehribar-gece.min.css', root), result.css);
console.log('Kehribar Gece derlendi.');
