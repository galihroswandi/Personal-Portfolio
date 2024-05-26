export const homeJsonld = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Galih Roswandi",
    "url": "https://www.galihroswandi.com",
    "sameAs": [
      "https://instagram.com/galih_roswandi",
      "https://github.com/galihroswandi",
      "https://www.linkedin.com/in/galih-roswandi-55a8b5271/"
    ],
    "description":
      "Enthusiastic to continue working in the field of technology, especially websites. Experienced in creating websites that focus on frontend development.",
    "brand": {
      "@type": "Brand",
      "name": "GR Digital"
    },
    "knowsAbout": [
      "Software Developer",
      "Frontend Developer",
      "Backend Developer",
      "Web Developer",
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
      "Github"
    ],
    "jobTitle": "Frontend Developer",
    "alumni": "https://www.galihroswandi.com/alumni",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tasikmalaya",
      "addressCountry": "ID"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Website Development Service",
        "description":
          "Professional website development service focused on creating high-quality, responsive websites tailored to your needs.",
        "priceCurrency": "IDR",
        "itemCondition": "https://schema.org/newCondition",
        "availability": "https://schema.org/InStock",
        "url": "https://www.galihroswandi.com"
      },
      {
        "@type": "Offer",
        "name": "Website Maintenance Service",
        "description":
          "Professional website maintenance service to ensure your website is always up-to-date and secure.",
        "priceCurrency": "IDR",
        "itemCondition": "https://schema.org/newCondition",
        "availability": "https://schema.org/InStock",
        "url": "https://www.galihroswandi.com/contacts"
      }
    ]
  };
};
