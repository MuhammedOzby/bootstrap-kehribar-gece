# Kehribar Gece — Kullanıma hazır paket

Bootstrap 5.3.8 temeli, Source Sans 3 fontu, aydınlık / karanlık / sistem görünümü. Birincil kehribar `#FFB300`, ikincil lavanta `#C4B0E8`; ikisinin üzerinde de siyah yazı. Standart köşeler 2 px.

## Paket içeriği

```text
blank.html                  Boş başlangıç sayfası
index.html                  Panel demosu
examples.html               Örnek sayfa galerisi
components.html             Bileşen kataloğu
customers.html, invoice.html, login.html, profile.html
404.html, 500.html, maintenance.html
assets/
  css/                      Tema ve demo düzenleri
  js/                       Bootstrap bundle, tema, menü ve demo davranışları
  fonts/source-sans-3/       Normal / italik font ve OFL lisansı
  landscape.svg             Demolarda kullanılan çizim
templates/go/               Go html/template için isteğe bağlı örnek
licenses/                   MIT ve üçüncü taraf bildirimleri
manifest.json               Dosya SHA-256 özetleri ve sürüm bilgileri
```

## Statik HTML ile başlama

1. ZIP'i açın; `blank.html` ve `assets/` klasörünü aynı dizinde tutun.
2. `blank.html` dosyasını kendi sayfa adınızla kopyalayın.
3. Başlık, marka ve menü bağlantılarını değiştirin. İçeriğinizi `<main id="main">` alanına ekleyin.

Sayfalar doğrudan tarayıcıda açılabilir. Başka bir sunucu klasörüne taşıdığınızda HTML dosyalarının assets yollarını o konuma göre düzenleyin. Derleme, npm, CDN veya internet bağlantısı gerekmez.

En az şu dosyalar gerekir:

```html
<!-- head içinde, CSS'ten önce: -->
<script src="assets/js/theme.js"></script>
<link rel="stylesheet" href="assets/css/kehribar-gece.min.css">

<!-- body sonunda, bu sırayla: -->
<script src="assets/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/layout.js"></script>
```

Tema CSS'i Bootstrap CSS'ini zaten içerir. Ayrıca Bootstrap CSS yüklemeyin. Bootstrap bundle, Popper'ı da içerir; açılır menü, tooltip ve popover için ayrıca Popper yüklemeyin. Tooltip ve popover, örnek katalogdaki gibi başlatılmalıdır.

Font yolları CSS dosyasına göre tanımlıdır; `assets/css/` ile `assets/fonts/` yapısını birlikte taşıyın. `pages.css`, `components.css` ve demo JavaScript'leri yalnızca ilgili örnek sayfalar içindir. `blank.html` bu dosyalara bağımlı değildir.

## Sunucuda render edilen HTML ve .tmpl

Tema, tarayıcıya standart HTML üretildiği sürece şablon motorundan bağımsızdır. Başlangıç için `blank.html` dosyasını `.tmpl` olarak kopyalayabilir; head, menü, üst bar ve script alanlarını ortak layout/partial dosyalarına ayırabilirsiniz.

Statik dosyaları örneğin `/static/kehribar-gece/` altında sunun. Render edilen HTML'de şu mutlak yolları kullanın:

```html
<script src="/static/kehribar-gece/js/theme.js"></script>
<link rel="stylesheet" href="/static/kehribar-gece/css/kehribar-gece.min.css">
<!-- body sonunda: -->
<script src="/static/kehribar-gece/js/bootstrap.bundle.min.js"></script>
<script src="/static/kehribar-gece/js/layout.js"></script>
```

Bu örnekte ZIP içindeki `assets/` klasörü `/static/kehribar-gece/` URL'sine bağlanır. Böylece `/customers/42` gibi iç içe uygulama adreslerinde de kaynak yolları çalışır. Uygulama bir alt URL'de çalışıyorsa o ön eki de ekleyin.

### İsteğe bağlı Go örneği

`.tmpl` tek bir motora ait bir uzantı değildir. `templates/go/` içindeki örnekler özellikle Go'nun `html/template` paketi içindir:

```go
tmpl, err := template.ParseFiles("templates/go/layout.tmpl", "templates/go/blank.tmpl")
if err != nil {
    // Uygulamanızın hata işleme yöntemi.
    return
}
err = tmpl.ExecuteTemplate(w, "layout", struct {
    Title     string
    AssetBase string
}{Title: "Yeni sayfa", AssetBase: "/static/kehribar-gece"})
if err != nil {
    // Uygulamanızın hata işleme yöntemi.
}
```

Bu parça mevcut bir HTTP handler içinde kullanılır; `html/template` importu ve statik dosya sunucusu uygulamada tanımlanmalıdır. `AssetBase` sonunda `/` bulunmaz. Birden fazla sayfanın `content` bloğunu aynı şablon kümesine birlikte yüklemeyin; her sayfa için layout ile ilgili content dosyasını eşleyin. Dinamik içerikte şablon motorunuzun HTML kaçışını açık tutun.

## Görünüm ve ortak menü

`theme.js` CSS'ten önce yüklenir; başlangıçta sistem görünümünü uygular. `name="theme"` radyo grubunun değerleri `light`, `dark`, `system` olmalıdır. Tercih aynı origin'deki yerel depolamada tutulur; depolama kapalıysa geçerli sayfa oturumunda çalışır. Bu tema dosyalarını katı bir CSP altında kullanacaksanız kendi sunucunuzdan gelen script, stil ve fontlara izin verin.

`layout.js` yalnızca mobil yan menüyü yönetir. `sidebar`, `menu-toggle`, `menu-backdrop` kimliklerini ve düğmenin `aria-controls` alanını koruyun. Boş başlangıç sayfasında örnek müşteri verileri veya form işleyicileri yoktur.

## Sınırlar ve lisanslar

Paket bir arayüz temasıdır. Demolar kimlik doğrulama, kalıcı veri kaydı veya gerçek fatura üretimi sağlamaz. Hata ekranları örnektir; HTTP durum kodlarını sunucu tarafında siz döndürmelisiniz.

Kod MIT lisansıyla, Source Sans 3 fontları SIL Open Font License 1.1 ile dağıtılır. `licenses/` dosyalarını ve fontların `OFL.txt` dosyasını yeniden dağıtımda koruyun. Ayrıntılar `licenses/THIRD-PARTY-NOTICES.md` dosyasındadır.

Kaynak projede renk veya ölçü değiştirdikten sonra CSS'i yeniden derleyin ve paketi yeniden üretin. Bu paket yalnızca kullanıma hazır dosyaları içerir; Sass/Bootstrap kaynak derlemesi gerektirmez.
