# Kehribar Gece

Bootstrap **5.3.8** tabanlı yönetim paneli teması. Kehribar ve lavanta renkleri, Source Sans 3 fontu ve aydınlık / karanlık / sistem görünümü içerir.

## Önizleme

[Paneli açın](kehribar-gece/index.html). Dosyalar yereldir; kurulum veya CDN gerekmez.

- [Bileşen kataloğu](kehribar-gece/components.html)
- [Örnek sayfalar](kehribar-gece/examples.html)
- [Boş başlangıç sayfası](kehribar-gece/blank.html)

## Geliştirme

```sh
cd kehribar-gece
npm ci
npm run build
npm run package
```

ZIP çıktısı `kehribar-gece/releases/` klasörüne yazılır. Paket, Bootstrap JavaScript dosyası, fontlar ve lisansları içerir.
[Yapılandırma ve kullanım](kehribar-gece/README.md) · [Dağıtım rehberi](kehribar-gece/PACKAGE-README.md)

## Depo yapısı

Asıl tema `kehribar-gece/` klasöründedir. Kendi bağımlılıkları Bootstrap 5.3.8 ve Sass 1.78.0 sürümlerine sabitlenmiştir.
Depo kökündeki Bootstrap 6 alfa kaynakları ve araçları korunur. Temayı derlemek için tema klasöründeki komutları kullanın.
`dist/css/kehribar-gece.css` önceki taslağa aittir. Yeni sayfalarda `kehribar-gece/css/kehribar-gece.min.css` kullanın; bu dosya Bootstrap CSS bileşenlerini de içerir.

## Kaynak ve lisans

Özgün tema, `bootstrap-kehribar-gece-original` deposunun `custom-admin` dalındaki `0c956cbe5` commitinden aktarıldı.
[Bootstrap](https://github.com/twbs/bootstrap), Bootstrap Authors, [MIT lisansı](LICENSE).
Source Sans 3 fontunun SIL Open Font License dosyası tema klasöründe korunur.
Bu proje bağımsız bir kişisel temadır.
