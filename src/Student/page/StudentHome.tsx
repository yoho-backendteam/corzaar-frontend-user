import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import TopCourse from "../components/TopCourse";
import SpecialPromotions from "../components/promotions";
import TrendingCourse from "../components/trendingCourse";
import RecommendedCourse from "../components/RecommendedCourse";
import PopularInstitute from "../components/PopularInstitute";
import ExpertsInstitute from "../components/ExpertsInstitues";
import Category from "../components/Category";
import Footer from "../components/footer";
import star from "../../assets/magic-star.png";
import { FaArrowRight } from "react-icons/fa";
import teacher from "../../assets/teacher4.png";

const StudentHome: React.FC = () => {
  const { stats, filters } = useSelector(
    (state: RootState) => state.studentHome
  );

  const quickLinks = [
    { label: "online courses", target: "promotions-section" },
    { label: "Near you", target: "top-courses-section" },
    { label: "Top rated", target: "trending-courses-section" },
    { label: "Free courses", target: "popular-institutes-section" },
    { label: "Short term", target: "recommended-courses-section" },
  ];

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-screen text-center pt-8 sm:pt-10 md:pt-12"
      style={{
        background: COLORS.primary_yellow,
        fontFamily: FONTS.regular.fontFamily,
      }}
    >
      <div className="flex justify-center px-4">
        <div
          className="flex items-center justify-center w-full max-w-[280px] sm:w-[308px] h-[38px] sm:h-[42px] gap-1 sm:gap-2 rounded-[130px] py-1 px-3 sm:px-4 mb-4 sm:mb-5 font-bold text-center text-white whitespace-nowrap"
          style={{ background: COLORS.primary_red }}
        >
          <img src={star} alt="star" className="h-4 w-4 sm:h-5 sm:w-5" />
          <p
            className="text-xs sm:text-sm md:text-lg whitespace-nowrap"
            style={{
              ...FONTS.regular1,
            }}
          >
            India's Leading Educational Platform
          </p>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
          style={{ ...(FONTS.boldHead as any), color: COLORS.primary_red }}
        >
          Learn from the Best Institutes, Anywhere
        </h1>

        <h3
          className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 max-w-2xl mx-auto mb-6 sm:mb-8"
          style={{ ...FONTS.sub_head }}
        >
          Upskill with trusted courses designed by leading academies. Join{" "}
          <strong>{stats.students.toLocaleString()}+</strong> students learning
          from top educators.
        </h3>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <button
            className="flex items-center justify-center w-40 sm:w-[170px] md:w-[188px] h-[42px] sm:h-[45px] md:h-12 gap-2 sm:gap-2.5 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-sm font-semibold transition hover:bg-red-700 text-sm sm:text-base"
            style={{ background: COLORS.primary_red }}
          >
            Explore Courses
            <FaArrowRight className="mt-0.5 sm:mt-1.5" />
          </button>

          <button
            className="group flex items-center justify-center w-[150px] sm:w-40 md:w-[184px] h-[42px] sm:h-[45px] md:h-12 gap-2 sm:gap-2.5 bg-white py-2 sm:py-3 px-3 sm:px-4 rounded-sm font-semibold 
  transition-all duration-300 border whitespace-nowrap text-sm sm:text-base"
            style={{
              borderColor: COLORS.primary_red,
              color: COLORS.primary_red,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primary_red;
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = COLORS.primary_red;
            }}
          >
            <img
              src={teacher}
              alt="teacher"
              className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5 transition group-hover:filter group-hover:brightness-0 group-hover:invert"
            />
            Join as Institute
          </button>
        </div>

        <div className="mb-4 sm:mb-6">
          <p
            className="mb-2 sm:mb-3 text-sm sm:text-base"
            style={{ ...FONTS.boldHeading4, color: COLORS.primary_red }}
          >
            Quick Filters
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {quickLinks.map((item, i) => (
              <button
                key={i}
                onClick={() => handleScroll(item.target)}
                className="flex items-center justify-center w-[110px] sm:w-[120px] md:w-[129px] h-8 sm:h-[34px] md:h-9 gap-1 sm:gap-2 bg-white px-3 sm:px-4 rounded-full font-medium shadow transition whitespace-nowrap text-xs sm:text-sm"
                style={{ color: COLORS.primary_red }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto mt-6 sm:mt-8">
          <div className="flex flex-col items-center justify-center w-full max-w-[140px] sm:max-w-40 md:max-w-[180px] lg:max-w-[200px] h-20 sm:h-[90px] md:h-[100px] lg:h-[105px] gap-2 sm:gap-3 bg-white py-2 sm:py-3 px-2 sm:px-4 rounded-xl shadow text-center">
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold"
              style={{ color: COLORS.primary_red }}
            >
              {stats.students.toLocaleString()}+
            </h2>
            <p
              className="text-xs sm:text-sm mt-1"
              style={{ color: COLORS.primary_gray }}
            >
              Students
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-full max-w-[140px] sm:max-w-40 md:max-w-[180px] lg:max-w-[200px] h-20 sm:h-[90px] md:h-[100px] lg:h-[105px] gap-2 sm:gap-3 bg-white py-2 sm:py-3 px-2 sm:px-4 rounded-xl shadow text-center">
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold"
              style={{ color: COLORS.primary_red }}
            >
              {stats.courses}+
            </h2>
            <p
              className="text-xs sm:text-sm mt-1"
              style={{ color: COLORS.primary_gray }}
            >
              Courses
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-full max-w-[140px] sm:max-w-40 md:max-w-[180px] lg:max-w-[200px] h-20 sm:h-[90px] md:h-[100px] lg:h-[105px] gap-2 sm:gap-3 bg-white py-2 sm:py-3 px-2 sm:px-4 rounded-xl shadow text-center">
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold"
              style={{ color: COLORS.primary_red }}
            >
              {stats.institutes}+
            </h2>
            <p
              className="text-xs sm:text-sm mt-1"
              style={{ color: COLORS.primary_gray }}
            >
              Institutes
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-full max-w-[140px] sm:max-w-40 md:max-w-[180px] lg:max-w-[200px] h-20 sm:h-[90px] md:h-[100px] lg:h-[105px] gap-2 sm:gap-3 bg-white py-2 sm:py-3 px-2 sm:px-4 rounded-xl shadow text-center">
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold"
              style={{ color: COLORS.primary_red }}
            >
              {stats.ratings}/5
            </h2>
            <p
              className="text-xs sm:text-sm mt-1"
              style={{ color: COLORS.primary_gray }}
            >
              Ratings
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-12 sm:space-y-14 md:space-y-16">
        <div id="promotions-section">
          <SpecialPromotions />
        </div>

        <div id="top-courses-section">
          <TopCourse />
        </div>

        <div id="trending-courses-section">
          <TrendingCourse />
        </div>

        <div id="popular-institutes-section">
          <PopularInstitute />
        </div>

        <div id="recommended-courses-section">
          <RecommendedCourse />
        </div>

        <ExpertsInstitute />
        <Category />
        <Footer />
      </div>
    </div>
  );
};

export default StudentHome;
