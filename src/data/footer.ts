export const footerLinks = [
  {
    title: "Community",
    links: [
      { label: "Featured artists", href: "/featured-artists" },
      { label: "The Portal", href: "/the-portal" },
      { label: "Live events", href: "/live-events" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
      { label: "History", href: "/history" },
    ],
  },
] as const;

export const footerInfo = [
  {
    title: "Follow us",
    type: "social",
    socialMedia: [
      { name: "Twitter", icon: "social/twitter", href: "/twitter" },
      { name: "Facebook", icon: "social/facebook", href: "/facebook" },
      { name: "Instagram", icon: "social/instagram", href: "/instagram" },
      { name: "LinkedIn", icon: "social/linkedin", href: "/linkedin" },
    ],
  },
  {
    title: "Contact",
    type: "link",
    value: "9860879045",
    href: "tel:9860879045",
  },
  { title: "Address", type: "text", value: "Chyasundol - 06, Golfutar" },
] as const;
