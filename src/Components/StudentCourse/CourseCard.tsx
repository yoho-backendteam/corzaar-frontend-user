"use client";

import { useState } from "react";
import { Star, Heart, Clock, Users } from "lucide-react";
import enroll from "../../assets/Image/enroll.png";
import cart from "../../assets/Image/cart.png";
import { COLORS, FONTS } from "../../Constants/uiconstants";

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: {
    primary: string;
    tags: string[];
  };
  level: string;
  rating: number;
  reviews: any[];
  pricing: {
    price: number;
    discountPrice?: number;
    currency: string;
  };
  content: {
    totalDuration?: number;
    totalLessons?: number;
  };
  instituteId?: string;
  enrolled?: boolean;
}

export default function CourseCard({ course }: { course: Course }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleHeartClick = () => {
    setIsFavorite(!isFavorite);
  };

  if (!course) {
    return (
      <div className="flex flex-col justify-center items-start p-4 gap-4 w-full max-w-sm mx-auto rounded-2xl bg-white shadow-lg">
        <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="w-full space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getOriginalPrice = () => {
    if (course.pricing.discountPrice && course.pricing.discountPrice > 0) {
      return formatPrice(course.pricing.price, course.pricing.currency);
    }
    return null;
  };

  const getDisplayPrice = () => {
    if (course.pricing.discountPrice && course.pricing.discountPrice > 0) {
      return formatPrice(course.pricing.discountPrice, course.pricing.currency);
    }
    return formatPrice(course.pricing.price, course.pricing.currency);
  };

  const getDiscountPercentage = () => {
    if (course.pricing.discountPrice && course.pricing.discountPrice > 0) {
      const discount = ((course.pricing.price - course.pricing.discountPrice) / course.pricing.price) * 100;
      return Math.round(discount);
    }
    return null;
  };

  return (
    <div
      className="flex flex-col justify-center items-start p-4 gap-4 w-full max-w-sm mx-auto rounded-2xl transition-all duration-300 hover:shadow-lg bg-white"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 25px rgba(0,0,0,0.1)",
        fontFamily: FONTS.regular?.fontFamily,
        fontWeight: FONTS.regular?.fontWeight,
        fontStyle: FONTS.regular?.fontStyle,
      }}
    >
      <div className="relative w-full">
        <img
          src={imageError ? '/fallback-course-image.jpg' : (course.thumbnail || '/fallback-course-image.jpg')}
          alt={course.title}
          className="w-full h-48 object-cover rounded-lg"
          onError={() => setImageError(true)}
        />

        {getDiscountPercentage() && (
          <span
            className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-md"
            style={{
              backgroundColor: COLORS.primary_red,
              color: COLORS.primary_white,
              fontFamily: FONTS.medium?.fontFamily,
            }}
          >
            {getDiscountPercentage()}% OFF
          </span>
        )}

        <button
          onClick={handleHeartClick}
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow transition-transform hover:scale-110"
        >
          <Heart
            size={18}
            fill={isFavorite ? COLORS.primary_red : "none"}
            style={{
              color: isFavorite ? COLORS.primary_red : COLORS.primary_gray,
              transition: "color 0.2s ease",
            }}
          />
        </button>
      </div>

      <div className="flex flex-row justify-between items-start w-full">
        <span
          className="text-xs font-semibold px-3 py-1.5 rounded"
          style={{
            backgroundColor: COLORS.primary_red,
            color: COLORS.primary_white,
            fontFamily: FONTS.medium?.fontFamily,
            fontWeight: FONTS.medium?.fontWeight,
          }}
        >
          {course.category?.primary || "Uncategorized"}
        </span>

        <span
          className="text-xs font-semibold px-3 py-1.5 rounded border"
          style={{
            borderColor: COLORS.primary_red,
            color: COLORS.primary_red,
            fontFamily: FONTS.medium?.fontFamily,
            fontWeight: FONTS.medium?.fontWeight,
          }}
        >
          {course.level?.charAt(0).toUpperCase() + course.level?.slice(1) || "Beginner"}
        </span>
      </div>

      <div className="flex flex-col items-start w-full gap-3 md:gap-4">
        <div className="flex flex-col items-start gap-2 w-full">
          <h2
            className="line-clamp-2"
            style={{
              color: COLORS.primary_black,
              fontSize: "18px",
              fontFamily: FONTS.medium?.fontFamily,
              fontWeight: FONTS.medium?.fontWeight,
            }}
          >
            {course.title}
          </h2>
          <p
            className="line-clamp-3 leading-relaxed"
            style={{
              color: COLORS.primary_gray,
              fontSize: "14px",
              fontFamily: FONTS.regular?.fontFamily,
              fontWeight: FONTS.regular?.fontWeight,
              fontStyle: FONTS.regular?.fontStyle,
            }}
          >
            {course.description || "No description available"}
          </p>
        </div>

        <p
          className="line-clamp-1"
          style={{
            color: COLORS.primary_black,
            fontSize: "14px",
            fontFamily: FONTS.medium?.fontFamily,
            fontWeight: FONTS.medium?.fontWeight,
          }}
        >
          {course.instituteId || "Institute"}
        </p>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star size={16} style={{ color: "#FFD700" }} fill="#FFD700" />
              <span
                style={{
                  color: COLORS.primary_black,
                  fontSize: "14px",
                  fontFamily: FONTS.medium?.fontFamily,
                  fontWeight: FONTS.medium?.fontWeight,
                }}
              >
                {course.rating || 0}
              </span>
            </div>
            <span
              style={{
                color: COLORS.primary_gray,
                fontSize: "13px",
                fontFamily: FONTS.regular?.fontFamily,
                fontWeight: FONTS.regular?.fontWeight,
              }}
            >
              ({course.reviews?.length || 0})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={16} style={{ color: COLORS.primary_gray }} />
            <span
              style={{
                color: COLORS.primary_gray,
                fontSize: "13px",
                fontFamily: FONTS.regular?.fontFamily,
                fontWeight: FONTS.regular?.fontWeight,
              }}
            >
              {course.content?.totalLessons || 0}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} style={{ color: COLORS.primary_gray }} />
            <span
              style={{
                color: COLORS.primary_gray,
                fontSize: "13px",
                fontFamily: FONTS.regular?.fontFamily,
                fontWeight: FONTS.regular?.fontWeight,
              }}
            >
              {formatDuration(course.content?.totalDuration || 0)}
            </span>
          </div>
        </div>

        <div className="flex flex-col w-full mt-2 gap-3">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <p
                style={{
                  color: COLORS.primary_black,
                  fontSize: "18px",
                  fontWeight: 700,
                  fontFamily: FONTS.medium?.fontFamily,
                }}
              >
                {getDisplayPrice()}
              </p>
              {getOriginalPrice() && (
                <p
                  className="line-through"
                  style={{
                    color: COLORS.primary_gray,
                    fontSize: "13px",
                    fontFamily: FONTS.regular?.fontFamily,
                  }}
                >
                  {getOriginalPrice()}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center w-full">
            {course.enrolled ? (
              <button
                className="flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors w-full text-center"
                style={{
                  backgroundColor: COLORS.primary_red,
                  color: COLORS.primary_white,
                  padding: "10px 16px",
                  fontFamily: FONTS.medium?.fontFamily,
                }}
              >
                Already Enrolled
                <img src={enroll} alt="enroll" className="w-4 h-4" />
              </button>
            ) : (
              <button
                className="flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors w-full text-center"
                style={{
                  backgroundColor: COLORS.primary_yellow,
                  color: COLORS.primary_black,
                  padding: "10px 16px",
                  fontFamily: FONTS.medium?.fontFamily,
                }}
              >
                <img src={cart} alt="cart" className="w-4 h-4" />
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}