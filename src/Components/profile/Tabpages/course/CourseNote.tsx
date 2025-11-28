import React from "react";
import click from "../../../../assets/profile/icons/clipboard-tick.png";
import { COLORS } from "../../../../Constants/uiconstants";

interface CourseCardProps {
  image?: string;
  title: string;
  description?: string;
  category: string;
  price: number;
  currency: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  image = "",
  title,
  description = "No description available",
  category,
  price,
  currency,
}) => {
  return (
    <div
      className="rounded-xl shadow-md p-5 flex flex-col md:flex-row gap-5 items-center md:items-start transition hover:shadow-lg"
      style={{ backgroundColor: COLORS.primary_white }}
    >
      {/* Thumbnail */}
      <div
        className="w-40 h-36 rounded-lg overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: `${COLORS.primary_gray}4A` }}
      >
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-sm" style={{ color: COLORS.primary_gray }}>
            No Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between w-full">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="w-[80%]">
            <h3
              className="text-lg font-semibold"
              style={{ color: COLORS.primary_gray }}
            >
              {title}
            </h3>

            {/* NEW — DESCRIPTION */}
            <p
              className="text-sm mt-1 line-clamp-2"
              style={{ color: COLORS.primary_gray }}
            >
              {description}
            </p>

            {/* Static instructor */}
            <p className="text-sm mt-1" style={{ color: COLORS.primary_gray }}>
              Instructor not available
            </p>
          </div>

          <span
            className="text-xs px-3 py-1 rounded-md font-medium"
            style={{
              color: COLORS.primary_gray,
              backgroundColor: `${COLORS.primary_gray}4A`,
            }}
          >
            {category}
          </span>
        </div>

        {/* Price */}
        <p
          className="text-sm mt-2"
          style={{ color: COLORS.primary_gray }}
        >
          Price: {price} {currency}
        </p>

        {/* Button */}
        <div className="flex justify-between items-center mt-3">
          <button
            className="text-white text-sm px-4 py-2 rounded-md flex items-center gap-2 font-medium transition-all"
            style={{ backgroundColor: COLORS.primary_red }}
          >
            Already Enrolled
            <img
              src={click}
              alt=""
              className="w-5 h-5 filter brightness-0 invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
