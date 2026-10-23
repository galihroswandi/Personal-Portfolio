# Checklist SEO di luar kode

Hal yang perlu Anda kerjakan sendiri. Kode sudah siap; langkah di bawah membuat Google dan Bing
mengenal situs ini dan nama Anda. Tidak ada jaminan peringkat. Hasilnya diukur di Search Console.

## 0. Sebelum peluncuran

- [ ] Isi semua placeholder: email dan tanggal tersedia (`src/config/site.ts`), hasil dan isi
      studi kasus (`src/content/projects/`), PDF CV
      (`public/cv/galih-roswandi-id.pdf` dan `-en.pdf`). `pnpm check:content` menunjukkan sisanya.
- [ ] Tinjau semua teks bahasa Inggris, lalu ubah `reviewed: false` menjadi `true` (dan
      `reviewedLangs.en` di `src/i18n/ui.ts`). Build produksi gagal sampai ini selesai.
- [x] Isi URL GitHub dan LinkedIn di `site.social` (Instagram masih kosong). Hanya URL asli yang ditampilkan dan
      masuk ke data terstruktur.
- [ ] Putuskan apakah nama kantor boleh muncul di data terstruktur (`publishEmployer`, default mati).

## 1. Domain sendiri

1. Beli domain dengan nama Anda, misalnya `galihroswandi.com`, `.dev`, atau `.id`.
2. Hubungkan di Vercel (Project → Settings → Domains) dan atur DNS sesuai petunjuk Vercel.
3. Ganti `site.url` di `src/config/site.ts` dan host di `vercel.json`. Tes akan gagal kalau
   keduanya tidak sama.
4. Arahkan `galihroswandi.vercel.app` ke domain baru dengan redirect permanen (308) di Vercel →
   Domains. Path tetap sama, jadi tautan lama tetap berfungsi.
5. Detail ada di `docs/seo.md` → "Moving to a custom domain".

## 2. Google Search Console dan Bing Webmaster Tools

1. Buka <https://search.google.com/search-console>, tambahkan **Domain property** (verifikasi lewat
   DNS TXT, tidak perlu mengubah kode). Kalau memakai URL-prefix property, isi
   `PUBLIC_GSC_VERIFICATION` di Vercel → Environment Variables lalu deploy ulang.
2. Kirim sitemap: `https://<domain>/sitemap.xml`.
3. URL Inspection untuk `/id/` dan `/en/`, lalu klik **Request indexing**. Lakukan juga untuk
   setiap studi kasus.
4. Uji `/id/` dan satu studi kasus di <https://search.google.com/test/rich-results>.
5. Di <https://www.bing.com/webmasters>, impor situs dari Search Console (paling cepat), atau
   verifikasi dengan `PUBLIC_BING_VERIFICATION`. Kirim sitemap yang sama.

## 3. Samakan profil

Gunakan nama yang persis sama di mana pun: **Galih Roswandi**.

- **LinkedIn**: headline berisi peran dan stack (misalnya "Fullstack Developer · Web, C++/Qt,
  HMI · Tasikmalaya"), URL kustom (`linkedin.com/in/galihroswandi` kalau tersedia), tautan situs
  di bagian Contact info, dan tautan portofolio di bagian **Featured**.
- **GitHub**: isi kolom Website, buat profile README (repo `galihroswandi/galihroswandi`) yang
  menautkan ke situs, dan sematkan repositori terbaik.
- Profil publik lain (Instagram dan sebagainya): nama sama, tautan ke situs.
- Setelah URL profil asli diisi di `site.social`, profil itu masuk ke `sameAs` dan ditautkan dengan
  `rel="me"`. Ini membantu mesin pencari mengaitkan profil-profil itu dengan Anda.

## 4. Tautan yang wajar

- Profil di atas, komunitas developer yang Anda ikuti, tulisan atau talk yang memang Anda buat.
- Jangan membeli tautan, bertukar tautan, atau spam komentar. Itu bisa merugikan situs.

## 5. Cek setiap bulan (Search Console)

- **Performance**: impresi dan klik untuk pencarian nama Anda, kueri apa yang muncul, halaman
  mana yang diklik.
- **Pages**: halaman yang terindeks dan alasan halaman yang tidak terindeks.
- **Core Web Vitals**: harus "Good" untuk mobile.
- **Sitemaps** dan laporan hreflang/International: tidak ada error.
- Sesuaikan judul dan deskripsi berdasarkan kueri nyata. Ubah teksnya di `src/i18n/ui.ts` atau di
  frontmatter studi kasus (`seoTitle`, `seoDescription`), jangan menumpuk kata kunci.

## 6. Nanti (opsional)

Bagian catatan atau artikel pendek tentang topik yang Anda kuasai, misalnya merancang antarmuka
data yang mudah dipahami operator, atau pindah dari web ke Qt. Ini cara terbaik untuk muncul di
pencarian tanpa nama Anda. Belum dibangun; lihat "Roadmap" di `docs/seo.md`.
