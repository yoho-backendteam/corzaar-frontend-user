import React from "react";
import { COLORS, FONTS } from "../../Constants/uiconstants";

interface ProfileSlideProps {
  icon: string;
  label: string;
  value: string | number;
  bgColor?: string;
  iconBg?: string;
}

export const ProfileSlide: React.FC<ProfileSlideProps> = ({
  icon,
  label,
  value,
  bgColor = "#ffffff",
  iconBg = COLORS.primary_yellow,
}) => {
  return (
    <div
      className="w-90 h-30 md:w-auto rounded-lg shadow-lg flex flex-col  p-3 justify-between"
      style={{ backgroundColor: bgColor, fontFamily: FONTS.regular.fontFamily }}
    >
      <div className="flex items-center gap-3 ">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: iconBg }}
        >
          <img src={icon} alt={label} className="w-6 h-6 object-contain" />
        </div>
        <p className="text-gray-800 text-xl">{label}</p>
      </div>
      <div className="">
        <p className="text-black font-bold text-3xl">{value}</p>
      </div>
    </div>
  );
};
