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
import enroll from "../../assets/clipboard-tick.png";
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


    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (!isFavorite) {
  
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, course.id])
      );
    } else {
     
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((id: number) => id !== course.id))
      );
    }
  };

  return (
    <div
      className="relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-2 sm:p-3 rounded-2xl w-full max-w-[360px] mx-auto"
      style={{ background: COLORS.primary_white }}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 sm:h-44 md:h-48 object-cover rounded-2xl"
        />

        {/* Discount Tag */}
        {course.discount && (
          <div
            className="absolute top-2 sm:top-3 left-2 sm:left-3 text-xs font-semibold px-2 py-1 rounded-md"
            style={{
              color: COLORS.primary_white,
              background: COLORS.primary_red,
            }}
          >
            {course.discount}% OFF
          </div>
        )}

        <button
          onClick={handleFavoriteToggle}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 rounded-full p-1.5 shadow hover:scale-110 transition"
          style={{ background: COLORS.primary_white }}
        >
          {isFavorite ? (
            <FaHeart
              className="w-4 h-4 sm:w-5 sm:h-5"
              style={{ color: COLORS.primary_red }}
            />
          ) : (
            <Heart
              className="w-4 h-4 sm:w-5 sm:h-5"
              style={{ color: COLORS.primary_red }}
            />
          )}
        </button>

        {/* Enrolled Tag */}
        {course.enrolled && (
          <div
            className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 px-2 py-1 rounded-md bg-[#00A63E] text-xs sm:text-sm"
            style={{
              ...(FONTS.tabheading1 as any),
              color: COLORS.primary_white,
            }}
          >
            Enrolled
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5 text-left">
        {/* Category & Type */}
        <div className="flex items-center justify-between gap-2 sm:gap-[10px] mb-3">
          <span
            className="w-auto min-w-[80px] sm:w-[101px] h-[28px] sm:h-[32px] py-1 sm:py-2 px-2 sm:px-4 rounded-[4px] text-center text-xs sm:text-sm"
            style={{
              ...(FONTS.mediummm as any),
              background: COLORS.primary_red,
              color: COLORS.primary_white,
            }}
          >
            {course.category}
          </span>

          <span
            className="w-auto min-w-[80px] sm:w-[101px] h-[28px] sm:h-[32px] py-1 sm:py-2 px-2 sm:px-4 rounded-[4px] border text-center text-xs font-medium"
            style={{ ...(FONTS.mediummm as any), color: COLORS.primary_red }}
          >
            {course.type}
          </span>
        </div>

        {/* Title */}
        <h3
          className="leading-snug mb-2 text-sm sm:text-base "
          style={{
            color: COLORS.primary_black,
            ...(FONTS.S_Cart_title1 as any),
          }}
        >
          {course.title}
        </h3>

        {/* Description */}
        <p
          className="text-xs sm:text-sm mb-2 leading-snug line-clamp-2"
          style={{
            color: COLORS.primary_gray,
            ...(FONTS.regular1 as any),
          }}
        >
          Master web development with HTML, CSS, JavaScript, React, Node.js and
          more. Build real-world projects and get job-ready.
        </p>

        {/* Institute */}
        <p
          className="text-xs sm:text-sm font-semibold mb-3"
          style={{
            color: COLORS.primary_black,
            ...(FONTS.boldHeading4 as any),
          }}
        >
          {course.institute}
        </p>

        {/* Ratings, Students, Duration - FIXED: Changed to flex-nowrap and adjusted spacing */}
        <div
          className="flex items-center text-xs sm:text-sm mb-3 sm:mb-4 gap-3 sm:gap-4 md:gap-5 flex-nowrap overflow-hidden"
          style={{ color: COLORS.primary_gray }}
        >
          <div className="flex gap-1 items-center shrink-0">
            <Star
              className="w-3 h-3 sm:w-4 sm:h-4"
              style={{
                fill: COLORS.primary_yellow,
                stroke: COLORS.primary_yellow,
              }}
            />
            <span
              className="font-semibold"
              style={{
                color: COLORS.primary_black,
                ...(FONTS.mediumm as any),
              }}
            >
              {course.rating}
            </span>
            <span
              className="ml-1"
              style={{ color: COLORS.primary_gray, ...(FONTS.mediumm as any) }}
            >
              ({course.reviews})
            </span>
          </div>

          <div className="flex items-center shrink-0">
            <Users
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
              style={{ color: COLORS.primary_gray, ...(FONTS.mediumm as any) }}
            />
            <span>{course.students.toLocaleString()}</span>
          </div>

          <div className="flex items-center shrink-0">
            <Clock
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
              style={{ color: COLORS.primary_gray }}
            />
            <span className="truncate">{course.duration}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mb-2 sm:mb-3">
          <div className="flex items-center">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-black">
              ₹{course.price.toLocaleString()}
            </p>
            <p
              className="mt-1 ml-2 sm:ml-3 line-through text-sm sm:text-base"
              style={{ color: COLORS.primary_gray }}
            >
              ₹{course.oldPrice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Button */}
        {course.enrolled ? (
          <button
            className="w-full h-[40px] sm:h-[45px] gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-white text-xs sm:text-sm font-semibold flex items-center justify-center hover:bg-red-700 transition"
            style={{ background: COLORS.primary_red }}
          >
            Already Enrolled
            <img src={enroll} alt="" className="font-bold ml-1 h-4 sm:h-5" />
          </button>
        ) : (
          <button
            className="text-black text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-[#FFD400] transition"
            style={{ background: COLORS.primary_yellow }}
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
