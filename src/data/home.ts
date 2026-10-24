import type { ImageMetadata } from "astro";
import cardImg1 from "../assets/images/card-img-1.png";
import cardImg2 from "../assets/images/card-img-2.png";
import cardImg3 from "../assets/images/card-img-3.png";

interface CourseCard {
  slug: string;
  title: string;
  excerpt: string;
  image: ImageMetadata;
  imageAlt: string;
}

export const heroCards = [
  {
    image: "coaching-icon",
    title: "Certified Teachers",
    txt: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
  },
  {
    image: "coaching-icon",
    title: "Certified Teachers",
    txt: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
  },
  {
    image: "coaching-icon",
    title: "Certified Teachers",
    txt: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
  },
  {
    image: "coaching-icon",
    title: "Certified Teachers",
    txt: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
  },
];

export const coursesCards: CourseCard[] = [
  {
    slug: "/cert-iv-in-leadership-&-management",
    title: "Cert IV in Leadership & Management",
    excerpt:
      "Separated they live in. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country ...",
    image: cardImg1,
    imageAlt: "Woman holding a mug",
  },
  {
    slug: "/Cert-iv-in-digital-marketing-and-communication",
    title: "Cert IV in Digital Marketing and Communication",
    excerpt:
      "Separated they live in. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country ...",
    image: cardImg2,
    imageAlt: "Work setup",
  },
  {
    slug: "/cert-iv=hospitality",
    title: "Cert IV Hospitality",
    excerpt:
      "Separated they live in. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country ...",
    image: cardImg3,
    imageAlt: "Waiter organizing the table",
  },
];
