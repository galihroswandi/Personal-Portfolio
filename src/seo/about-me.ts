export const aboutMejsonld = () => {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Galih Roswandi",
        "url": `${process.env.NEXT_SITE_URL}/about"`,
        "image": `${process.env.NEXT_SITE_URL}/img/me.png"`,
        "sameAs": [
          "https://instagram.com/galih_roswandi",
          "https://github.com/galihroswandi",
          "https://www.linkedin.com/in/galih-roswandi-55a8b5271/"
        ],
        "description": "Enthusiastic to continue working in the field of technology, especially websites. Experienced in creating websites that focus on frontend development.",
        "jobTitle": "Frontend Developer",
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "SMK Muhammadiyah Kota Tasikmalaya"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Tasikmalaya",
          "addressCountry": "ID"
        },
        "knowsAbout": [
          "Software Development",
          "Frontend Development",
          "Backend Development",
          "Web Development",
          "Javascript",
          "React",
          "Blockchain",
          "Solidity",
          "Hyperledger Besu",
          "Hyperledger Firefly",
          "Next.js",
          "Tailwind CSS",
          "Bootstrap",
          "Figma",
          "GitHub"
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "GR Digital",
          "url": `${process.env.NEXT_SITE_URL}`,
        },
        "makesOffer": [
          {
            "@type": "Offer",
            "name": "Website Development Service",
            "description": "Professional website development service focused on creating high-quality, responsive websites tailored to your needs.",
            "priceCurrency": "IDR",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "url": `${process.env.NEXT_SITE_URL}/services`,
          },
          {
            "@type": "Offer",
            "name": "Website Maintenance Service",
            "description": "Professional website maintenance service to ensure your website is always up-to-date and secure.",
            "priceCurrency": "IDR",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "url": `${process.env.NEXT_SITE_URL}/contacts`,
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "5"
        }
    }
}