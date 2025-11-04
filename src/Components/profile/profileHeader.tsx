import React from "react";
import rating from "../../assets/profile/icons/Vector.png";
import user from "../../assets/profile/icons/profile-2user.png";
import locationimage from "../../assets/profile/icons/location.png";
import teacher from "../../assets/profile/icons/teacher.png";
import edit from "../../assets/profile/icons/edit.png";
import { COLORS, FONTS } from "../../Constants/uiconstants";
interface ProfileHeaderProps {
  image?: string;
  title: string;
  verified?: boolean;
  description?: string;
  ratings?: string;
  courses?: number;
  students?: number;
  location?: string;
  tags?: string[];
  onEdit?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  image = "",
  title,
  verified = false,
  description = "",
  ratings = "0.0",
  courses = 0,
  students = 0,
  location = "",
  tags = [],
  onEdit,  
}) => {

  
  return (
    <div
      className="bg-white w-full rounded-lg shadow-lg flex flex-col md:flex-row items-center p-6 gap-6"
      style={{ borderRadius: "12px", fontFamily: FONTS.regular.fontFamily }}
    >
      <div className="w-32 h-32 rounded-lg overflow-hidden flex items-center justify-center"
      style={{backgroundColor:`${COLORS.primary_gray}4A`}}>
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className=" text-sm"
          style={{color:`${COLORS.primary_gray}`}}>No Image</div>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold "
            style={{color:COLORS.primary_black}}>{title}</h2>
            {verified && (
              <span className=" text-white text-sm px-5 py-2 rounded-xl flex items-center gap-1"
              style={{background:COLORS.secondary_green}}>
                Verified
              </span>
            )}
          </div>
          <button
            onClick={onEdit}
            className="flex items-center gap-2  px-3 py-2 rounded-md  text-sm font-medium"
            style={{ backgroundColor: `${COLORS.primary_gray}1A`,color:COLORS.primary_black }}
          >
            <img src={edit} alt="" /> Edit Profile
          </button>
        </div>
        <p className=" text-sm leading-snug" style={{color:COLORS.primary_gray}}>{description}</p>
        <div className="flex flex-wrap gap-6  text-sm font-medium mt-2"style={{color:COLORS.primary_gray}}>
          <div className="flex items-center gap-1">
            <img src={rating} alt="" /> {ratings} Ratings
          </div>
          <div className="flex items-center gap-1">
            <img src={teacher} alt="" /> {courses} Courses
          </div>
          <div className="flex items-center gap-1">
            <img src={user} alt="" /> {students} Students
          </div>
          <div className="flex items-center gap-1">
            <img src={locationimage} alt="" /> {location}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className=" text-sm px-3 py-1 rounded-md"
              style={{color:COLORS.primary_black,backgroundColor:`${COLORS.primary_gray}1A`}}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
