/**
 * UI dictionary. Indonesian (`id`) is the source of truth; `en` must have exactly the same keys
 * (enforced by the `Record<UIKey, string>` type, so a missing key fails `astro check`).
 * Long-form copy (About paragraphs, case studies) lives in content collections instead.
 */

export const languages = {
  id: 'Bahasa Indonesia',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'id';

/**
 * Has the owner reviewed this dictionary? Unreviewed languages stay `noindex`, out of the sitemap,
 * and fail the production content gate (`pnpm check:content`).
 */
export const reviewedLangs: Record<Lang, boolean> = { id: true, en: true };

/** BCP 47 tags used for date formatting. (`hreflang` and `og:locale` live in `src/lib/seo.ts`.) */
export const langTags: Record<Lang, string> = {
  id: 'id-ID',
  en: 'en-US',
};

const id = {
  'meta.title': 'Galih Roswandi, Fullstack Developer di Tasikmalaya',
  'meta.description':
    'Fullstack developer di Tasikmalaya yang membangun antarmuka data untuk operator: aplikasi web, dasbor, HMI desktop C++/Qt. Terbuka untuk kerja dan freelance.',
  /** Kicker and title on the generated Open Graph image. */
  'og.homeKicker': 'PORTOFOLIO',
  'og.homeTitle': 'Antarmuka data yang langsung dipahami operatornya.',
  'og.caseKicker': 'STUDI KASUS',
  'og.defaultTitle': 'Portofolio',
  'og.alt': '{title} · Galih Roswandi, fullstack developer',

  'a11y.skip': 'Lompat ke isi',
  'a11y.mainNav': 'Utama',
  'a11y.menuOpen': 'Buka menu',
  'a11y.menuClose': 'Tutup menu',
  'a11y.langSwitch': 'Pilih bahasa',
  'a11y.themeToLight': 'Ganti ke tema terang',
  'a11y.themeToDark': 'Ganti ke tema gelap',
  'a11y.themeLightOn': 'Tema terang aktif',
  'a11y.themeDarkOn': 'Tema gelap aktif',
  'a11y.statusStrip': 'Status',
  'a11y.home': 'Galih Roswandi, ke beranda',
  'a11y.social': 'Media sosial',

  'nav.projects': 'Proyek',
  'nav.about': 'Tentang',
  'nav.experience': 'Pengalaman',
  'nav.services': 'Layanan',
  'nav.contact': 'Kontak',
  'nav.hire': 'Hire me',
  'nav.menu': 'Menu',

  'status.status': 'STATUS',
  'status.available': 'TERSEDIA',
  'status.wib': 'WIB',
  'status.pos': 'POS',
  'status.from': 'MULAI',
  'status.pauseMotion': 'Jeda animasi',

  'hero.badge': 'Terbuka untuk peluang baru · Menerima proyek freelance',
  /** `*...*` marks the emphasised phrase (rendered as <em>). */
  'hero.title':
    'Fullstack developer yang membangun antarmuka data yang *langsung dipahami* operatornya.',
  'hero.sub':
    'Web, C++ dengan Qt, dan HMI. Berbasis di Tasikmalaya. Kode yang mudah dirawat, bug seminimal mungkin.',
  'hero.ctaProjects': 'Lihat proyek',
  'hero.ctaCollab': 'Ajak kerja sama',
  'hero.ctaCv': 'Lihat CV',
  'hero.metaLocation': 'Tasikmalaya · WIB',
  'hero.metaSince': 'Sejak Agu 2023 di Solusi 247',
  'hero.metaAvailable': 'Tersedia mulai {date}',
  'hero.radarLabel':
    'Sketsa tiga antarmuka yang saya bangun: radar command center, panel HMI, dan dasbor Flowvest',

  'section.cases.num': '01',
  'section.cases.label': 'Studi kasus',
  'section.cases.title': 'Antarmuka data yang mudah dipahami.',
  'section.about.num': '02',
  'section.about.label': 'Tentang',
  'section.about.title': 'Sedikit tentang saya.',
  'section.experience.num': '03',
  'section.experience.label': 'Pengalaman',
  'section.experience.title': 'Pengalaman dan belajar.',
  'section.stack.num': '04',
  'section.stack.label': 'Stack',
  'section.stack.title': 'Yang saya pakai.',
  'section.github.num': '05',
  'section.github.label': 'GitHub',
  'section.github.title': 'Belajar di tempat terbuka.',
  'section.github.sub':
    'Repo publik saya, data per {date}. Flowvest dan pekerjaan kantor ada di repo privat, jadi tidak terhitung di sini.',
  'github.stat.repos': 'Repo',
  'github.stat.reposNote': 'Milik sendiri, tanpa fork',
  'github.stat.since': 'Sejak',
  'github.stat.languages': 'Bahasa',
  'github.stat.languagesNote': 'Bahasa utama per repo',
  'github.chart.languages': 'Bahasa utama per repo',
  'github.chart.languagesNote': '{count} repo tanpa bahasa utama tidak dihitung.',
  'github.chart.years': 'Repo baru per tahun',
  'github.chart.yearsNote': 'Terbanyak di {year}: {count} repo.',
  'github.other': 'Lainnya',
  'github.unit': '{count} repo',
  'github.unitSr': ' repo',
  'github.featured': 'Repo pilihan',
  'github.code': 'Kode',
  'github.codeLabel': 'Kode {title} di GitHub',
  'github.demo': 'Demo',
  'github.demoLabel': 'Demo {title}',
  'github.profile': 'Lihat profil GitHub',
  'github.linkedin': 'Profil LinkedIn',
  'section.services.num': '06',
  'section.services.label': 'Layanan',
  'section.services.title': 'Masalah yang bisa saya bantu selesaikan.',
  'section.services.sub': 'Estimasi waktu dan biaya saya tentukan setelah kita berdiskusi.',
  'section.contact.num': '07',
  'section.contact.label': 'Kontak',
  'section.contact.title': 'Mari ngobrol soal proyek atau peluang kerja.',
  'section.contact.sub': 'Ceritakan singkat kebutuhan Anda, lalu saya hubungi kembali.',

  'project.problem': 'Masalah',
  'project.myRole': 'Peran saya',
  'project.result': 'Hasil',
  'project.stack': 'Stack',
  'project.read': 'Baca studi kasus',
  'project.readLabel': 'Baca studi kasus: {title}',
  'project.tryApp': 'Coba gratis',
  'project.tryAppLabel': 'Coba {name} gratis',
  'promo.kicker': 'Coba {name}',
  'project.back': 'Kembali ke beranda',
  'project.ctaText': 'Punya kebutuhan serupa, atau ingin tahu lebih lanjut?',
  'breadcrumb.label': 'Breadcrumb',
  'breadcrumb.home': 'Beranda',
  'illustration.bars': 'Ilustrasi generik: grafik batang',
  'illustration.gauge': 'Ilustrasi generik: indikator setengah lingkaran',
  'illustration.grid': 'Ilustrasi generik: kisi titik',
  'illustration.finance':
    'Tampilan aplikasi Flowvest di desktop dan ponsel: net worth, goal tabungan, dan statistik, dengan data contoh',
  'illustration.storefront':
    'Tampilan aplikasi Baywira di ponsel: dasbor penjual, etalase produk, dan daftar pesanan, dengan data contoh',
  'illustration.maritime': 'Ilustrasi generik: peta laut dengan jejak kapal dan daftar status',
  'illustration.hmi':
    'Ilustrasi generik: panel operator dengan indikator, level tangki, dan tombol',

  'about.plateCaption': 'PROFIL · GALIH ROSWANDI',
  'about.principle1.title': 'Data akurat',
  'about.principle1.text': 'Yang tampil harus sesuai sumbernya.',
  'about.principle2.title': 'Antarmuka jelas',
  'about.principle2.text': 'Operator langsung menemukan yang dicari.',
  'about.principle3.title': 'Kode terawat',
  'about.principle3.text': 'Praktik terbaik, bug seminimal mungkin.',
  'bento.experience.label': 'Pengalaman',
  'bento.experience.value': 'Aplikasi command center dan HMI',
  'bento.experience.note': 'Solusi 247, Yogyakarta · sejak Agustus 2023',
  'bento.stack.label': 'Stack utama',
  'bento.stack.value': 'Web + Qt',
  'bento.location.label': 'Lokasi',
  'bento.location.value': 'Tasikmalaya',
  'bento.location.note': 'WIB, UTC+7',
  'bento.learning.label': 'Cepat belajar',
  'bento.learning.value': 'Dari C++ ke proyek Qt dalam sekitar dua bulan.',
  'bento.learning.note': 'Dibantu AI, standar kualitas tetap dijaga.',

  'timeline.job.period': 'Agu 2023 sampai sekarang',
  'timeline.job.title': 'Developer aplikasi command center dan HMI',
  'timeline.job.place': 'Solusi 247, Yogyakarta',
  'timeline.job.text':
    'Menampilkan data sistem di aplikasi web dan desktop (Qt), memastikan data sesuai dan antarmuka mudah dipahami operator.',
  'timeline.learn.period': 'Sekitar dua bulan',
  'timeline.learn.title': 'Belajar C++ dan Qt sampai membuat proyek',
  'timeline.learn.place': 'Perjalanan belajar',
  'timeline.learn.text': 'Dibantu AI, dengan aturan kode yang mudah dirawat dan praktik terbaik.',
  'timeline.current': 'Saat ini',

  'stack.daily': 'Sehari-hari',
  'stack.used': 'Pernah dipakai',
  'stack.learning': 'Sedang dipelajari',

  'service.dashboard.title': 'Dasbor data',
  'service.dashboard.text':
    'Data yang rumit jadi tampilan yang langsung terbaca oleh penggunanya. Web atau desktop Qt.',
  'service.internal.title': 'Aplikasi internal',
  'service.internal.text':
    'Alat kerja untuk tim Anda, dari formulir sampai sistem pemantauan, dengan kode yang mudah dirawat.',
  'service.ux.title': 'Rapikan UX sistem',
  'service.ux.text':
    'Sistem yang membingungkan penggunanya dibuat jelas tanpa menulis ulang semuanya.',
  'service.cta': 'Diskusi',
  'service.ctaLabel': 'Diskusi soal {title} lewat email',
  'service.subject': 'Diskusi proyek: {title}',

  'contact.email': 'Kirim email',
  'contact.cv': 'Lihat CV',
  'cv.title': 'Pratinjau CV',
  'cv.alt': 'Pratinjau CV Galih Roswandi, satu halaman. Versi teks lengkap ada di file PDF.',
  'cv.download': 'Download PDF',
  'cv.close': 'Tutup',
  'cv.closeLabel': 'Tutup pratinjau CV',
  'contact.subject': 'Peluang kerja atau proyek',
  'contact.github': 'GitHub',
  'contact.linkedin': 'LinkedIn',
  'contact.instagram': 'Instagram',

  'footer.copyright': '© {year} Galih Roswandi',
  'footer.location': 'Tasikmalaya · WIB',
  'footer.nav': 'Tautan situs',

  'root.intro':
    'Portofolio Galih Roswandi, fullstack developer di Tasikmalaya: aplikasi web, dasbor data, dan HMI desktop dengan C++ dan Qt.',
  'root.choose': 'Pilih bahasa',

  'notFound.title': 'Halaman tidak ditemukan',
  'notFound.text': 'Alamat ini tidak ada atau sudah dipindahkan. Lanjutkan dari beranda:',
  'notFound.home': 'Ke beranda (Bahasa Indonesia)',
} as const;

export type UIKey = keyof typeof id;

// TODO(review): English copy below is a translation of the Indonesian source; owner to review.
const en: Record<UIKey, string> = {
  'meta.title': 'Galih Roswandi, Fullstack Developer in Tasikmalaya, Indonesia',
  'meta.description':
    'Fullstack developer in Tasikmalaya, Indonesia, building data interfaces for operators: web apps, dashboards, desktop HMI in C++/Qt. Open to jobs and freelance.',
  'og.homeKicker': 'PORTFOLIO',
  'og.homeTitle': 'Data interfaces that operators understand at a glance.',
  'og.caseKicker': 'CASE STUDY',
  'og.defaultTitle': 'Portfolio',
  'og.alt': '{title} · Galih Roswandi, fullstack developer',

  'a11y.skip': 'Skip to content',
  'a11y.mainNav': 'Main',
  'a11y.menuOpen': 'Open menu',
  'a11y.menuClose': 'Close menu',
  'a11y.langSwitch': 'Choose language',
  'a11y.themeToLight': 'Switch to light theme',
  'a11y.themeToDark': 'Switch to dark theme',
  'a11y.themeLightOn': 'Light theme on',
  'a11y.themeDarkOn': 'Dark theme on',
  'a11y.statusStrip': 'Status',
  'a11y.home': 'Galih Roswandi, go to home',
  'a11y.social': 'Social media',

  'nav.projects': 'Projects',
  'nav.about': 'About',
  'nav.experience': 'Experience',
  'nav.services': 'Services',
  'nav.contact': 'Contact',
  'nav.hire': 'Hire me',
  'nav.menu': 'Menu',

  'status.status': 'STATUS',
  'status.available': 'AVAILABLE',
  'status.wib': 'WIB',
  'status.pos': 'POS',
  'status.from': 'FROM',
  'status.pauseMotion': 'Pause motion',

  'hero.badge': 'Open to new opportunities · Taking freelance projects',
  'hero.title':
    'Fullstack developer building data interfaces that operators *understand at a glance*.',
  'hero.sub':
    'Web, C++ with Qt, and HMI. Based in Tasikmalaya, Indonesia. Maintainable code, as few bugs as possible.',
  'hero.ctaProjects': 'See projects',
  'hero.ctaCollab': 'Work with me',
  'hero.ctaCv': 'View CV',
  'hero.metaLocation': 'Tasikmalaya · WIB',
  'hero.metaSince': 'At Solusi 247 since Aug 2023',
  'hero.metaAvailable': 'Available from {date}',
  'hero.radarLabel':
    'Sketches of three interfaces I built: a command center radar, an HMI panel and the Flowvest dashboard',

  'section.cases.num': '01',
  'section.cases.label': 'Case studies',
  'section.cases.title': 'Data interfaces that are easy to understand.',
  'section.about.num': '02',
  'section.about.label': 'About',
  'section.about.title': 'A little about me.',
  'section.experience.num': '03',
  'section.experience.label': 'Experience',
  'section.experience.title': 'Experience and learning.',
  'section.stack.num': '04',
  'section.stack.label': 'Stack',
  'section.stack.title': 'What I use.',
  'section.github.num': '05',
  'section.github.label': 'GitHub',
  'section.github.title': 'Learning in the open.',
  'section.github.sub':
    'My public repositories, data as of {date}. Flowvest and my work at the office live in private repositories, so they are not counted here.',
  'github.stat.repos': 'Repos',
  'github.stat.reposNote': 'My own, no forks',
  'github.stat.since': 'Since',
  'github.stat.languages': 'Languages',
  'github.stat.languagesNote': 'Main language per repo',
  'github.chart.languages': 'Main language per repo',
  'github.chart.languagesNote': '{count} repos without a main language are not counted.',
  'github.chart.years': 'New repos per year',
  'github.chart.yearsNote': 'Most in {year}: {count} repos.',
  'github.other': 'Other',
  'github.unit': '{count} repos',
  'github.unitSr': ' repos',
  'github.featured': 'Featured repos',
  'github.code': 'Code',
  'github.codeLabel': 'Code for {title} on GitHub',
  'github.demo': 'Demo',
  'github.demoLabel': 'Demo of {title}',
  'github.profile': 'View GitHub profile',
  'github.linkedin': 'LinkedIn profile',
  'section.services.num': '06',
  'section.services.label': 'Services',
  'section.services.title': 'Problems I can help you solve.',
  'section.services.sub': 'I estimate time and cost after we have talked it through.',
  'section.contact.num': '07',
  'section.contact.label': 'Contact',
  'section.contact.title': "Let's talk about a project or a job opportunity.",
  'section.contact.sub': 'Tell me briefly what you need, and I will get back to you.',

  'project.problem': 'Problem',
  'project.myRole': 'My role',
  'project.result': 'Result',
  'project.stack': 'Stack',
  'project.read': 'Read case study',
  'project.readLabel': 'Read case study: {title}',
  'project.tryApp': 'Try it free',
  'project.tryAppLabel': 'Try {name} for free',
  'promo.kicker': 'Try {name}',
  'project.back': 'Back to home',
  'project.ctaText': 'Need something similar, or want to know more?',
  'breadcrumb.label': 'Breadcrumb',
  'breadcrumb.home': 'Home',
  'illustration.bars': 'Generic illustration: bar chart',
  'illustration.gauge': 'Generic illustration: half-circle gauge',
  'illustration.grid': 'Generic illustration: dot grid',
  'illustration.finance':
    'The Flowvest app on desktop and phone: net worth, savings goals and statistics, with sample data',
  'illustration.storefront':
    'The Baywira app on phones: seller dashboard, product storefront and order list, with sample data',
  'illustration.maritime': 'Generic illustration: sea chart with vessel tracks and a status list',
  'illustration.hmi': 'Generic illustration: operator panel with gauges, tank levels and buttons',

  'about.plateCaption': 'PROFILE · GALIH ROSWANDI',
  'about.principle1.title': 'Accurate data',
  'about.principle1.text': 'What is shown must match its source.',
  'about.principle2.title': 'Clear interfaces',
  'about.principle2.text': 'Operators find what they need right away.',
  'about.principle3.title': 'Maintainable code',
  'about.principle3.text': 'Best practices, as few bugs as possible.',
  'bento.experience.label': 'Experience',
  'bento.experience.value': 'Command center apps and HMI',
  'bento.experience.note': 'Solusi 247, Yogyakarta · since August 2023',
  'bento.stack.label': 'Main stack',
  'bento.stack.value': 'Web + Qt',
  'bento.location.label': 'Location',
  'bento.location.value': 'Tasikmalaya',
  'bento.location.note': 'WIB, UTC+7',
  'bento.learning.label': 'Fast learner',
  'bento.learning.value': 'From C++ to a Qt project in about two months.',
  'bento.learning.note': 'With AI assistance, quality standards kept.',

  'timeline.job.period': 'Aug 2023 to present',
  'timeline.job.title': 'Developer, command center apps and HMI',
  'timeline.job.place': 'Solusi 247, Yogyakarta',
  'timeline.job.text':
    'Displaying system data in web and desktop (Qt) apps, making sure the data is correct and the interface is easy for operators to understand.',
  'timeline.learn.period': 'About two months',
  'timeline.learn.title': 'Learning C++ and Qt through to a working project',
  'timeline.learn.place': 'Learning journey',
  'timeline.learn.text':
    'With AI assistance, following maintainable-code rules and best practices.',
  'timeline.current': 'Current',

  'stack.daily': 'Daily',
  'stack.used': 'Have used',
  'stack.learning': 'Learning now',

  'service.dashboard.title': 'Data dashboards',
  'service.dashboard.text':
    'Complex data turned into views its users can read at a glance. Web or Qt desktop.',
  'service.internal.title': 'Internal tools',
  'service.internal.text':
    'Work tools for your team, from forms to monitoring systems, with maintainable code.',
  'service.ux.title': 'Clean up system UX',
  'service.ux.text': 'A system that confuses its users, made clear without rewriting everything.',
  'service.cta': "Let's talk",
  'service.ctaLabel': 'Discuss {title} by email',
  'service.subject': 'Project discussion: {title}',

  'contact.email': 'Send an email',
  'contact.cv': 'View CV',
  'cv.title': 'CV preview',
  'cv.alt': 'Preview of the one-page CV of Galih Roswandi. The full text is in the PDF file.',
  'cv.download': 'Download PDF',
  'cv.close': 'Close',
  'cv.closeLabel': 'Close the CV preview',
  'contact.subject': 'Job or project opportunity',
  'contact.github': 'GitHub',
  'contact.linkedin': 'LinkedIn',
  'contact.instagram': 'Instagram',

  'footer.copyright': '© {year} Galih Roswandi',
  'footer.location': 'Tasikmalaya · WIB',
  'footer.nav': 'Site links',

  'root.intro':
    'Portfolio of Galih Roswandi, a fullstack developer in Tasikmalaya, Indonesia: web apps, data dashboards, and desktop HMI in C++ with Qt.',
  'root.choose': 'Choose a language',

  'notFound.title': 'Page not found',
  'notFound.text': 'This address does not exist or has moved. Continue from the home page:',
  'notFound.home': 'Go to the home page (English)',
};

export const ui: Record<Lang, Record<UIKey, string>> = { id, en };
