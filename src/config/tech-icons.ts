import {
  siCplusplus,
  siDocker,
  siExpress,
  siLaravel,
  siLinux,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPwa,
  siQt,
  siReact,
  siRedis,
  siSocketdotio,
  siSupabase,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
} from 'simple-icons';

const icons = [
  ['C++', siCplusplus],
  ['Docker', siDocker],
  ['Express', siExpress],
  ['Laravel', siLaravel],
  ['Linux', siLinux],
  ['MySQL', siMysql],
  ['NestJS', siNestjs],
  ['Next.js', siNextdotjs],
  ['Node.js', siNodedotjs],
  ['PostgreSQL', siPostgresql],
  ['PWA', siPwa],
  ['Qt', siQt],
  ['React', siReact],
  ['Redis', siRedis],
  ['Socket.IO', siSocketdotio],
  ['Supabase', siSupabase],
  ['Tailwind CSS', siTailwindcss],
  ['Three.js', siThreedotjs],
  ['TypeScript', siTypescript],
] as const;

const byName = new Map<string, string>(icons.map(([name, icon]) => [name, icon.path]));

/** SVG path (24x24 viewBox) of a technology's logo, or undefined when it has none (e.g. "HMI"). */
export const techIcon = (name: string): string | undefined => byName.get(name);
