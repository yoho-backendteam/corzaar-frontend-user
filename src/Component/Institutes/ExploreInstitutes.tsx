import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredInstitutes,
  selectActiveCategory,
  selectSearch,
} from "../../features/institute/reducers/selectors";
import { fetchInstitutes } from "../../features/institute/reducers/thunks";
import { setSearch, setActiveCategory } from "../../features/institute/reducers/instituteslice";
import { FONTS } from "../../Constants/uiconstants";
import { Search } from "lucide-react";
import map from "../../assets/map.png";
import star from "../../assets/star.png";
import hat from "../../assets/hat.png";
import student from "../../assets/student.png";
import website from "../../assets/website.png";
import linkedin from "../../assets/linkedin.png";
import teacher from "../../assets/teacher.png";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import type { Course } from "../../userHomeTypes/types";
import { selectCourseData } from "../../features/home_page/reducers/homeSelector";
import { getCourseThunk } from "../../features/home_page/reducers/homeThunk";

const ExploreInstitutes: React.FC = () => {
  const navigate = useNavigate();

  const filteredInstitutes = useSelector(selectFilteredInstitutes);
  const topCourses = useSelector<RootState, Course[]>(selectCourseData);
  const activeCategory = useSelector(selectActiveCategory);
  const search = useSelector(selectSearch);
  const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(getCourseThunk()).catch((err) => console.error(err));
    }, [dispatch]);

  // Fetch all institutes on mount
  useEffect(() => {
    dispatch(fetchInstitutes());
  }, [dispatch]);
  

  const categories = [
    "All Categories",
    "Technology",
    "Design",
    "Business",
    "Data Science",
    "Marketing",
    "Cloud",
    "DevOps",
    "Finance",
    "Investment",
  ];

  return (
    <div className="min-h-screen bg-[#FFDD00] px-4 sm:px-6 md:px-10 lg:px-20 py-8">
      {/* Page Title */}
      <div className="text-center md:text-left">
        <h1
          style={FONTS.boldHeading as React.CSSProperties}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900"
        >
          Explore Institutes
        </h1>
        <p
          style={FONTS.regular as React.CSSProperties}
          className="text-[#707070] text-sm sm:text-base mt-1"
        >
          Discover trusted educational institutes offering quality courses
        </p>
      </div>

      {/* Search Bar */}
       <div className="relative mt-6 w-full max-w-2xl mx-auto md:mx-0">
        <Search className="absolute left-3 top-3 text-[#707070]" size={18} />
        <input
          style={FONTS.regular as React.CSSProperties}
          type="text"
          placeholder="Search for courses, institutes..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 bg-white focus:ring-red-400 outline-none text-sm sm:text-base"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 md:gap-5 lg:gap-7 mt-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => dispatch(setActiveCategory(cat))}
            style={FONTS.tabheading as React.CSSProperties}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm md:text-base font-medium transition-all duration-200
              ${
                activeCategory === cat
                  ? "bg-[#ED1C24] text-white border-[#ED1C24]"
                  : "bg-white text-[#ED1C24] border-[#ED1C24] hover:bg-[#ED1C24]/10"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Institute Count */}
      <h2
        style={FONTS.boldHeading as React.CSSProperties}
        className="mt-8 text-base sm:text-lg md:text-xl font-semibold text-gray-900 text-center md:text-left"
      >
        Find {filteredInstitutes?.length || 0} Institutes
      </h2>

      {/* Institutes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mt-6">
        {filteredInstitutes?.map((inst) => (
          <div
            key={inst._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <img
              src={inst.logo || inst.coverImage} // fallback to coverImage if logo missing
              alt={inst.name}
              className="h-40 sm:h-48 w-full object-cover"
            />

            {/* Content */}
            <div className="p-4 sm:p-5 flex flex-col grow">
              <h3
                style={FONTS.boldHh as React.CSSProperties}
                className="text-lg sm:text-xl font-semibold text-gray-900"
              >
                {inst.name}
              </h3>
              <p
                style={FONTS.regular as React.CSSProperties}
                className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2"
              >
                {inst.description}
              </p>

              {/* Stats */}
              <div
                style={FONTS.mediummm as React.CSSProperties}
                className="flex flex-wrap items-center gap-3 mt-3 text-[#707070] text-xs sm:text-sm"
              >
                <img src={star} alt="Rating" className="w-4 h-4" />
                <span>{inst.statistics?.averageRating || "N/A"}</span>
                <img src={hat} alt="Courses" className="w-4 h-4" />
                <span>{`${topCourses?.filter((i) => i?.instituteId === inst?._id).length}
                     courses`}</span>
                <img src={student} alt="Students" className="w-4 h-4" />
                <span>{inst.statistics?.totalStudents || 0} Students</span>
              </div>

              {/* Location */}
              <p
                style={FONTS.nummedium as React.CSSProperties}
                className="flex items-center text-xs sm:text-sm text-[#707070] mt-4 gap-2"
              >
                <img src={map} alt="location" className="w-4 h-4 sm:w-5 sm:h-5" />
                {inst.contactInfo?.address?.city || "City not available"}
              </p>

              {/* Tags */}
              <div
                style={FONTS.mediummm as React.CSSProperties}
                className="flex flex-wrap gap-2 mt-3"
              >
                {inst.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs bg-[#7070701A] px-2 py-1 rounded-md text-[#707070]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Email */}
              <p
                style={FONTS.regular as React.CSSProperties}
                className="flex items-center text-xs sm:text-sm text-[#707070] mt-3"
              >
                {inst.contactInfo?.email || "Email not available"}
              </p>

              {/* Links */}
              <div
                style={FONTS.nummedium1 as React.CSSProperties}
                className="flex flex-wrap gap-6 mt-3"
              >
                {inst.website && (
                  <a
                    href={inst.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[#ED1C24] text-xs sm:text-sm font-medium hover:underline"
                  >
                    <img src={website} alt="Website" className="w-4 h-4 sm:w-5 sm:h-5" />
                    Website
                  </a>
                )}
                {inst.socialMedia?.linkedin && (
                  <a
                    href={inst.socialMedia.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-700 text-xs sm:text-sm font-medium hover:underline"
                  >
                    <img src={linkedin} alt="LinkedIn" className="w-4 h-4 sm:w-5 sm:h-5" />
                    LinkedIn
                  </a>
                )}
              </div>

              {/* View Courses Button */}
              <button
                onClick={() => navigate(`/institute/${inst._id}`)}
                className="cursor-pointer mt-4 sm:mt-5 bg-[#ED1C24] text-white font-medium py-2 rounded-md w-full flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-[#d0181f] transition-colors"
              >
                View Courses{" "}
                <img src={teacher} alt="teacher" className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreInstitutes;
