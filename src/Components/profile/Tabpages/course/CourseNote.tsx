import React from "react";
import click from "../../../../assets/profile/icons/clipboard-tick.png";
import { COLORS } from "../../../../Constants/uiconstants";

interface CourseCardProps {
  image?: string;
  title: string;
  instructor: string;
  progress: number;
  category: string;
  lastAccessed: string;
  buttonLabel?: string;
  buttonColor?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  image = "",
  title,
  instructor,
  progress,
  category,
  lastAccessed,
  buttonLabel = "Already Enrolled",
  buttonColor = COLORS.primary_red,
}) => {
  return (
    <div
      className=" rounded-xl shadow-md p-5 flex flex-col md:flex-row gap-5 items-center md:items-start transition hover:shadow-lg"
      style={{ backgroundColor: COLORS.primary_white }}
    >
      <div
        className="w-40 h-36 rounded-lg overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: `${COLORS.primary_gray}4A` }}
      >
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className=" text-sm" style={{ color: `${COLORS.primary_gray}` }}>
            No Image
          </div>
        )}
      </div>

      {/* Course Details */}
      <div className="flex-1 flex flex-col justify-between w-full">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold "
            style={{ color: COLORS.primary_gray }}>{title}</h3>
            <p className="text-sm "
            style={{ color: COLORS.primary_gray }}>{instructor}</p>
          </div>
          <span
            className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-md font-medium"
            style={{
              color: COLORS.primary_gray,
              backgroundColor: `${COLORS.primary_gray}4A`,
            }}
          >
            {category}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div className="flex justify-between">
            <p className="text-sm  mb-1" style={{ color: COLORS.primary_gray }}>
              Progress {progress}%
            </p>
            <p className="text-xs " style={{ color: COLORS.primary_gray }}>
              Last accessed {lastAccessed}
            </p>
          </div>
          <div className="w-full  h-2 rounded-full"
          style={{ backgroundColor: `${COLORS.secondary_gray}2A` }}>
            <div
              className="bg-[#707070] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` ,backgroundColor: COLORS.primary_gray }}
            ></div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3">
          <button
            className="text-white text-sm px-4 py-2 rounded-md flex items-center gap-2 font-medium transition-all"
            style={{ backgroundColor: buttonColor }}
          >
            {buttonLabel}
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
