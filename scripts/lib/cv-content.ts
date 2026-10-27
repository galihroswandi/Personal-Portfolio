/**
 * CV copy that is not already on the site. Everything else (summary, job, skills, contact) is read
 * from `src/i18n/ui.ts`, `src/config/` and the GitHub snapshot, so the CV cannot drift from the
 * site. Only facts that are published on the site belong here: no invented dates or numbers.
 */
import type { Lang } from '../../src/i18n/ui';

export interface CvProject {
  title: string;
  meta: string;
  text: string;
}

export interface CvCopy {
  role: string;
  headings: {
    profile: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
  };
  available: string;
  /** Standard date format ("Agustus 2023 – Sekarang"): ATS parsers read it more reliably. */
  jobPeriod: string;
  jobBullets: string[];
  education: { school: string; program: string; period: string };
  projects: CvProject[];
}

export const cvCopy: Record<Lang, CvCopy> = {
  id: {
    role: 'Fullstack developer',
    headings: {
      profile: 'Profil',
      experience: 'Pengalaman',
      projects: 'Proyek',
      skills: 'Keahlian',
      education: 'Pendidikan',
    },
    available: 'Tersedia mulai',
    jobPeriod: 'Agustus 2023 – Sekarang',
    jobBullets: [
      'Membuat website untuk kebutuhan internal kantor.',
      'Sejak 2025 menampilkan data sistem di aplikasi web dan desktop (Qt) untuk operator, memastikan data sesuai dan antarmuka mudah dipahami.',
      'Beralih dari web ke C++ dan Qt dalam sekitar dua bulan sampai membangun antarmuka operator yang berjalan, dibantu AI dengan aturan kode yang mudah dirawat dan praktik terbaik.',
    ],
    education: {
      school: 'SMK Muhammadiyah Tasikmalaya',
      program: 'Rekayasa Perangkat Lunak',
      period: '2020 – 2023',
    },
    projects: [
      {
        title: 'Flowvest: aplikasi keuangan pribadi',
        meta: 'Proyek pribadi · Next.js, React, TypeScript, Supabase, PostgreSQL',
        text: 'Aplikasi keuangan multi-user yang saya rancang dan bangun sendiri: transaksi, budget, rekening, net worth, target tabungan, dan piutang. Data pengguna dilindungi Row Level Security di setiap tabel.',
      },
      {
        title: 'Aplikasi command center untuk industri maritim',
        meta: 'Solusi 247 · Angular, TypeScript, Socket.IO, ECharts, Leaflet',
        text: 'Antarmuka web agar operator melihat banyak data sekaligus, menemukan informasi penting dengan cepat, dan mengemudikan kapalnya dari layar yang sama. Memastikan sistem berjalan sesuai perintah dan data sesuai sumbernya.',
      },
      {
        title: 'Aplikasi desktop HMI dengan Qt',
        meta: 'Solusi 247 · C++, Qt, HMI',
        text: 'Antarmuka desktop untuk operator pada sistem terbaru, setelah beralih dari web ke C++ dan Qt.',
      },
      {
        title: 'Baywira: toko online dan kasir digital untuk UMKM',
        meta: 'Proyek pribadi · Next.js, NestJS, MySQL, Redis',
        text: 'Platform pesan dan bayar untuk UMKM: pelanggan memesan lewat QR toko tanpa akun, penjual mengelola produk dan pesanan dari PWA yang tetap berjalan saat offline.',
      },
      {
        title: 'Rentang: pemantau task dan jadwal proyek',
        meta: 'Proyek pribadi, open source · Svelte, TypeScript',
        text: 'Aplikasi Gantt tanpa server untuk memantau task dan jalur kritis menuju milestone. Inti logikanya TypeScript murni dengan coverage 90%.',
      },
    ],
  },
  en: {
    role: 'Fullstack developer',
    headings: {
      profile: 'Profile',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      education: 'Education',
    },
    available: 'Available from',
    jobPeriod: 'August 2023 – Present',
    jobBullets: [
      "Built websites for the company's internal needs.",
      'Since 2025, displaying system data in web and desktop (Qt) apps for operators, making sure the data is correct and the interface is easy to understand.',
      'Moved from web to C++ and Qt in about two months and built a working operator interface, with AI assistance and maintainable-code rules and best practices.',
    ],
    education: {
      school: 'SMK Muhammadiyah Tasikmalaya',
      program: 'Software Engineering (Rekayasa Perangkat Lunak)',
      period: '2020 – 2023',
    },
    projects: [
      {
        title: 'Flowvest: a personal finance app',
        meta: 'Personal project · Next.js, React, TypeScript, Supabase, PostgreSQL',
        text: 'A multi-user finance app I designed and built on my own: transactions, budgets, accounts, net worth, savings goals and receivables. User data is protected by Row Level Security on every table.',
      },
      {
        title: 'Command center application for the maritime industry',
        meta: 'Solusi 247 · Angular, TypeScript, Socket.IO, ECharts, Leaflet',
        text: 'A web interface that lets operators see a lot of data at once, find what matters quickly, and steer the ship from the same screen. Making sure the system does what it is told and the data matches its source.',
      },
      {
        title: 'Desktop HMI application with Qt',
        meta: 'Solusi 247 · C++, Qt, HMI',
        text: 'A desktop interface for operators on the newest system, after moving from web to C++ and Qt.',
      },
      {
        title: 'Baywira: online shop and digital checkout for small businesses',
        meta: 'Personal project · Next.js, NestJS, MySQL, Redis',
        text: 'An ordering and payment platform for small businesses: customers order through the shop QR code without an account, and sellers manage products and orders in a PWA that keeps working offline.',
      },
      {
        title: 'Rentang: a task and project schedule tracker',
        meta: 'Personal project, open source · Svelte, TypeScript',
        text: 'A serverless Gantt app for tracking tasks and the critical path to each milestone. The core logic is plain TypeScript with 90% coverage.',
      },
    ],
  },
};
