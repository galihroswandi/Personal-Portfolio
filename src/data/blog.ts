export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  //   {
  //     slug: "pengertian-dan-penggunaan-html",
  //     title: "Pengertian dan penggunaan HTML",
  //     description:
  //       "HTML5 adalah kerangka kerja untuk membuat website. Perbedaannya dengan HTML sebelumnya terletak pada semantik element dan dukungan media modern.",
  //     datePublished: "2025-01-20",
  //     dateModified: "2025-01-25",
  //     image: "/img/example-blog.png",
  //     content: `## Apa itu HTML?
  // **HTML** (HyperText Markup Language) adalah bahasa markup standar untuk membuat halaman web. HTML mendefinisikan struktur dan isi dari sebuah halaman dengan menggunakan elemen-elemen yang ditandai oleh tag.
  // ## Perbedaan HTML5 dengan versi sebelumnya
  // HTML5 memperkenalkan banyak peningkatan:
  // - **Semantic elements**: \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<footer>\` untuk struktur yang lebih bermakna
  // - **Dukungan media native**: \`<audio>\` dan \`<video>\` tanpa plugin
  // - **Canvas dan SVG**: untuk grafik dan animasi
  // - **API baru**: seperti Geolocation, Local Storage, dan Web Workers
  // ## Contoh struktur dasar
  // \`\`\`html
  // <!DOCTYPE html>
  // <html lang="id">
  // <head>
  //   <meta charset="UTF-8">
  //   <title>Contoh Halaman</title>
  // </head>
  // <body>
  //   <header>
  //     <h1>Judul Situs</h1>
  //   </header>
  //   <main>
  //     <article>
  //       <h2>Artikel</h2>
  //       <p>Paragraf konten di sini.</p>
  //     </article>
  //   </main>
  // </body>
  // </html>
  // \`\`\`
  // Dengan memahami HTML dan semantik yang benar, kita bisa membuat halaman web yang lebih mudah dirawat dan lebih baik untuk aksesibilitas serta SEO.`,
  //   },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
