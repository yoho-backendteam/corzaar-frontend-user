import React, { useState } from "react";
import {
  Heart,
  Star,
  Users,
  Clock,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";
import { FaHeart } from "react-icons/fa";
import enroll from '../../assets/clipboard-tick.png'

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    category: string;
    type: string;
    institute: string;
    price: number;
    oldPrice: number;
    enrolled: boolean;
    image: string;
    discount?: number;
    rating: number;
    reviews: number;
    students: number;
    duration: string;
  };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);

    // Optional: Save favorite courses to localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (!isFavorite) {
      // Add course to favorites
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, course.id])
      );
    } else {
      // Remove from favorites
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((id: number) => id !== course.id))
      );
    }
  };

  return (
    <div className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Image Section */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />

        {/* Discount Tag */}
        {course.discount && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {course.discount}% OFF
          </div>
        )}

        
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow hover:scale-110 transition"
        >
          {isFavorite ? (
            <FaHeart className="w-5 h-5 text-red-600" />
          ) : (
            <Heart className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Enrolled Tag */}
        {course.enrolled && (
          <div className="absolute bottom-3 right-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Enrolled
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 text-left">
        {/* Category & Type */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-[#ED1C24] text-white text-xs font-semibold px-2 py-1 rounded-md">
            {course.category}
          </span>
          <span className="border border-[#ED1C24] text-[#ED1C24] text-xs font-semibold px-2 py-1 rounded-md">
            {course.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-black leading-snug mb-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-2 leading-snug">
          Master web development with HTML, CSS, JavaScript, React, Node.js and
          more. Build real-world projects and get job-ready.
        </p>

        {/* Institute */}
        <p className="text-sm font-semibold text-gray-800 mb-3">
          {course.institute}
        </p>

        {/* Ratings, Students, Duration */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <div className="flex gap-3 items-center mr-4">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-black">{course.rating}</span>
            <span className="ml-1 text-gray-500">({course.reviews})</span>
          </div>
          <div className="flex items-center mr-4">
            <Users className="w-4 h-4 text-gray-500 mr-1" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-500 mr-1" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mb-3">
          <div className="flex">
            <p className="text-2xl font-bold text-black">
              ₹{course.price.toLocaleString()}
            </p>
            <p className="text-[#707070] mt-1 ml-3 line-through">
              ₹{course.oldPrice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Button */}
        {course.enrolled ? (
          <button className="bg-[#ED1C24] text-white text-sm font-semibold px-4 py-3 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-red-700 transition">
            
            Already Enrolled
            <img src={enroll} alt="" className="font-bold ml-1 h-5"/>
          </button>
        ) : (
          <button className="bg-[#FFDD00] text-black text-sm font-semibold px-4 py-3 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-[#FFD400] transition">
            <ShoppingCart className="w-4 h-4" />
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
