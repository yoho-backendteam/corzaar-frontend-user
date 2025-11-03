import dealsImage from "../assets/images/dealimage.png"

export const dummyDeals = [
  {
    id: 1,
    title: "New Year Mega Sale",
    subtitle: "Technology Courses",
    discount: "42% OFF",
    description: "Get up to 60% OFF on Technology Courses",
    code: "NEWYEAR60",
    validUntil: "Dec 31, 2025",
    applicableTo: [
      "Complete Web Development Bootcamp",
      "Data Science & Machine Learning",
      "Cloud Computing with AWS",
      "+1 More",
    ],
    image: dealsImage,
  },
  {
    id: 2,
    title: "New Year Mega Sale",
    subtitle: "Business and Marketing Courses",
    discount: "42% OFF",
    description: "50% OFF on all business and marketing courses",
    code: "FLASH50",
    validUntil: "Dec 31, 2025",
    applicableTo: [
      "Digital Marketing Masterclass",
      "Content Writing & Copywriting",
      "+1 More",
    ],
    image: dealsImage,
  },
   {
    id: 2,
    title: "New Year Mega Sale",
    subtitle: "Business and Marketing Courses",
    discount: "42% OFF",
    description: "Extra 15% Off an already discounted courses",
    code: "STUDENT",
    validUntil: "Dec 31, 2025",
    applicableTo: [
      "All Courses",
    
    ],
    image: dealsImage,
  },
];
