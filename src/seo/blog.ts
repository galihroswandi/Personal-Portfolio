export const blogJsonld = () => {
    return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Galih Roswandi's Blog",
        "url": "https://www.galihroswandi.com/blog",
        "description": "A blog about web development, technology, and personal projects.",
        "author": {
          "@type": "Person",
          "name": "Galih Roswandi",
          "url": "https://www.galihroswandi.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "GR Digital",
          "url": "https://www.galihroswandi.com",
        //   "logo": {
        //     "@type": "ImageObject",
        //     "url": "https://www.galihroswandi.com/images/logo.png"
        //   }
        },
        // "blogPost": [
        //   {
        //     "@type": "BlogPosting",
        //     "headline": "First Blog Post",
        //     "image": "https://www.galihroswandi.com/images/blog1.jpg",  
        //     "url": "https://www.galihroswandi.com/blog/first-post",
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
        //     "image": "https://www.galihroswandi.com/images/blog2.jpg", 
        //     "url": "https://www.galihroswandi.com/blog/second-post",
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