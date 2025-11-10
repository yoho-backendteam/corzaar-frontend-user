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


const StudentHome:React.FC = () => {
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
      className="min-h-screen text-center pt-12"
      style={{ background: COLORS.primary_yellow, fontFamily: FONTS.regular.fontFamily }}
    >
      <div className="flex justify-center px-4">
        <div className=" flex items-center justify-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-2xl p-3 mb-5 font-bold text-center text-white" style={{ background: COLORS.primary_red }}>
          <img
            src={star}
            alt="star"
            className="h-5 w-5 mr-2"
          />
          <p className="text-sm sm:text-base md:text-lg">
            India’s Leading Educational Platform
          </p>
        </div>
      </div>



      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold  mb-4" style={{color: COLORS.primary_red}}>
          Learn from the Best Institutes, Anywhere
        </h1>

        <h3 className="text-sm sm:text-base md:text-lg text-gray-800 max-w-2xl mx-auto mb-8">
          Upskill with trusted courses designed by leading academies. Join{" "}
          <strong>{stats.students.toLocaleString()}+</strong> students learning
          from top educators.
        </h3>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button className=" flex text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition" style={{ background: COLORS.primary_red }}>
            Explore Courses
            <FaArrowRight className="mt-1.5 ml-2" />
          </button>
<button
  className="group  flex items-center bg-white px-6 py-2.5 rounded-lg font-semibold 
  transition-all duration-300 border"
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
              className="mr-2 w-5 h-5 transition group-hover:filter group-hover:brightness-0 group-hover:invert"
            />
            Join as Institute
          </button>

        </div>

        <div className="mb-6">
          <p className="mb-3" style={{...(FONTS.boldHeading4),color:COLORS.primary_red}}>
            Quick Filters
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickLinks.map((item, i) => (
              <button
                key={i}
                onClick={() => handleScroll(item.target)}
                className="bg-white px-4 py-2 rounded-full font-medium shadow hover:bg-red-50 transition"
              style={{color: COLORS.primary_red}}>
                {item.label}
              </button>
            ))}
          </div>
        </div>


        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white px-6 py-6 rounded-xl shadow text-center">
            <h2 className="text-2xl md:text-3xl font-bold " style={{color: COLORS.primary_red}}>
              {stats.students.toLocaleString()}+
            </h2>
            <p className=" mt-3" style={{color: COLORS.primary_gray}}>Students</p>
          </div>
          <div className="bg-white px-6 py-6 rounded-xl shadow text-center">
            <h2 className="text-2xl md:text-3xl font-bold" style={{color: COLORS.primary_red}}>
              {stats.courses}+
            </h2>
            <p className=" mt-3" style={{color: COLORS.primary_gray}}>Courses</p>
          </div>
          <div className="bg-white px-6 py-6 rounded-xl shadow text-center">
            <h2 className="text-2xl md:text-3xl font-bold" style={{color: COLORS.primary_red}}>
              {stats.institutes}+
            </h2>
            <p className=" mt-3" style={{color: COLORS.primary_gray}}>Institutes</p>
          </div>
          <div className="bg-white px-6 py-6 rounded-xl shadow text-center">
            <h2 className="text-2xl md:text-3xl font-bold" style={{color: COLORS.primary_red}}>
              {stats.ratings}/5
            </h2>
            <p className=" mt-3" style={{color: COLORS.primary_gray}}>Ratings</p>
          </div>
        </div>
      </div>

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
