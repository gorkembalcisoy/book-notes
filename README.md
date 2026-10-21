# DDIA Okuma Notları

[Designing Data-Intensive Applications](https://dataintensive.net/) kitabının okuma notları. Proje doğrudan sunum görünümüyle açılır: solda bölüm ve alt başlık ağacı, sağda gerçek Slidev slaytları bulunur.

Soldaki başlıklara tıklamak ilgili slaydı açar. Slaytlar arasında önceki/sonraki düğmeleri veya ok tuşlarıyla gezilebilir; menü ve paylaşılabilir bağlantı slaytla eşzamanlı güncellenir. Küçük ekranlarda içindekiler ağacı menü düğmesinden açılır.

## Bölümler

| # | Bölüm | Konular |
| - | ----- | ------- |
| 00 | [Giriş](slides/00-giris.md) | Veri yoğun uygulamalar, kitap haritası |
| 01 | [Trade-Off'lar](slides/01-trade-offs.md) | Operational vs analytical, cloud vs self-hosting, dağıtık sistemler |
| 02 | [Fonksiyonel Olmayan Gereksinimler](slides/02-nonfunctional-requirements.md) | Performans, güvenilirlik, ölçeklenebilirlik |
| 03 | [Veri Modelleri](slides/03-data-models.md) | İlişkisel, belge, grafik modeller; event sourcing, CQRS |
| 04 | [Depolama ve Veri Getirme](slides/04-storage-retrieval.md) | B-Tree, LSM-Tree, indeksler, analitik depolama |
| 05 | [Kodlama ve Evrim](slides/05-encoding-evolution.md) | Uyumluluk, Protobuf, veri akış modelleri |
| 06 | [Replikasyon](slides/06-replication.md) | Single/multi-leader, leaderless, replication lag |
| 07 | [Sharding](slides/07-sharding.md) | Parçalama, hot spot'lar, rebalancing |

## Yerel Kullanım

```bash
npm install

# Sunumları derle ve sol menülü arayüzü başlat
npm run dev

# Tek bir sunumu hot reload ile düzenle
npm run dev:00        # 00-giris
npm run dev:06        # replikasyon sunumu
# ... diğerleri: dev:01 ... dev:07

# Menü ve tüm sunumları build et (dist/ altına)
npm run build

# Build edilmiş siteyi yerel olarak sun
npm run preview
```

`npm run dev` başlamadan önce sunumları `public/decks/` altında üretir. Slayt kaynaklarını düzenlerken `dev:00`–`dev:07` komutları hot reload sağlar; değişiklikleri sol menülü arayüze aktarmak için `npm run dev` komutunu yeniden çalıştırın. Üretilen sunumlar Git'e eklenmez.

## GitHub Pages'e Yayınlama

Repo'yu GitHub'a push edin ve **Settings → Pages → Source** olarak **GitHub Actions** seçin.

`.github/workflows/deploy.yml`, `main`, `master` ve `development` dallarına yapılan push'larda siteyi build eder ve GitHub Pages'e deploy eder. Build, Pages alt dizin yolunu otomatik kullanır.

Deploy sonrası:
- Sunum görünümü: `https://<kullanıcı>.github.io/<repo>/`
- Bölüm bağlantısı: `https://<kullanıcı>.github.io/<repo>/#06-replication`
- Alt başlık bağlantıları soldaki içindekiler ağacından alınabilir.

## Slayt Navigasyonu

| Tuş | İşlev |
| --- | ----- |
| `←` `→` / `Space` | İleri / geri |
| `o` | Genel bakış (overview) |
| `f` | Tam ekran |
| `g` | Goto slide |

## Teknoloji

- [Vite](https://vite.dev) — Geliştirme ve statik site build'i
- Markdown-it — Başlıkları slayt numaralarıyla eşleştiren içerik ağacı
- Mermaid — Slayt içi diyagramlar
- [Slidev](https://sli.dev) — Slayt düzenleri, geçişler ve sunum gezinmesi
- GitHub Actions ile otomatik deploy
