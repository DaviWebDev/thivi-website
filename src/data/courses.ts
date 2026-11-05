import type { ImageMetadata } from "astro";
import leadershipImg from "../assets/images/first-programs-img.png";
import marketingImg from "../assets/images/second-programs-img.png";
import hospitalityImg from "../assets/images/third-programs-img.png";

export interface CourseVisual {
  slug: string;
  image: ImageMetadata;
  imageAlt: string;
}

export const courseVisuals: CourseVisual[] = [
  {
    slug: "leadership-and-management",
    image: leadershipImg,
    imageAlt: "Hospitality team planning their work",
  },
  {
    slug: "digital-marketing-and-communication",
    image: marketingImg,
    imageAlt: "Laptop ready for digital marketing work",
  },
  {
    slug: "hospitality",
    image: hospitalityImg,
    imageAlt: "A banquet table prepared for hospitality service",
  },
];

export function getCourseVisual(slug: string): CourseVisual {
  const visual = courseVisuals.find((course) => course.slug === slug);

  if (!visual) {
    throw new Error(`No course card image is configured for "${slug}".`);
  }

  return visual;
}

export function orderPrograms<T extends { id: string }>(programs: T[]): T[] {
  return [...programs].sort((first, second) => {
    const firstIndex = courseVisuals.findIndex(
      (course) => course.slug === first.id,
    );
    const secondIndex = courseVisuals.findIndex(
      (course) => course.slug === second.id,
    );

    if (firstIndex === -1) {
      throw new Error(`No course card image is configured for "${first.id}".`);
    }

    if (secondIndex === -1) {
      throw new Error(`No course card image is configured for "${second.id}".`);
    }

    return firstIndex - secondIndex;
  });
}
