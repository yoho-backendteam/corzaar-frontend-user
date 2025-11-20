import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchInstituteById } from "../../features/institute/reducers/thunks";
import { selectInstitute } from "../../features/institute/reducers/selectors";
import {
  CheckCircle,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

import robo from "../../assets/robo.png";
import laptop from "../../assets/laptop.png";
import icon from "../../assets/icon.png";
import star from "../../assets/star.png";
import hat from "../../assets/hat.png";
import student from "../../assets/student.png";
import map from "../../assets/map.png";
import clock from "../../assets/clock.png";
import linkicon from "../../assets/linkicon.png";
import facebicon from "../../assets/facebicon.png";
import ratingicon from "../../assets/ratingicon.png";
import course from "../../assets/course.png";
import heart from "../../assets/heart.png";
import { FONTS } from "../../Constants/uiconstants";

const InstituteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const institute = useSelector(selectInstitute);
  const { loading, error } = useSelector((state: RootState) => state.institute);
  const navigate = useNavigate();


  useEffect(() => {
    if (id) dispatch(fetchInstituteById(id));
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold bg-gray-100">
        Loading Institute Details...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg font-semibold bg-gray-100">
        Failed to load institute details: {error}
      </div>
    );

  if (!institute)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg font-semibold bg-gray-100">
        No institute details found.
      </div>
    );

    

  return (
    <div className="bg-[#FFDD00] min-h-screen">

      <div className="pt-5 px-4">
  <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 text-black bg-white px-4 py-2 rounded-md shadow hover:shadow-md transition font-medium mb-2"
  >
    ← Back
  </button>
</div>

      {/* Banner */}
      <div className="relative h-60">
        <img
          src={institute.coverImage || laptop}
          alt="Institute Banner"
          className="w-full h-56 md:h-72 object-cover"
        />
      </div>

      {/* Floating Info Card */}
      <div className="relative z-20 max-w-6xl mx-auto -mt-10 bg-[#FFFFFF] shadow-lg rounded-xl p-5 flex flex-col md:flex-row justify-start items-center gap-4">
        {/* Logo */}
        <div
          className="bg-[#D9D9D9] rounded-lg shrink-0 overflow-hidden flex justify-center items-center"
          style={{ width: "160px", height: "160px" }}
        >
          {institute.logo ? (
            <img
              src={institute.logo}
              alt="logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[#707070] text-sm">No Image</span>
          )}
        </div>

        {/* Institute Info */}
        <div className="flex-1 w-full md:w-[600px]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2
                style={FONTS.boldHeadingg as React.CSSProperties}
                className="text-[#000000] md:text-2xl font-semibold"
              >
                {institute.name}
              </h2>

              {institute.verification?.status === "verified" && (
                <button
                  className="flex items-center gap-2 bg-[#68D391] text-[#101828] px-3 py-1 rounded-md text-xs font-medium shadow-sm"
                >
                  Verified <CheckCircle size={14} />
                </button>
              )}
            </div>

            {institute.website && (
              <button
                onClick={() => window.open(institute.website, "_blank")}
                style={FONTS.tabheadingg as React.CSSProperties}
                className="flex items-center gap-2 bg-[#7070701A] text-[#0A0A0A] px-3 py-2 rounded-md text-sm md:text-base"
              >
                View Website
                <img
                  src={icon}
                  alt="website"
                  className="w-5 h-5 object-contain"
                />
              </button>
            )}
          </div>

          <p
            style={FONTS.regularr as React.CSSProperties}
            className="text-[#707070] mt-1 line-clamp-3"
          >
            {institute.description || "No description available."}
          </p>

          {/* Stats */}
          <div
            style={FONTS.mediummm as React.CSSProperties}
            className="flex items-center gap-3 mt-3 text-[#707070] text-sm flex-wrap"
          >
            <img src={star} alt="Rating" className="w-4 h-4" />
            <span>{institute.statistics?.averageRating || "N/A"}</span>
            <img src={hat} alt="Courses" className="w-4 h-4" />
            <span>{institute.statistics?.totalCourses || 0} Courses</span>
            <img src={student} alt="Students" className="w-4 h-4" />
            <span>{institute.statistics?.totalStudents || 0} Students</span>
            <img src={map} alt="Location" className="w-4 h-4" />
            <span>
              {institute.contactInfo?.address?.city || "Location not available"}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 pb-10">
        {/* Left Side - Courses */}
        <div className="lg:col-span-2">
          <h2
            style={FONTS.boldHeading1 as React.CSSProperties}
            className="text-[#000000] mb-4"
          >
            Courses
          </h2>

        {Array.isArray(institute.courses) && institute.courses.length > 0 ? (
  <div className="space-y-6 w-full">
    {institute.courses.map((course) => (
      <div
        key={course.id}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
      >
                  <div className="relative">
                    <img
                      src={course.image || robo}
                      alt={course.title}
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#ED1C24] text-white text-xs px-3 py-1 rounded-md shadow-md">
                      40% OFF
                    </div>
                    <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                      <img src={heart} alt="heart" className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-[#ED1C24] text-white text-xs px-2 py-1 rounded">
                        Technology
                      </span>
                      <span className="text-xs px-2 py-1 border border-[#ED1C24] rounded text-[#ED1C24]">
                        {course.level || "Beginner"}
                      </span>
                    </div>

                    <h3
                      style={FONTS.boldHeadingg2 as React.CSSProperties}
                      className="font-semibold text-[#000000]"
                    >
                      {course.title}
                    </h3>

                    <p className="text-sm text-[#707070] mt-1">
                      {course.description || "No description"}
                    </p>

                    <div className="flex items-center gap-4 text-gray-700 text-sm mt-2">
                      <div className="flex items-center gap-1">
                        <img src={star} alt="rating" className="w-4 h-4" />
                        <span>{course.rating || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={student} alt="students" className="w-4 h-4" />
                        <span>{course.students || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={clock} alt="weeks" className="w-4 h-4" />
                        <span>{course.weeks || 0} Weeks</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div>
                        <span className="text-lg font-bold text-[#000000]">
                          ₹{course.price || 0}
                        </span>
                        {course.oldPrice && (
                          <span className="text-[#707070] ml-3 line-through text-sm">
                            ₹{course.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      className={`mt-3 px-4 py-2 w-full text-sm font-medium rounded-md ${
                        course.enrolled
                          ? "bg-[#ED1C24] text-[#FFFFFF]"
                          : "bg-[#FFDD00] text-[#000000]"
                      }`}
                    >
                      {course.enrolled ? "Already Enrolled" : "Add To Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#707070]">No courses found.</p>
          )}
        </div>

        {/* Right Side - Contact + Stats */}
        <div className="space-y-10">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-5">
            <h3
              style={FONTS.boldHeadingg as React.CSSProperties}
              className="font-semibold text-black mb-3"
            >
              Contact Information
            </h3>

            <p className="flex items-start gap-3 text-sm text-[#707070]">
              <img src={map} alt="map" className="w-5 h-5 mt-0.5" />
              {institute.contactInfo?.address?.street
                ? `${institute.contactInfo.address.street}, ${institute.contactInfo.address.city}`
                : "Address not available"}
            </p>

            <p className="flex items-center gap-3 text-sm text-[#707070]">
              <Mail size={16} /> {institute.contactInfo?.email || "N/A"}
            </p>

            <p className="flex items-center gap-3 text-sm text-[#707070]">
              <Phone size={16} /> {institute.contactInfo?.phone || "N/A"}
            </p>

            {institute.website && (
              <p
                className="flex items-center gap-3 text-sm text-[#707070] cursor-pointer hover:underline"
                onClick={() => window.open(institute.website, "_blank")}
              >
                <Globe size={16} /> Visit Website
              </p>
            )}
          </div>

          {/* Connect */}
          <div className="bg-white rounded-xl shadow-md w-full p-5">
            <h3 className="font-semibold text-[#707070] mb-3">
              Connect With Us
            </h3>
            <button className="w-full flex items-center gap-2 px-4 border py-2 rounded-md mb-2 text-[#707070] bg-[#7070701A]">
              <img
                src={linkicon}
                alt="LinkedIn"
                className="w-5 h-5 object-contain"
              />
              LinkedIn
            </button>
            <button className="w-full flex items-center gap-2 px-4 border py-2 rounded-md text-[#707070] bg-[#7070701A]">
              <img
                src={facebicon}
                alt="Facebook"
                className="w-5 h-5 object-contain"
              />
              Facebook
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-md w-full p-5 space-y-4">
            <h3
              style={FONTS.boldHh as React.CSSProperties}
              className="font-semibold text-[#000000] mb-4"
            >
              Quick Stats
            </h3>

            <div className="flex justify-between items-center text-sm text-[#707070]">
              <div className="flex items-center gap-2">
                <img
                  src={ratingicon}
                  alt="Rating Icon"
                  className="w-5 h-5 object-contain"
                />
                <span>Rating</span>
              </div>
              <span className="flex items-center gap-1">
                <img src={star} alt="star" className="w-5 h-5" />
                {institute.statistics?.averageRating || "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm text-[#707070]">
              <div className="flex items-center gap-2">
                <img src={course} alt="Courses" className="w-5 h-5" />
                <span>Total Courses</span>
              </div>
              <span>{institute.statistics?.totalCourses || 0}</span>
            </div>

            <div className="flex justify-between items-center text-sm text-[#707070]">
              <div className="flex items-center gap-2">
                <img src={student} alt="Students" className="w-5 h-5" />
                <span>Total Students</span>
              </div>
              <span>{institute.statistics?.totalStudents || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteDetails;
