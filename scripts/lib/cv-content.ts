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
      'Menampilkan data sistem di aplikasi web dan desktop (Qt), memastikan data sesuai dan antarmuka mudah dipahami operator.',
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
        meta: 'Solusi 247 · Web app, dasbor, HMI',
        text: 'Antarmuka web agar operator melihat banyak data sekaligus dan menemukan informasi penting dengan cepat. Memastikan sistem berjalan sesuai perintah dan data sesuai sumbernya.',
      },
      {
        title: 'Aplikasi desktop HMI dengan Qt',
        meta: 'Solusi 247 · C++, Qt, HMI',
        text: 'Antarmuka desktop untuk operator pada sistem terbaru, setelah beralih dari web ke C++ dan Qt.',
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
      'Displaying system data in web and desktop (Qt) apps, making sure the data is correct and the interface is easy for operators to understand.',
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
        meta: 'Solusi 247 · Web app, dashboard, HMI',
        text: 'A web interface that lets operators see a lot of data at once and find what matters quickly. Making sure the system does what it is told and the data matches its source.',
      },
      {
        title: 'Desktop HMI application with Qt',
        meta: 'Solusi 247 · C++, Qt, HMI',
        text: 'A desktop interface for operators on the newest system, after moving from web to C++ and Qt.',
      },
    ],
  },
};
