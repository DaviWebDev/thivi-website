/*Astro Components*/
import type { ImageMetadata } from "astro";
/*Images*/
import leadershipImg from "../assets/images/first-programs-img.png";
import marketingImg from "../assets/images/second-programs-img.png";
import hospitalityImg from "../assets/images/third-programs-img.png";

export interface Course {
  slug: string;
  title: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
}

export const coursesData: Course[] = [
  {
    slug: "leadership-and-management",
    title: "Cert IV in Leadership & Management",
    description:
      "Build the skills to lead a kitchen or a hospitality team. You will learn to plan work, manage budgets, give feedback and make decisions under pressure, with practical projects in real working environments.",
    image: leadershipImg,
    imageAlt: "Person holding a coffee mug",
  },
  {
    slug: "digital-marketing-and-communication",
    title: "Cert IV in Digital Marketing and Communication",
    description:
      "Learn how to promote restaurants, hotels and events online. The course covers social media, content creation, customer communication and how to measure the results of a campaign.",
    image: marketingImg,
    imageAlt: "Laptop and monitor on a work desk",
  },
  {
    slug: "hospitality",
    title: "Cert IV in Hospitality",
    description:
      "A complete introduction to the hospitality industry, from guest service and event setup to operations and teamwork, preparing you for your first job in restaurants, hotels and event companies.",
    image: hospitalityImg,
    imageAlt: "Waiter setting a banquet table with flowers",
  },
];
