export interface ProjectTechStack {
  logoUrl: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  desc: string;
  imgProject: string;
  repositoryUrl?: string;
  websiteUrl?: string;
  detail: string;
  techStack: ProjectTechStack[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Comerce Garuda Store",
    desc: "This simple e-commerce project uses ReactJS, Firebase, and Redux technologies. In this project, e-commerce applications are built using the ReactJS framework for a responsive user interface.",
    imgProject: "/img/project-1.png",
    repositoryUrl: "https://github.com/galihroswandi/E-comerce",
    websiteUrl: undefined,
    detail:
      "E-Comerce Garuda Store adalah proyek e-commerce sederhana yang dibangun dengan ReactJS, Firebase, dan Redux. Aplikasi ini menawarkan antarmuka responsif untuk berbelanja, keranjang belanja, dan autentikasi pengguna. Firebase digunakan untuk backend dan penyimpanan data. Dari proyek ini saya belajar integrasi state management dengan Redux dan real-time database dengan Firebase.",
    techStack: [
      { logoUrl: "/icons/react.svg", alt: "react logo" },
      { logoUrl: "/icons/tailwindcss.svg", alt: "tailwindcss logo" },
      { logoUrl: "/icons/reactrouter.svg", alt: "react-router logo" },
      { logoUrl: "/icons/firebase.svg", alt: "firebase logo" },
    ],
  },
  {
    id: "2",
    title: "Landing Page Baarshop",
    desc: "The TikTok Seller Client Website is a website project using Next.js and Tailwind CSS. This project aims to give online presence to TikTok sellers and introduce their products to TikTok users.",
    imgProject: "/img/project-2.png",
    repositoryUrl: undefined,
    websiteUrl: "https://baarshopid.vercel.app",
    detail:
      "Landing Page Baarshop adalah website untuk klien seller TikTok. Tujuannya memberi kehadiran online bagi seller dan memperkenalkan produk mereka ke pengguna TikTok. Dibangun dengan Next.js dan Tailwind CSS untuk performa dan tampilan yang rapi. Proyek ini membantu seller memiliki halaman produk yang profesional tanpa perlu infrastruktur rumit.",
    techStack: [
      { logoUrl: "/icons/nextjs.svg", alt: "nextjs logo" },
      { logoUrl: "/icons/tailwindcss.svg", alt: "tailwindcss logo" },
    ],
  },
  {
    id: "3",
    title: "Personal Portfolio",
    desc: "This website showcases a description about me and includes a feature to contact me. It was created using Next.js and Tailwind CSS. I also used the Framer Motion library for animations.",
    imgProject: "/img/project-3.png",
    repositoryUrl: undefined,
    websiteUrl: "https://galih.roswandi.com",
    detail:
      "Situs portfolio ini menampilkan tentang saya, proyek yang pernah dikerjakan, learning journey, dan blog. Fitur yang ada antara lain: halaman about, showcase project dengan detail modal, learning journey, blog berbasis file, dan halaman kontak. Dibangun dengan Next.js, Tailwind CSS, dan Framer Motion untuk animasi. Deploy dengan Docker, Nginx, dan Linux.",
    techStack: [
      { logoUrl: "/icons/nextjs.svg", alt: "nextjs logo" },
      { logoUrl: "/icons/tailwindcss.svg", alt: "tailwindcss logo" },
      { logoUrl: "/icons/docker.svg", alt: "docker logo" },
      { logoUrl: "/icons/linux.svg", alt: "linux logo" },
      { logoUrl: "/icons/nginx.svg", alt: "nginx logo" },
    ],
  },
  {
    id: "4",
    title: "Baywira for UMKM",
    desc: "A website that helps UMKM to manage their sales, with an easy-to-use UI and payment integration will certainly make it easier for users to pay via QRIS.",
    imgProject: "/img/project-4.png",
    repositoryUrl: undefined,
    websiteUrl: "https://www.baywira.id",
    detail:
      "Baywira for UMKM adalah website yang membantu UMKM mengelola penjualan dengan antarmuka yang mudah digunakan. Integrasi pembayaran memudahkan pelanggan membayar via QRIS. Dibangun dengan Next.js di frontend dan NestJS di backend, database MySQL. Deploy menggunakan Docker, Linux, dan Nginx. Proyek ini fokus pada pengalaman pengguna dan alur pembayaran yang lancar.",
    techStack: [
      { logoUrl: "/icons/nextjs.svg", alt: "nextjs logo" },
      { logoUrl: "/icons/nestjs.svg", alt: "nestjs logo" },
      { logoUrl: "/icons/mysql.svg", alt: "mysql logo" },
      { logoUrl: "/icons/tailwindcss.svg", alt: "tailwindcss logo" },
      { logoUrl: "/icons/docker.svg", alt: "docker logo" },
      { logoUrl: "/icons/linux.svg", alt: "linux logo" },
      { logoUrl: "/icons/nginx.svg", alt: "nginx logo" },
    ],
  },
];
