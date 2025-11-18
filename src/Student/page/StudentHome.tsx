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
import star from '../../assets/magic-star.png'
import { FaArrowRight } from "react-icons/fa";
import teacher from '../../assets/teacher4.png'
import girl from "../../assets/Girl.png"


const StudentHome: React.FC = () => {
  const { stats } = useSelector(
    (state: RootState) => state.studentHome
  );

  const quickLinks = [
    { label: "Online courses", target: "promotions-section" },
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
      className="min-h-screen text-center pt-12"
      style={{ background: COLORS.primary_yellow, fontFamily: FONTS.regular.fontFamily }}
    >
      {/* ================= HERO SECTION ================ */}
      <div className=" w-screen h-203 bg-[#FFDD00]  overflow-hidden  ">

        {/* Badge */}
        <div className="flex justify-start  px-10 ">
          <div
            className="flex items-start justify-center px-4 py-2 rounded-full font-semibold text-[#FFDD00] shadow-md "
            style={{ background: COLORS.primary_red }}
          >
            <img src={star} alt="star" className="h-5 w-5 mr-2 text-[#FFDD00]" />
            <p className="text-sm sm:text-base">India’s Leading Educational Platform</p>
          </div>
        </div>

        <div className="  px-5 py-7 relative  grid grid-cols-1 lg:grid-cols-2 max-h-fit w-screen justify-between  ">

          {/* ------------- LEFT CONTENT ------------- */}
          <div className="text-left mb-40 ml-6  ">

            <h1
              className="text-4xl sm:text-5xl md:text-6xl  font-bold leading-tight mb-3"
              style={{ color: COLORS.primary_red, ...(FONTS.boldHeadingggg1 as any) }}
            >
              Learn from the Best Institutes, Anywhere
            </h1>

            <p style={{...FONTS.nummedium4 as any}} className="text-[#707070] text-base sm:text-lg md:text-xl  mb-3">
              Upskill with trusted courses designed by leading academies.
              Join {stats.students.toLocaleString()}+ students
              learning from top educators.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                className="flex items-center text-[#ffffff] px-6 py-3 rounded-lg font-semibold "
                style={{ background: COLORS.primary_red ,...FONTS.nummedium4 as any}} 
              >
                Explore Courses
                <FaArrowRight className="ml-2 mt-0.5" />
              </button>

              <button
                className="group flex items-center px-6 py-3 rounded-lg font-semibold border transition-all duration-300"
                style={{ borderColor: COLORS.primary_red, color: COLORS.primary_red ,background:COLORS.primary_white ,}}
              >
                <img
                  src={teacher}
                  alt="teacher"
                  className="mr-2 w-5 h-5  "
                />
                Join as Institute
              </button>
            </div>

            {/* Quick Filters */}
            <p
              className="text-xl font-semibold mb-3 "
              style={{ color: COLORS.primary_red , ...FONTS.boldHeading4 as any}}
            >
              Quick Filters
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {quickLinks.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleScroll(item.target)}
                  className="bg-white px-3 py-2 rounded-full font-medium shadow hover:bg-red-50 transition"
                  style={{ color: COLORS.primary_red ,...FONTS.regular1 as any }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5  sm:gap-33 ">
              <div className="bg-[#FFFBE1] w-37 h-24 px-3 py-4 rounded-xl shadow text-center">
                <h2 className="text-3xl font-bold" style={{ color: COLORS.primary_red  }}>
                  {stats.students.toLocaleString()}+
                </h2>
                <p style={{...FONTS.nummedium11 as any }} className="mt-2 text-[#707070]">Student</p>
              </div>

              <div className="bg-[#FFFBE1] w-37 h-24 px-6 py-4 rounded-xl shadow text-center">
                <h2 className="text-3xl font-bold" style={{ color: COLORS.primary_red }}>
                  {stats.courses}+
                </h2>
                <p style={{...FONTS.nummedium11 as any }} className="mt-2 text-[#707070]">Course</p>
              </div>

              <div className="bg-[#FFFBE1] w-37 h-24 px-6 py-4 rounded-xl shadow text-center">
                <h2 className="text-3xl font-bold" style={{ color: COLORS.primary_red }}>
                  {stats.institutes}+
                </h2>
                <p style={{...FONTS.nummedium11 as any }} className="mt-2 text-[#707070]">Institutes</p>
              </div>

              <div className="bg-[#FFFBE1] w-37 h-24 px-6 py-4 rounded-xl shadow text-center">
                <h2 className="text-3xl font-bold" style={{ color: COLORS.primary_red }}>
                  {stats.ratings}/5
                </h2>
                <p style={{...FONTS.nummedium11 as any }} className="mt-2 text-[#707070]">Ratings</p>
              </div>
            </div>

          </div>

          {/* ------------- RIGHT SIDE IMAGE ------------- */}
          <div className="relative w-full flex  ">

            {/* EXACT 796×796 ROTATED CIRCLE FROM FIGMA */}
            {/* <div
    className="absolute hidden lg:block"
    style={{
      width: "796px",
      height: "796px",
      backgroundColor: "#FFD500",
      borderRadius: "50%",
      top: "108px",
      left: "781px",
      transform: "rotate(-180deg)",
      opacity: 1,
      zIndex: 1,
    }}
  ></div> */}

            {/* GIRL IMAGE EXACTLY LIKE FIGMA – FULL 796px IMAGE */}
            <div className="h-[500px] flex items-end justify-end  w-225 mb-80 -mr-200">
              <img
              src={girl}
              alt="girl"
              className="relative z-10 rounded-tl-full rounded-tr-full object-cover object-right "
              style={{
                width: "670px",
                height: "540px",
              }}
            />
            </div>
          </div>
        </div>
      </div>
      {/* ================= END HERO SECTION ================ */}


      <div className="space-y-16">
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