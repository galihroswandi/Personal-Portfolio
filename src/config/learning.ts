import type { Lang } from '@/i18n/ui';

/** Public repository the progress numbers come from (`pnpm data:learning`). */
export const learningRepo = { owner: 'galihroswandi', name: 'learning-fasttrack' } as const;

export const learningRepoUrl = `https://github.com/${learningRepo.owner}/${learningRepo.name}`;

export type LearningStatus = 'active' | 'next';

/**
 * The learning tracks in display order. `key` is the track's folder in the repo and joins this
 * list to the snapshot in `src/data/learning.json`; percentages are never written here.
 * Phase names follow each track's index in the repo.
 */
export const learningTracks: readonly {
  key: string;
  name: string;
  status: LearningStatus;
  /** What is being worked on now, or what comes first. */
  focus: Record<Lang, string>;
  /** `active`: the phases still ahead. `next`: the whole path. */
  phases: readonly Record<Lang, string>[];
}[] = [
  {
    key: 'cpp',
    name: 'C++ & Qt',
    status: 'active',
    focus: {
      id: 'Mini-project fase 6: galeri gambar dengan tema dan multi-bahasa.',
      en: 'Phase 6 mini-project: an image gallery with theming and multiple languages.',
    },
    phases: [
      { id: 'Fase 7 · Grafis dan visual lanjutan', en: 'Phase 7 · Advanced graphics and visuals' },
      { id: 'Fase 8 · Sistem dan platform', en: 'Phase 8 · System and platform' },
      { id: 'Fase 9 · Pengujian dan kualitas', en: 'Phase 9 · Testing and quality' },
      { id: 'Fase 10 · Capstone lanjutan', en: 'Phase 10 · Advanced capstone' },
    ],
  },
  {
    key: 'python',
    name: 'Python',
    status: 'next',
    focus: {
      id: 'Belum mulai. Dari fondasi, lalu PySide6 dan pymoos.',
      en: 'Not started. From the basics, then PySide6 and pymoos.',
    },
    phases: [
      { id: 'Fase 1 · Fondasi Python', en: 'Phase 1 · Python basics' },
      { id: 'Fase 2 · Intermediate', en: 'Phase 2 · Intermediate' },
      { id: 'Fase 3 · I/O, jaringan, concurrency', en: 'Phase 3 · I/O, network, concurrency' },
      { id: 'Fase 4 · Python dengan Qt (PySide6)', en: 'Phase 4 · Python with Qt (PySide6)' },
      { id: 'Fase 5 · MOOS-DB dan pymoos', en: 'Phase 5 · MOOS-DB and pymoos' },
      { id: 'Fase 6 · Capstone', en: 'Phase 6 · Capstone' },
    ],
  },
  {
    key: 'rust',
    name: 'Rust',
    status: 'next',
    focus: {
      id: 'Belum mulai. Dari ownership, menuju Rust bersama Qt dan MOOS.',
      en: 'Not started. From ownership, towards Rust with Qt and MOOS.',
    },
    phases: [
      { id: 'Fase 1 · Fondasi dan ownership', en: 'Phase 1 · Basics and ownership' },
      { id: 'Fase 2 · Intermediate', en: 'Phase 2 · Intermediate' },
      { id: 'Fase 3 · Concurrency, jaringan, FFI', en: 'Phase 3 · Concurrency, network, FFI' },
      { id: 'Fase 4 · Rust dengan C++/Qt', en: 'Phase 4 · Rust with C++/Qt' },
      { id: 'Fase 5 · Rust dengan MOOS-DB', en: 'Phase 5 · Rust with MOOS-DB' },
      { id: 'Fase 6 · Capstone', en: 'Phase 6 · Capstone' },
    ],
  },
];
