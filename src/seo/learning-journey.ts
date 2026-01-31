export const learningJourneyJsonld = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Learning Journey - Galih Roswandi",
    url: `${process.env.NEXT_SITE_URL}/learning-journey`,
    description:
      "What Galih Roswandi is currently learning: skills, technologies, and topics in progress.",
    author: {
      "@type": "Person",
      name: "Galih Roswandi",
      url: process.env.NEXT_SITE_URL,
    },
  };
};
