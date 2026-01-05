import React, { useState } from "react";
import {
  Heart,
  Star,
  Users,
  Clock,
  ShoppingCart,
} from "lucide-react";
import { FaHeart } from "react-icons/fa";
import enroll from '../../assets/clipboard-tick.png'
import { COLORS, FONTS } from "../../Constants/uiconstants";

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
    <div className="relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-2 rounded-2xl"
    style={{background:COLORS.primary_white}}>
      {/* Image Section */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover rounded-2xl"
        />

        {/* Discount Tag */}
        {course.discount && (
          <div className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-md"  style={{color: COLORS.primary_white,background:COLORS.primary_red}}>
            {course.discount}% OFF
          </div>
        )}

        
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 rounded-full p-1.5 shadow hover:scale-110 transition"
          style={{background:COLORS.primary_white}}
        >
          {isFavorite ? (
            <FaHeart className="w-5 h-5 "  style={{color: COLORS.primary_red}}/>
          ) : (
            <Heart className="w-5 h-5 "  style={{color: COLORS.primary_red}}/>
          )}
        </button>

        {/* Enrolled Tag */}
        {course.enrolled && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md"
          style={{background:COLORS.secondary_green,color:COLORS.primary_white}} >
            Enrolled
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 text-left">
        {/* Category & Type */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-1 rounded-md"  style={{background: COLORS.primary_red ,color:COLORS.primary_white}}>
            {course.category}
          </span>
          <span className="border  text-xs font-semibold px-2 py-1 rounded-md"  style={{color: COLORS.primary_red}}>
            {course.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="leading-snug mb-2" style={{color:COLORS.primary_black,...(FONTS.boldHeadingg2 as any)}}>
          {course.title}
        </h3>

        {/* Description */}
        <p className=" text-sm mb-2 leading-snug"  style={{color: COLORS.primary_gray}}>
          Master web development with HTML, CSS, JavaScript, React, Node.js and
          more. Build real-world projects and get job-ready.
        </p>

        {/* Institute */}
        <p className="text-sm font-semibold  mb-3"  style={{color: COLORS.primary_black}}>
          {course.institute}
        </p>

        {/* Ratings, Students, Duration */}
       <div
  className="flex flex-wrap items-center text-sm mb-4 gap-3 sm:gap-4"
  style={{ color: COLORS.primary_gray }}
>
  <div className="flex gap-1 items-center mr-4 sm:mr-6">
    <Star className="w-4 h-4" style={{ fill: COLORS.primary_yellow,  
    stroke: COLORS.primary_yellow, }} />
    <span className="font-semibold" style={{color:COLORS.primary_black}}>{course.rating}</span>
    <span className="ml-1" style={{ color: COLORS.primary_gray }}>
      ({course.reviews})
    </span>
  </div>

  <div className="flex items-center mr-4 sm:mr-6">
    <Users className="w-4 h-4 mr-1" style={{ color: COLORS.primary_gray }} />
    <span>{course.students.toLocaleString()}</span>
  </div>

  <div className="flex items-center">
    <Clock className="w-4 h-4 mr-1" style={{ color: COLORS.primary_gray }} />
    <span>{course.duration}</span>
  </div>
</div>
        {/* Price */}
        <div className="flex items-end justify-between mb-3">
          <div className="flex">
            <p className="text-2xl font-bold text-black">
              ₹{course.price.toLocaleString()}
            </p>
            <p className=" mt-1 ml-3 line-through"  style={{color: COLORS.primary_gray}}>
              ₹{course.oldPrice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Button */}
        {course.enrolled ? (
          <button className=" text-white text-sm font-semibold px-4 py-3 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-red-700 transition"  style={{background: COLORS.primary_red}}>
            
            Already Enrolled
            <img src={enroll} alt="" className="font-bold ml-1 h-5"/>
          </button>
        ) : (
          <button className=" text-black text-sm font-semibold px-4 py-3 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-[#FFD400] transition"  style={{background: COLORS.primary_yellow}}>
            <ShoppingCart className="w-4 h-4" />
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
