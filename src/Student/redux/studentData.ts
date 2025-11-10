import starIcon from "../../assets/react.svg";
import promo1 from "../../assets/teacher.svg";
import promo2 from "../../assets/teacher2.png";
import promo3 from "../../assets/teacher3.png";

const initialState = {
  stats: {
    students: 50000,
    courses: 500,
    institutes: 100,
    ratings: 4.8,
  },

  filters: [
    "Online Courses",
    "Top Rated",
    "Near You",
    "Free Courses",
    "Short Term",
  ],

  promotions: [
    {
      id: 1,
      title: "20% Off Web Dev Bootcamp",
      description:
        "Join the top-rated Full Stack course — limited offer ends soon!",
      buttonText: "Enroll Now",
      buttonColor: "bg-red-600",
      icon: promo3,
    },
    {
      id: 2,
      title: "Top Institute: Global Tech",
      description:
        "Over 10,000 students trained by expert mentors. Explore their best courses!",
      buttonText: "View Institute",
      buttonColor: "bg-red-600",
      icon: promo1,
    },
    {
      id: 3,
      title: "New Data Science Programs",
      description:
        "Learn AI and Machine Learning with real-world projects and mentorship.",
      buttonText: "Discover Now",
      buttonColor: "bg-red-600",
      icon: promo2,
    },
  ],

  // 🎯 Top Courses — all with full details
  topCourses: [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      category: "Technology",
      type: "Beginner",
      institute: "Tech Academy Pro",
      price: 2999,
      oldPrice: 4999,
      enrolled: true,
      discount: 40,
      rating: 4.8,
      reviews: 2400,
      students: 15000,
      duration: "6 Months",
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      category: "Technology",
      type: "Intermediate",
      institute: "Data Science Institute",
      price: 3499,
      oldPrice: 5999,
      enrolled: false,
      discount: 42,
      rating: 4.6,
      reviews: 3200,
      students: 12000,
      duration: "8 Months",
      image:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass",
      category: "Business",
      type: "Beginner",
      institute: "Tech Academy Pro",
      price: 1999,
      oldPrice: 3999,
      enrolled: true,
      discount: 50,
      rating: 4.7,
      reviews: 4100,
      students: 18000,
      duration: "4 Months",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 4,
      title: "UI/UX Design for Beginners",
      category: "Design",
      type: "Beginner",
      institute: "Creative Minds",
      price: 2799,
      oldPrice: 4999,
      enrolled: false,
      discount: 44,
      rating: 4.5,
      reviews: 1500,
      students: 8000,
      duration: "3 Months",
      image:
        "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 5,
      title: "Full Stack MERN Developer",
      category: "Programming",
      type: "Advanced",
      institute: "CodeHub Academy",
      price: 4599,
      oldPrice: 7999,
      enrolled: false,
      discount: 43,
      rating: 4.9,
      reviews: 5400,
      students: 20000,
      duration: "10 Months",
      image:
        "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 6,
      title: "Python for Data Analysis",
      category: "Technology",
      type: "Beginner",
      institute: "CodeCraft Institute",
      price: 2499,
      oldPrice: 4499,
      enrolled: false,
      discount: 45,
      rating: 4.6,
      reviews: 2800,
      students: 10000,
      duration: "5 Months",
      image:
        "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ],

  // 🔥 Trending Courses — same structure
  trendingCourses: [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      category: "Technology",
      type: "Beginner",
      institute: "Tech Academy Pro",
      price: 2999,
      oldPrice: 4999,
      enrolled: true,
      discount: 40,
      rating: 4.8,
      reviews: 2400,
      students: 15000,
      duration: "6 Months",
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      category: "Technology",
      type: "Intermediate",
      institute: "Data Science Institute",
      price: 3499,
      oldPrice: 5999,
      enrolled: false,
      discount: 42,
      rating: 4.6,
      reviews: 3200,
      students: 12000,
      duration: "8 Months",
      image:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass",
      category: "Business",
      type: "Beginner",
      institute: "Tech Academy Pro",
      price: 1999,
      oldPrice: 3999,
      enrolled: true,
      discount: 50,
      rating: 4.7,
      reviews: 4100,
      students: 18000,
      duration: "4 Months",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 4,
      title: "UI/UX Design for Beginners",
      category: "Design",
      type: "Beginner",
      institute: "Creative Minds",
      price: 2799,
      oldPrice: 4999,
      enrolled: false,
      discount: 44,
      rating: 4.5,
      reviews: 1500,
      students: 8000,
      duration: "3 Months",
      image:
        "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 5,
      title: "Full Stack MERN Developer",
      category: "Programming",
      type: "Advanced",
      institute: "CodeHub Academy",
      price: 4599,
      oldPrice: 7999,
      enrolled: false,
      discount: 43,
      rating: 4.9,
      reviews: 5400,
      students: 20000,
      duration: "10 Months",
      image:
        "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 6,
      title: "Python for Data Analysis",
      category: "Technology",
      type: "Beginner",
      institute: "CodeCraft Institute",
      price: 2499,
      oldPrice: 4499,
      enrolled: false,
      discount: 45,
      rating: 4.6,
      reviews: 2800,
      students: 10000,
      duration: "5 Months",
      image:
        "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ],

  popularInstitute: [
    {
      id: 1,
      name: "Tech Academy Pro",
      courses: 45,
      rating: 4.8,
      location: "Bangalore, India",
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      name: "Data Science Institute",
      courses: 28,
      rating: 4.4,
      location: "Hyderabad, India",
      image:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 3,
      name: "Marketing Experts Hub",
      courses: 46,
      rating: 4.5,
      location: "Mumbai, India",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 4,
      name: "Cloud Masters Institute",
      courses: 12,
      rating: 4.9,
      location: "100km",
      image:
        "https://images.pexels.com/photos/1181315/pexels-photo-1181315.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ],

  InstitueExperts: [
    {
      id: 3,
      name: "Marketing Experts Hub",
      courses: 46,
      rating: 4.5,
      location: "20km",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 4,
      name: "Cloud Masters Institute",
      courses: 12,
      rating: 4.9,
      location: "50km",
      image:
        "https://images.pexels.com/photos/1181315/pexels-photo-1181315.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 1,
      name: "Tech Academy Pro",
      courses: 45,
      rating: 4.8,
      location: "30km",
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      name: "Data Science Institute",
      courses: 28,
      rating: 4.4,
      location: "50km",
      image:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ],

  categories: [
    { id: 1, name: "Technology", courses: 4 },
    { id: 2, name: "Business", courses: 2 },
    { id: 3, name: "Design", courses: 1 },
    { id: 4, name: "Finance", courses: 6 },
  ],
};

export default initialState;
