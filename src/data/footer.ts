export const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Programs", href: "/programs" },
      { label: "Affiliations", href: "/affiliations" },
      { label: "News", href: "/news" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
] as const;

export const footerInfo = [
  {
    title: "Email",
    type: "link",
    value: "contact@thivi.com.au",
    href: "mailto:contact@thivi.com.au",
  },
  { title: "Location", type: "text", value: "Sydney, Australia" },
] as const;
