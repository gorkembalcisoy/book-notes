# DDIA Okuma Notları — Sunumlar

[Designing Data-Intensive Applications](https://dataintensive.net/) kitabının okuma notlarından hazırlanmış [Slidev](https://sli.dev) sunum serisi.

## Sunumlar

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

# Sunum geliştirme (hot reload)
npm run dev:00        # 00-giris
npm run dev:06        # replikasyon sunumu
# ... diğerleri: dev:01 ... dev:07

# Tüm sunumları build et (dist/ altına)
npm run build

# Build edilmiş sunumları yerel olarak sun
npx serve dist
```

## GitHub Pages'e Yayınlama

Repo'yu GitHub'a push edin ve **Settings → Pages → Source** olarak **GitHub Actions** seçin.

`.github/workflows/deploy.yml` her `main` push'unda tüm sunumları build eder ve GitHub Pages'e deploy eder.

Deploy sonrası:
- Ana sayfa (tüm sunumların listesi): `https://<kullanıcı>.github.io/<repo>/`
- Bireysel sunumlar: `https://<kullanıcı>.github.io/<repo>/06-replication/` gibi

## Slayt Navigasyonu

| Tuş | İşlev |
| --- | ----- |
| `←` `→` / `Space` | İleri / geri |
| `o` | Genel bakış (overview) |
| `f` | Tam ekran |
| `g` | Goto slide |

## Teknoloji

- [Slidev](https://sli.dev) — Markdown tabanlı sunum aracı
- Mermaid desteği ile diyagramlar
- GitHub Actions ile otomatik deploy
