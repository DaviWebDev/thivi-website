export const footerLinks = [
  {
    title: "Community",
    links: [
      { label: "Featured artists", href: "#" },
      { label: "The Portal", href: "#" },
      { label: "Live events", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#" },
      { label: "Contact us", href: "#" },
      { label: "History", href: "#" },
    ],
  },
] as const;

export const footerInfo = [
  {
    title: "Follow us",
    type: "social",
    socialMedia: [
      { name: "Twitter", icon: "social/twitter", href: "#" },
      { name: "Facebook", icon: "social/facebook", href: "#" },
      { name: "Instagram", icon: "social/instagram", href: "#" },
      { name: "LinkedIn", icon: "social/linkedin", href: "#" },
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
