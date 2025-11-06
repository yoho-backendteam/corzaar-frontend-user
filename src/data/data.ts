// src/data/data.ts
import bulb from "../assets/bulb.png";
import dsi from "../assets/dsi.png";
import meh from "../assets/meh.png";
import cmi from "../assets/cmi.png";
import fa from "../assets/fa.png";

export interface Institute {
  id: number;
  name: string;
  description: string;
  rating: number;
  courses: number;
  students: number;
  city: string;
  tags: string[];
  email: string;
  website: string;
  linkedin: string;
  image: string;
  verified: boolean;
}

export const institutesData: Institute[] = [
  {
    id: 1,
    name: "Tech Academy Pro",
    description:
      "Leading technology education provider with expert instructors and industry.",
    rating: 4.9,
    courses: 45,
    students: 12,
    city: "Bangalore, India",
    tags: ["Technology", "Beginner"],
    email: "info@techacademypro.com",
    website: "https://techacademypro.com",
    linkedin: "https://linkedin.com/techacademypro",
    image: bulb,
    verified: true,
  },
  {
    id: 2,
    name: "Data Science Institute",
    description:
      "Specialized in data science, AI, and machine learning courses with industry mentors.",
    rating: 4.9,
    courses: 32,
    students: 28,
    city: "Mumbai, India",
    tags: ["Technology", "Data Science"],
    email: "contact@datascienceinstitute.com",
    website: "https://datascienceinstitute.com",
    linkedin: "https://linkedin.com/dsi",
    image: dsi,
    verified: true,
  },
  {
    id: 3,
    name: "Marketing Experts Hub",
    description:
      "Complete digital marketing and business courses with real-world case studies.",
    rating: 4.9,
    courses: 41,
    students: 11,
    city: "Delhi, India",
    tags: ["Business", "Marketing"],
    email: "hello@marketingexperts.com",
    website: "https://marketingexperts.com",
    linkedin: "https://linkedin.com/meh",
    image: meh,
    verified: true,
  },
  {
    id: 4,
    name: "Cloud Masters Institute",
    description:
      "Cloud computing and DevOps certification training with hands-on labs.",
    rating: 4.9,
    courses: 33,
    students: 16,
    city: "Chennai, India",
    tags: ["Technology", "Cloud", "DevOps"],
    email: "support@cloudmasters.com",
    website: "https://cloudmasters.com",
    linkedin: "https://linkedin.com/cloudmasters",
    image: cmi,
    verified: true,
  },
  {
    id: 5,
    name: "Finance Academy",
    description:
      "Professional finance and investment courses for career growth.",
    rating: 4.7,
    courses: 65,
    students: 14,
    city: "Pune, India",
    tags: ["Finance", "Investment", "Business"],
    email: "info@financeacademy.com",
    website: "https://financeacademy.com",
    linkedin: "https://linkedin.com/financeacademy",
    image: fa,
    verified: true,
  },
];
