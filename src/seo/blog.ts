export const blogJsonld = () => {
    return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Galih Roswandi's Blog",
        "url": `${process.env.NEXT_SITE_URL}/blog`,
        "description": "A blog about web development, technology, and personal projects.",
        "author": {
          "@type": "Person",
          "name": "Galih Roswandi",
          "url": `${process.env.NEXT_SITE_URL}`,
        },
        "publisher": {
          "@type": "Organization",
          "name": "GR Digital",
          "url": `${process.env.NEXT_SITE_URL}ds`,
        //   "logo": {
        //     "@type": "ImageObject",
        //     "url": `${process.env.NEXT_SITE_URL}/images/logo.png`,
        //   }
        },
        // "blogPost": [
        //   {
        //     "@type": "BlogPosting",
        //     "headline": "First Blog Post",
        //     "image": `${process.env.NEXT_SITE_URL}/images/blog1.jpg`,
        //     "url": `${process.env.NEXT_SITE_URL}/blog/first-post`,
        //     "datePublished": "2024-01-01",
        //     "dateModified": "2024-01-01",
        //     "author": {
        //       "@type": "Person",
        //       "name": "Galih Roswandi"
        //     },
        //     "publisher": {
        //       "@type": "Organization",
        //       "name": "GR Digital"
        //     },
        //     "description": "This is the description of the first blog post."
        //   },
        //   {
        //     "@type": "BlogPosting",
        //     "headline": "Second Blog Post",
        //     "image": `${process.env.NEXT_SITE_URL}/images/blog2.jpg`,
        //     "url": `${process.env.NEXT_SITE_URL}/blog/second-post`,
        //     "datePublished": "2024-02-01",
        //     "dateModified": "2024-02-01",
        //     "author": {
        //       "@type": "Person",
        //       "name": "Galih Roswandi"
        //     },
        //     "publisher": {
        //       "@type": "Organization",
        //       "name": "GR Digital"
        //     },
        //     "description": "This is the description of the second blog post."
        //   }
        // ]
    };
}