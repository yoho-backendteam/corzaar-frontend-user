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
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row gap-5 items-center md:items-start transition hover:shadow-lg">
      <div className="w-40 h-36 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400 text-sm">No Image</div>
        )}
      </div>

      {/* Course Details */}
      <div className="flex-1 flex flex-col justify-between w-full">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{instructor}</p>
          </div>
          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-md font-medium">
            {category}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div className="flex justify-between">
            <p className="text-sm text-[#707070] mb-1">Progress {progress}%</p>
          <p className="text-xs text-[#707070]">Last accessed {lastAccessed}</p>
          </div>
          <div className="w-full bg-[#5F5F5F1A]/20 h-2 rounded-full">
            <div
              className="bg-[#707070] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
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
            <img src={click} alt="" className="w-5 h-5 filter brightness-0 invert" />
          </button>
          
        </div>
      </div>
    </div>
  );
};
