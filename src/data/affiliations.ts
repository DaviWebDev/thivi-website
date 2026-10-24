interface InfoItem {
  icon: string;
  label: string;
  href?: string;
}

interface InfoData {
  location: InfoItem;
  email: InfoItem;
  phone: InfoItem;
}

interface Affiliations {
  title: string;
  info: InfoData;
}

export const affiliationsData: Affiliations[] = [
  {
    title: "Australian Consultancy for Education & Training",
    info: {
      location: { icon: "location-icon", label: "Kathmandu, Nepal" },
      email: {
        icon: "email-icon",
        label: "abroadhub@gmail.com",
        href: "mailto:abroadhub@gmail.com",
      },
      phone: {
        icon: "phone-icon",
        label: "02 9671 111",
        href: "tel:+6129671111",
      },
    },
  },
  {
    title: "Australian Consultancy for Education & Training",
    info: {
      location: { icon: "location-icon", label: "Kathmandu, Nepal" },
      email: {
        icon: "email-icon",
        label: "abroadhub@gmail.com",
        href: "mailto:abroadhub@gmail.com",
      },
      phone: {
        icon: "phone-icon",
        label: "02 9671 111",
        href: "tel:+6129671111",
      },
    },
  },
  {
    title: "Australian Consultancy for Education & Training",
    info: {
      location: { icon: "location-icon", label: "Kathmandu, Nepal" },
      email: {
        icon: "email-icon",
        label: "abroadhub@gmail.com",
        href: "mailto:abroadhub@gmail.com",
      },
      phone: {
        icon: "phone-icon",
        label: "02 9671 111",
        href: "tel:+6129671111",
      },
    },
  },
];
