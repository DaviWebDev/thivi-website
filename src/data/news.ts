import type { ImageMetadata } from "astro";
import leadershipImg from "../assets/images/card-img-1.png";
import portalImg from "../assets/images/card-img-2.png";
import partnershipImg from "../assets/images/card-img-3.png";

export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: ImageMetadata;
  imageAlt: string;
}

export const news: NewsItem[] = [
  {
    slug: "leadership-workshop-for-kitchen-managers",
    title: "Leadership Workshop for Kitchen Managers",
    excerpt:
      "A two-day workshop on team leadership, feedback and decision making, open to students and to professionals from partner restaurants.",
    date: "2026-09-12",
    image: leadershipImg,
    imageAlt: "",
  },
  {
    slug: "student-portal-is-live",
    title: "The New Student Portal Is Live",
    excerpt:
      "Students can now follow their schedules, access class materials and contact instructors in one place, from the computer or the phone.",
    date: "2026-08-28",
    image: portalImg,
    imageAlt: "",
  },
  {
    slug: "new-hotel-partnership",
    title: "New Partnership with Regional Hotels",
    excerpt:
      "Students from the Hospitality program will now have paid internships in four partner hotels, starting next semester.",
    date: "2026-07-15",
    image: partnershipImg,
    imageAlt: "",
  },
];
