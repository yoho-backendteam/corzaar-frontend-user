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
import type { CourseCardProps } from "../../userHomeTypes/types";
import { AddtoCartService } from "../../features/cart/services";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "../../store/store";
// import { addtokartThunk } from "../../features/home_page/reducers/homeThunk";




const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  // const dispatch = useDispatch<AppDispatch>();

  async function handelAddtoCart(id: string) {
    const response = await AddtoCartService(id)
    if (response?.success) {
      toast.success("course added your cart")
    } else {
      toast.warn("try again, something error.")
    }
  }


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

  const oldPrice = (course?.pricing?.price * 0.05) + course?.pricing?.price

  return (
    <div className="relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-2 rounded-2xl"
      style={{ background: COLORS.primary_white }}>
      {/* Image Section */}
      <div className="relative">
        <img
          src={course?.thumbnail || "/placeholder.png"}
          alt={course?.title || "Course Image"}
          className="w-full h-48 object-cover"
        />

        {/* Discount Tag */}
        {course.discount && (
          <div className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-md" style={{ color: COLORS.primary_white, background: COLORS.primary_red }}>
            {course.discount}% OFF
          </div>
        )}


        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 rounded-full p-1.5 shadow hover:scale-110 transition"
          style={{ background: COLORS.primary_white }}
        >
          {isFavorite ? (
            <FaHeart className="w-5 h-5 " style={{ color: COLORS.primary_red }} />
          ) : (
            <Heart className="w-5 h-5 " style={{ color: COLORS.primary_red }} />
          )}
        </button>

        {/* Enrolled Tag */}
        {course.enrolled && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md"
            style={{ background: COLORS.secondary_green, color: COLORS.primary_white }} >
            Enrolled
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 text-left">
        {/* Category & Type */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-white text-xs font-semibold px-2 py-1 rounded-md" style={{ background: COLORS.primary_red }}>
            {course?.category?.primary}
          </span>
          <span className="border border-[#ED1C24] text-xs font-semibold px-2 py-1 rounded-md" style={{ color: COLORS.primary_red }}>
            {course?.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="leading-snug mb-2" style={{ color: COLORS.primary_black, ...(FONTS.boldHeadingg2 as any) }}>
          {course.title}
        </h3>

        {/* Description */}
        <p className=" text-sm mb-2 leading-snug" style={{ color: COLORS.primary_gray }}>
          {course?.description}
        </p>

        {/* Institute */}
        <p className="text-sm font-semibold  mb-3" style={{ color: COLORS.primary_gray }}>
          {course?.institute}
        </p>

        {/* Ratings, Students, Duration */}
        {course?.reviews?.length ? course?.reviews?.map((review, index) => (
          <div className="flex items-center text-sm  mb-4" style={{ color: COLORS.primary_gray }} key={index}>
            <div className="flex gap-3 items-center mr-4">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-black">{review.rating}</span>
              <span className="ml-1 " style={{ color: COLORS.primary_gray }}>({review.comment})</span>
            </div>
            <div className="flex items-center mr-4">
              <Users className="w-4 h-4  mr-1" style={{ color: COLORS.primary_gray }} />
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
        )) : null}

        {/* Price */}
        <div className="flex items-end justify-between mb-3">
          <div className="flex">
            <p className="text-2xl font-bold text-black">
              ₹{course?.pricing?.price}
            </p>
            <p className=" mt-1 ml-3 line-through" style={{ color: COLORS.primary_gray }}>
              ₹{oldPrice}
            </p>
          </div>
        </div>

        {/* Button */}
        {course?.enrolled ? (
          <button className=" text-white text-sm font-semibold px-4 py-3 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-red-700 transition" style={{ background: COLORS.primary_red }}>

            Already Enrolled
            <img src={enroll} alt="" className="font-bold ml-1 h-5" />
          </button>
        ) : (
          <button className=" text-black text-sm font-semibold px-4 py-3 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-[#FFD400] transition" style={{ background: COLORS.primary_yellow }} onClick={() => handelAddtoCart(course?._id)}>
            <ShoppingCart className="w-4 h-4" />
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
