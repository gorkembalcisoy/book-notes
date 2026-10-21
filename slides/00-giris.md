---
theme: default
aspectRatio: 16/10
title: "Giriş: Veri Yoğun Uygulamalar"
info: |
  ## DDIA Okuma Notları — Giriş
  Designing Data-Intensive Applications kitabından derlenen okuma notları.
transition: slide-left
mdc: true
highlighter: shiki
---

# Veri Yoğun Uygulamalar

DDIA Okuma Notları — Giriş

<div class="pt-12">
  <span class="px-2 py-1 rounded text-sm" style="background: var(--slidev-code-background)">
    Designing Data-Intensive Applications
  </span>
</div>

---
layout: default
---

# Bu Sunum Serisi Hakkında

- Amaç: veri sistemleri alanının **tamamına** dair bir rehber sunmak
  - Tek bir ürüne odaklanmak yerine farklı teknolojilerin **avantaj ve dezavantajlarını** karşılaştırmak
- Veri sistemlerinin **iç yapısı**, temel algoritmaları ve **trade-off**'ları ele alınır

---
layout: two-cols
---

# Veri Yoğun (Data-Intensive) Uygulama Nedir?

Uygulamanın temel zorlukları şunlarla ilgiliyse **veri yoğun** uygulamadır:

- Büyük veri kümelerinin **saklanması ve işlenmesi**
- Verilerdeki **değişikliklerin yönetilmesi**
- Hatalar ve eşzamanlı işlemler karşısında **tutarlılık**
- Hizmetlerin **yüksek kullanılabilirlik** ile sunulması

::right::

<br>

<div class="p-4 rounded" style="background: var(--slidev-code-background)">

**Veri yoğun ≠ Hesaplama yoğun**

- Hesaplama yoğun: CPU gücü darboğazdır (örn. hava tahmini, moleküler simülasyon)
- Veri yoğun: **veri miktarı, karmaşıklığı ve değişim hızı** darboğazdır

</div>

---
layout: default
---

# Veri Yoğun Uygulamaların Tipik Görevleri

| Görev | Açıklama |
| ----- | -------- |
| **Veritabanları** | Verileri, ileride kendimizin veya başka uygulamaların bulabilmesi için saklamak |
| **Önbellek (Cache)** | Pahalı işlemlerin sonucunu bellekte tutarak okumaları hızlandırmak |
| **Search Index** | Anahtar kelimeyle arama ve filtreleme olanağı sağlamak |
| **Stream Processing** | Olayları ve veri değişikliklerini gerçekleştikleri anda işlemek |
| **Batch Processing** | Düzenli olarak biriken büyük veri kümelerini işlemek |

---
layout: default
---

# Kitabın Hedef Kitlesi

- **Yazılım mühendisleri, yazılım mimarları ve teknik yöneticiler**
  - Çalıştıkları sistemlerin mimarisine dair kararlar verenler
  - Özellikle **arka uç (backend) sistemler** geliştirenler
- Veri sistemlerinin nasıl **ölçeklenebilir** hale getirileceğini öğrenmek isteyenler
  - Milyonlarca kullanıcıyı destekleyecek uygulamalar
- Sistemlerin **yüksek erişilebilirlik**, **sağlamlık** ve **kolay bakım** gereksinimleriyle ilgilenenler

---
layout: default
---

# Kitabın Hedeflediği Amaç

- Araçların birleştirilmesiyle **sağlam bir uygulama mimarisi** oluşturulması
- Sistemlerin alt yapısında neler olduğuna dair **güçlü bir bilgi** oluşturulması
- Böylece:
  - Sistemlerin davranışlarının anlaşılması
  - Doğru **tasarım kararları** alınabilmesi
  - Ortaya çıkabilecek sorunların **teşhis edilebilmesi**

---
layout: default
---

# İçerik Haritası

1. **Trade-Off'lar** — Veri sistemleri mimarisinde trade-off'lar
2. **Fonksiyonel Olmayan Gereksinimler** — Performans, güvenilirlik, ölçeklenebilirlik
3. **Veri Modelleri ve Sorgu Dilleri** — İlişkisel, belge, grafik modeller
4. **Depolama ve Veri Getirme** — Veri tutma yöntemleri, indeksler
5. **Formatlar ve Gelişim** — Veri formatları ve veri akışlarının gelişimi
6. **Replikasyon** — Veriyi birden fazla düğümde tutmak
7. **Sharding** — Veriyi düğümler arasında bölmek

---
layout: center
class: text-center
---

# Temel Yaklaşım

Hiçbir yaklaşım her durum için en iyi çözüm değildir.

<div class="text-2xl mt-8 opacity-80">
Bir uygulama için mükemmel olan bir sistem, başka bir uygulama için pek uygun olmayabilir.
</div>

Her teknolojinin kendine özgü **avantajları** ve **dezavantajları** vardır.

---
layout: center
class: text-center
---

# Sonraki Adım

## Bölüm 1: Veri Sistemleri Mimarisinde Trade-Off'lar

<div class="mt-8 opacity-70">
Operational vs Analytical • Cloud vs Self-Hosting • Dağıtık vs Tek Düğüm
</div>
