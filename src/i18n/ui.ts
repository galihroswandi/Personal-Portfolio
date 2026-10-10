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

/** BCP 47 tags used for `hreflang`, `og:locale` and date formatting. */
export const langTags: Record<Lang, string> = {
  id: 'id-ID',
  en: 'en-US',
};

const id = {
  'meta.title': 'Galih Roswandi · Fullstack developer',
  'meta.description':
    'Fullstack developer di Tasikmalaya. Membangun antarmuka data untuk operator: aplikasi web, C++ dengan Qt, dan HMI.',
  'meta.caseStudyTitle': '{title} · Studi kasus · Galih Roswandi',

  'a11y.skip': 'Lompat ke isi',
  'a11y.mainNav': 'Utama',
  'a11y.menuOpen': 'Buka menu',
  'a11y.menuClose': 'Tutup menu',
  'a11y.langSwitch': 'Pilih bahasa',
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

  'hero.badge': 'Terbuka untuk peluang baru · Menerima proyek freelance',
  /** `*...*` marks the emphasised phrase (rendered as <em>). */
  'hero.title':
    'Fullstack developer yang membangun antarmuka data yang *langsung dipahami* operatornya.',
  'hero.sub':
    'Web, C++ dengan Qt, dan HMI. Berbasis di Tasikmalaya. Kode yang mudah dirawat, bug seminimal mungkin.',
  'hero.ctaProjects': 'Lihat proyek',
  'hero.ctaCollab': 'Ajak kerja sama',
  'hero.ctaCv': 'Download CV',
  'hero.metaLocation': 'Tasikmalaya · WIB',
  'hero.metaSince': 'Sejak Agu 2023 di Solusi 247',
  'hero.metaAvailable': 'Tersedia mulai {date}',
  'hero.radarLabel': 'Ilustrasi 3D abstrak: kerangka kawat dengan cincin radar',
  'hero.radarCaption': 'SCENE · ABSTRAK',

  'section.cases.num': '01',
  'section.cases.label': 'Studi kasus',
  'section.cases.title': 'Antarmuka yang dipakai operator setiap hari.',
  'section.about.num': '02',
  'section.about.label': 'Tentang',
  'section.about.title': 'Sedikit tentang saya.',
  'section.experience.num': '03',
  'section.experience.label': 'Pengalaman',
  'section.experience.title': 'Pengalaman dan belajar.',
  'section.stack.num': '04',
  'section.stack.label': 'Stack',
  'section.stack.title': 'Yang saya pakai.',
  'section.services.num': '05',
  'section.services.label': 'Layanan',
  'section.services.title': 'Masalah yang bisa saya bantu selesaikan.',
  'section.services.sub': 'Estimasi waktu dan biaya saya tentukan setelah kita berdiskusi.',
  'section.contact.num': '06',
  'section.contact.label': 'Kontak',
  'section.contact.title': 'Mari ngobrol soal proyek atau peluang kerja.',
  'section.contact.sub': 'Ceritakan singkat kebutuhan Anda, lalu saya hubungi kembali.',

  'project.problem': 'Masalah',
  'project.myRole': 'Peran saya',
  'project.result': 'Hasil',
  'project.stack': 'Stack',
  'project.read': 'Baca studi kasus',
  'project.readLabel': 'Baca studi kasus: {title}',
  'project.back': 'Kembali ke beranda',
  'illustration.bars': 'Ilustrasi generik: grafik batang',
  'illustration.gauge': 'Ilustrasi generik: indikator setengah lingkaran',
  'illustration.grid': 'Ilustrasi generik: kisi titik',

  'about.photoAlt': 'Foto Galih Roswandi (placeholder)',
  'about.photoPlaceholder': '[foto Anda]',
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
  'contact.cv': 'Download CV',
  'contact.subject': 'Peluang kerja atau proyek',
  'contact.github': 'GitHub',
  'contact.linkedin': 'LinkedIn',
  'contact.instagram': 'Instagram',

  'footer.copyright': '© {year} Galih Roswandi',
  'footer.location': 'Tasikmalaya · WIB',

  'root.title': 'Galih Roswandi',
  'root.choose': 'Pilih bahasa · Choose a language',
} as const;

export type UIKey = keyof typeof id;

// TODO(review): English copy below is a translation of the Indonesian source; owner to review.
const en: Record<UIKey, string> = {
  'meta.title': 'Galih Roswandi · Fullstack developer',
  'meta.description':
    'Fullstack developer in Tasikmalaya, Indonesia. I build data interfaces for operators: web apps, C++ with Qt, and HMI.',
  'meta.caseStudyTitle': '{title} · Case study · Galih Roswandi',

  'a11y.skip': 'Skip to content',
  'a11y.mainNav': 'Main',
  'a11y.menuOpen': 'Open menu',
  'a11y.menuClose': 'Close menu',
  'a11y.langSwitch': 'Choose language',
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

  'hero.badge': 'Open to new opportunities · Taking freelance projects',
  'hero.title':
    'Fullstack developer building data interfaces that operators *understand at a glance*.',
  'hero.sub':
    'Web, C++ with Qt, and HMI. Based in Tasikmalaya, Indonesia. Maintainable code, as few bugs as possible.',
  'hero.ctaProjects': 'See projects',
  'hero.ctaCollab': 'Work with me',
  'hero.ctaCv': 'Download CV',
  'hero.metaLocation': 'Tasikmalaya · WIB',
  'hero.metaSince': 'At Solusi 247 since Aug 2023',
  'hero.metaAvailable': 'Available from {date}',
  'hero.radarLabel': 'Abstract 3D illustration: wireframe with radar rings',
  'hero.radarCaption': 'SCENE · ABSTRACT',

  'section.cases.num': '01',
  'section.cases.label': 'Case studies',
  'section.cases.title': 'Interfaces operators use every day.',
  'section.about.num': '02',
  'section.about.label': 'About',
  'section.about.title': 'A little about me.',
  'section.experience.num': '03',
  'section.experience.label': 'Experience',
  'section.experience.title': 'Experience and learning.',
  'section.stack.num': '04',
  'section.stack.label': 'Stack',
  'section.stack.title': 'What I use.',
  'section.services.num': '05',
  'section.services.label': 'Services',
  'section.services.title': 'Problems I can help you solve.',
  'section.services.sub': 'I estimate time and cost after we have talked it through.',
  'section.contact.num': '06',
  'section.contact.label': 'Contact',
  'section.contact.title': "Let's talk about a project or a job opportunity.",
  'section.contact.sub': 'Tell me briefly what you need, and I will get back to you.',

  'project.problem': 'Problem',
  'project.myRole': 'My role',
  'project.result': 'Result',
  'project.stack': 'Stack',
  'project.read': 'Read case study',
  'project.readLabel': 'Read case study: {title}',
  'project.back': 'Back to home',
  'illustration.bars': 'Generic illustration: bar chart',
  'illustration.gauge': 'Generic illustration: half-circle gauge',
  'illustration.grid': 'Generic illustration: dot grid',

  'about.photoAlt': 'Photo of Galih Roswandi (placeholder)',
  'about.photoPlaceholder': '[foto Anda]',
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
  'contact.cv': 'Download CV',
  'contact.subject': 'Job or project opportunity',
  'contact.github': 'GitHub',
  'contact.linkedin': 'LinkedIn',
  'contact.instagram': 'Instagram',

  'footer.copyright': '© {year} Galih Roswandi',
  'footer.location': 'Tasikmalaya · WIB',

  'root.title': 'Galih Roswandi',
  'root.choose': 'Pilih bahasa · Choose a language',
};

export const ui: Record<Lang, Record<UIKey, string>> = { id, en };
