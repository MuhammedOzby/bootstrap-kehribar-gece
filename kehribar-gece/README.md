# Kehribar Gece

Bootstrap **5.3.8** üzerinde aydınlık ve karanlık görünümlü, kehribar vurgulu yönetim paneli teması. İlk taslaktır; paneldeki veriler örnektir, bir sunucuya gönderilmez.

## Kullanım

Bu klasör Bootstrap deposunun kökünde `kehribar-gece/` olarak bulunur. `index.html` dosyasını tarayıcıda açın. Derlenmiş CSS ve font dosyaları yereldir; CDN gerektirmez.

`components.html`, tipografiyle başlayan 23 bölümlük bileşen kataloğudur. Paneldeki Bileşenler bağlantısından erişilir. Butonlar, form kontrolleri ve doğrulama, tablolar, kartlar, rozetler, uyarılar, gezinme, sekmeler, açılır menüler, akordeon, açılır içerik, modal, yan panel, ipucu, popover, toast, ilerleme, spinner, yer tutucular, görseller, carousel, scrollspy ve ızgara örnekleri içerir. Ek katalog düzeni `css/components.css`, örnek davranışları `js/components.js` içindedir.

Kendi HTML sayfanızda `<html lang="tr" data-bs-theme="dark">` kullanın ve `css/kehribar-gece.min.css` dosyasını yükleyin. Bu dosya Bootstrap bileşenlerini içerir; ayrıca Bootstrap CSS yüklemeyin. JavaScript bileşenleri için deponun `dist/js/bootstrap.bundle.min.js` dosyasını ekleyin.

## Temayı derleme

Bootstrap deposunun bağımlılıkları kuruluysa kök klasörden:

```sh
node kehribar-gece/build.mjs
```

Derleyici deponun mevcut `sass` 1.78.0 bağımlılığını kullanır. Renk, font ve bileşen ayarları `scss/kehribar-gece.scss` dosyasında bulunur. Temayı güncelledikten sonra CSS dosyasını yeniden derleyin. Bootstrap kaynakları bu tema tarafından değiştirilmez.

## Font ve lisans

**Source Sans 3**, Adobe / Paul D. Hunt. Normal ve italik değişken fontlar, 200–900 ağırlık aralığı. Genel metin 15 px, tablo gövdesi 14 px, başlıklar 600 ağırlıktadır. Sayısal sütunlar `tabular-nums` kullanır.

- Kaynak: https://github.com/google/fonts/tree/main/ofl/sourcesans3
- Asıl proje: https://github.com/adobe-fonts/source-sans
- Lisans: SIL Open Font License 1.1; `fonts/source-sans-3/OFL.txt` dağıtımda korunmalıdır.

Fontlar uygulamanın kendi dosyalarından yüklenir. Sağ üstteki Aydınlık / Karanlık / Sistem radyo düğmeleri görünümü değiştirir. İlk açılışta Sistem seçilir. Tercih, tarayıcının yerel depolamasında saklanır; Sistem seçiliyken cihazın tema değişiklikleri anında uygulanır. Depolama kapalıysa seçim o oturumda çalışır. `js/theme.js` dosyasını CSS bağlantısından önce yükleyin; böylece ilk boyamada doğru tema uygulanır.

## Renk paleti

Birincil: canlı kehribar `#FFB300`, siyah yazı. İkincil: açık lavanta `#C4B0E8`, siyah yazı. Uyarı: sarı `#EDC474`. Metin bağlantıları ve çerçeveli butonlarda okunaklılık için aydınlık görünümde koyu kehribar ve koyu lavanta, karanlık görünümde canlı kehribar ve açık lavanta kullanılır. Dolu butonların ana renkleri iki görünümde de aynıdır.

## Köşe ölçüleri

Standart radius 2 px, küçük 1 px, büyük 3 px; diğer büyük varyantlar en fazla 4 px. Panel ve katalog bileşenleri bu ortak değişkenleri kullanır. Radyo düğmeleri, anahtarlar ve durum noktaları kendi işlevsel biçimlerini korur.

## Örnek sayfalar

`examples.html` yedi sayfanın galerisidir. Paneldeki **Örnek sayfalar** bağlantısından açılır.

- `customers.html`: Türkçe arama, durum filtresi, ad sıralaması, 6 satırlık sayfalama, filtrelenmiş CSV dışa aktarımı ve geçici müşteri ekleme.
- `invoice.html`: örnek fatura kalemleri ve tutarlı toplamlar; Yazdır / PDF düğmesi tarayıcının baskı penceresini açar. A4 baskıda menüler ve düğmeler gizlenir.
- `login.html`: giriş formu, parola görünürlüğü ve yerel alan doğrulaması. Oturum açmaz ve parola saklamaz.
- `profile.html`: kişisel bilgi ve tercih sekmeleri. Alanları doğrular, sunucuya kaydetmez.
- `404.html` ve `500.html`: ayrı hata ekranları. Gerçek HTTP hata durumu üretmez; 500 ekranındaki yeniden dene düğmesi demo açıklaması gösterir.
- `maintenance.html`: planlı bakım örneği; canlı durum veya geri sayım içermez.

Yeni sayfaların ortak düzeni `css/pages.css`, menü davranışı `js/layout.js` içindedir. Müşteri verileri `js/customers.js` içinde örnektir. Sayfa yenilenince eklenen kayıtlar kaybolur. Üretim kullanımı için kimlik doğrulama, API, kalıcı kayıt ve gerçek hata yönlendirmeleri ayrıca bağlanmalıdır.

## Taşınabilir dağıtım paketi

`blank.html`, yalnızca tema CSS'i, tema seçimi ve mobil menü davranışıyla çalışan boş bir başlangıçtır. Demo veri işleyicilerini yüklemez.

Bootstrap depo kökünde şu komut çalıştırılır (Python 3.10+):

```sh
python3 kehribar-gece/package.py
```

Çıktı `kehribar-gece/releases/kehribar-gece-0.1.0.zip` ve SHA-256 dosyasıdır. Başka bir çıktı klasörü için `--output-dir /istenen/klasor` kullanılabilir. Paketleme mevcut derlenmiş CSS'i kullanır; Sass değişikliklerinden sonra önce `build.mjs` çalıştırılmalıdır.

ZIP içindeki sayfalar bağımsız `assets/` yollarına çevrilir; Bootstrap bundle, sourcemap ve lisanslar da eklenir. Paketin kökündeki README, `PACKAGE-README.md` dosyasından üretilir. `templates/go/` içindeki `.tmpl` dosyaları isteğe bağlı Go html/template örneğidir; başka şablon motorları için blank.html ortak layout'a ayrılabilir. Paketin çalışması kaynak Bootstrap deposuna veya harici CDN'e bağlı değildir.
