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
import { COLORS } from "../../Constants/uiconstants";
import type { CourseCardProps } from "../../userHomeTypes/types";



const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  console.log("trending",course)

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
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />

        {/* Discount Tag */}
        {course.discount && (
          <div className="absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded-md"  style={{color: COLORS.primary_red}}>
            {course.discount}% OFF
          </div>
        )}

        
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow hover:scale-110 transition"
        >
          {isFavorite ? (
            <FaHeart className="w-5 h-5 "  style={{color: COLORS.primary_red}}/>
          ) : (
            <Heart className="w-5 h-5 "  style={{color: COLORS.primary_gray}}/>
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
          <span className="text-white text-xs font-semibold px-2 py-1 rounded-md"  style={{background: COLORS.primary_red}}>
            {course?.category?.primary}
          </span>
          <span className="border border-[#ED1C24] text-xs font-semibold px-2 py-1 rounded-md"  style={{color: COLORS.primary_red}}>
            {course?.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-black leading-snug mb-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className=" text-sm mb-2 leading-snug"  style={{color: COLORS.primary_gray}}>
          Master web development with HTML, CSS, JavaScript, React, Node.js and
          more. Build real-world projects and get job-ready.
        </p>

        {/* Institute */}
        <p className="text-sm font-semibold  mb-3"  style={{color: COLORS.primary_gray}}>
          {course?.institute}
        </p>

        {/* Ratings, Students, Duration */}
        {course?.reviews?.length  && course?.reviews?.map((review, index)=>(
        <div className="flex items-center text-sm  mb-4"  style={{color: COLORS.primary_gray}} key={index}>
          <div className="flex gap-3 items-center mr-4">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-black">{review.rating}</span>
            <span className="ml-1 "  style={{color: COLORS.primary_gray}}>({review.comment})</span>
          </div>
          <div className="flex items-center mr-4">
            <Users className="w-4 h-4  mr-1"  style={{color: COLORS.primary_gray}}/>
            <span>{review.name}</span>
          </div>
           <div className="flex items-center">
  <Clock
    className="w-4 h-4 mr-1"
    style={{ color: COLORS.primary_gray }}
  />
  <span>
    {new Date(review.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}
  </span>
</div>
        </div>
        ))}

        {/* Price */}
        <div className="flex items-end justify-between mb-3">
          <div className="flex">
            <p className="text-2xl font-bold text-black">
              ₹{course?.price}
            </p>
            <p className=" mt-1 ml-3 line-through"  style={{color: COLORS.primary_gray}}>
              ₹{course?.oldPrice}
            </p>
          </div>
        </div>

        {/* Button */}
        {course?.enrolled ? (
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
