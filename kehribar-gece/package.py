#!/usr/bin/env python3
"""Build a portable, dependency-free runtime ZIP using only Python's stdlib."""
import argparse
import hashlib
import json
import re
import shutil
import tempfile
import zipfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

VERSION = '0.1.0'
SOURCE = Path(__file__).resolve().parent
REPOSITORY = SOURCE.parent
HTML_FILES = [
    'blank.html', 'index.html', 'examples.html', 'components.html',
    'customers.html', 'invoice.html', 'login.html', 'profile.html',
    '404.html', '500.html', 'maintenance.html'
]


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.ids = []
        self.targets = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for key in ('src', 'href'):
            if attrs.get(key):
                self.refs.append(attrs[key])
        for key in ('aria-controls', 'aria-labelledby', 'aria-describedby', 'for'):
            self.targets.extend(attrs.get(key, '').split())
        if attrs.get('data-bs-target', '').startswith('#'):
            self.targets.append(attrs['data-bs-target'][1:])


def validate(root):
    documents = {}
    for name in HTML_FILES:
        document = References()
        document.feed((root / name).read_text())
        if len(document.ids) != len(set(document.ids)):
            raise ValueError(f'Tekrarlanan id: {name}')
        missing = set(document.targets) - set(document.ids)
        if missing:
            raise ValueError(f'Eksik bileşen hedefi: {name}: {missing}')
        documents[name] = document
    for name, document in documents.items():
        for ref in document.refs:
            parts = urlsplit(ref)
            if parts.scheme or parts.netloc:
                if parts.scheme not in ('data', 'mailto', 'tel'):
                    raise ValueError(f'Harici kaynak: {name}: {ref}')
                continue
            target = root / unquote(parts.path) if parts.path else root / name
            if not target.resolve().is_relative_to(root.resolve()):
                raise ValueError(f'Paket dışı kaynak: {name}: {ref}')
            if not target.is_file():
                raise ValueError(f'Eksik dosya: {name}: {ref}')
            if parts.fragment and target.suffix == '.html':
                if parts.fragment not in documents[target.name].ids:
                    raise ValueError(f'Eksik bağlantı hedefi: {name}: {ref}')
    for path in (root / 'assets/css').glob('*.css'):
        for ref in re.findall(r'url\([\'\"]?([^\)\'\"]+)', path.read_text()):
            if ref.startswith('data:'):
                continue
            target = (path.parent / unquote(urlsplit(ref).path)).resolve()
            if not target.is_relative_to(root.resolve()) or not target.is_file():
                raise ValueError(f'Eksik CSS kaynağı: {path.name}: {ref}')


def build(output_dir):
    output_dir.mkdir(parents=True, exist_ok=True)
    package_name = f'kehribar-gece-{VERSION}'
    destination = output_dir / f'{package_name}.zip'
    with tempfile.TemporaryDirectory(prefix='kehribar-package-') as temporary:
        root = Path(temporary) / package_name
        root.mkdir()
        for name in HTML_FILES:
            html = (SOURCE / name).read_text()
            html = html.replace('../dist/js/bootstrap.bundle.min.js', 'assets/js/bootstrap.bundle.min.js')
            for old, new in [('href="css/', 'href="assets/css/'), ('src="js/', 'src="assets/js/'), ('href="fonts/', 'href="assets/fonts/')]:
                html = html.replace(old, new)
            (root / name).write_text(html)
        for folder in ('css', 'js', 'fonts'):
            shutil.copytree(SOURCE / folder, root / 'assets' / folder)
        for path in (SOURCE / 'assets').iterdir():
            if path.is_file():
                shutil.copy2(path, root / 'assets' / path.name)
        for name in ('bootstrap.bundle.min.js', 'bootstrap.bundle.min.js.map'):
            shutil.copy2(REPOSITORY / 'dist/js' / name, root / 'assets/js' / name)
        shutil.copytree(SOURCE / 'templates', root / 'templates')
        shutil.copy2(SOURCE / 'PACKAGE-README.md', root / 'README.md')
        (root / 'licenses').mkdir()
        shutil.copy2(SOURCE / 'licenses/LICENSE-MIT.txt', root / 'licenses/LICENSE-MIT.txt')
        shutil.copy2(SOURCE / 'licenses/LICENSE-POPPER.md', root / 'licenses/LICENSE-POPPER.md')
        (root / 'licenses/THIRD-PARTY-NOTICES.md').write_text(
            '# Üçüncü taraf bildirimleri\n\n'
            'Kehribar Gece, Bootstrap kaynak deposunun MIT lisansı altında dağıtılır. '
            'MIT metni LICENSE-MIT.txt dosyasındadır.\n\n'
            '- Bootstrap 5.3.8 — Copyright 2011–2025 The Bootstrap Authors — MIT. '
            'https://github.com/twbs/bootstrap\n'
            '- Popper 2.11.8 — Copyright 2019 Federico Zivolo — MIT. '
            'Bootstrap bundle içinde bulunur; tam lisans LICENSE-POPPER.md dosyasındadır. '
            'https://github.com/floating-ui/floating-ui/tree/v2.x\n'
            '- Source Sans 3 — Adobe / Paul D. Hunt — SIL Open Font License 1.1. '
            'Tam lisans: assets/fonts/source-sans-3/OFL.txt. '
            'https://github.com/adobe-fonts/source-sans\n'
        )
        validate(root)
        manifest = {
            'name': 'kehribar-gece', 'version': VERSION,
            'bootstrapVersion': '5.3.8', 'entrypoints': HTML_FILES,
            'files': {str(path.relative_to(root)): hashlib.sha256(path.read_bytes()).hexdigest()
                      for path in sorted(root.rglob('*')) if path.is_file()}
        }
        (root / 'manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
        archive = Path(temporary) / destination.name
        with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zipped:
            for path in sorted(root.rglob('*')):
                if path.is_file():
                    zipped.write(path, str(path.relative_to(root.parent)))
        # Check the actual extracted artifact, not only the staging directory.
        extracted = Path(temporary) / 'verify'
        with zipfile.ZipFile(archive) as zipped:
            if zipped.testzip() is not None:
                raise ValueError('ZIP bütünlük kontrolü başarısız.')
            zipped.extractall(extracted)
        final = extracted / package_name
        validate(final)
        for name, expected in manifest['files'].items():
            if hashlib.sha256((final / name).read_bytes()).hexdigest() != expected:
                raise ValueError(f'Dosya özeti uyuşmuyor: {name}')
        shutil.copy2(archive, destination)
    digest = hashlib.sha256(destination.read_bytes()).hexdigest()
    destination.with_suffix('.zip.sha256').write_text(f'{digest}  {destination.name}\n')
    print(f'Paket: {destination}')
    print(f'{len(manifest["files"])} dosya + manifest.json; yollar, ZIP ve SHA-256 doğrulandı.')
    return destination


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output-dir', type=Path, default=SOURCE / 'releases')
    build(parser.parse_args().output_dir.resolve())
