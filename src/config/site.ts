/** Site-wide values. The only place for contact details, dates, and location. */
export const site = {
  name: 'Galih Roswandi',
  /**
   * Canonical origin: https, no www, no trailing slash. Every absolute URL (canonical, hreflang,
   * sitemap, Open Graph, JSON-LD, robots.txt) is built from it, and `vercel.json` sends
   * `noindex` on every other host (a test keeps the two in sync). Page paths always end in `/`.
   */
  url: 'https://galihroswandi.vercel.app',
  email: 'roswandibusiness@gmail.com',
  availableFrom: '2027-08-01',
  location: {
    city: 'Tasikmalaya',
    region: 'Jawa Barat',
    country: 'ID',
    timezone: 'Asia/Jakarta',
    lat: -7.33,
    lng: 108.22,
  },
  /** Own public profiles. Anything that is not an http(s) URL is treated as "not set yet". */
  social: {
    github: 'https://github.com/galihroswandi',
    linkedin: 'https://www.linkedin.com/in/galih-roswandi-55a8b5271',
    instagram: '#',
  },
  /** Date the site was first published (first commit), for ProfilePage `dateCreated`. */
  createdAt: '2026-10-10',
  /** Publish the employer as `worksFor` in structured data. Owner decision; off by default. */
  publishEmployer: false,
  employer: 'Solusi 247',
} as const;
