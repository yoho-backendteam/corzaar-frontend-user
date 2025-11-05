import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredInstitutes,
  selectActiveCategory,
  selectSearch,
} from "../../redux/Institute/instituteSelectors";
import { setSearch, setActiveCategory } from "../../redux/Institute/instituteSlice"
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

const ExploreInstitutes: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredInstitutes = useSelector(selectFilteredInstitutes);
  const activeCategory = useSelector(selectActiveCategory);
  const search = useSelector(selectSearch);

  const categories = [
    "All Categories",
    "Technology",
    "Design",
    "Business",
    "Data Science",
    "All",
    "Marketing",
    "Cloud",
    "DevOps",
    "Finance",
    "Investment",
  ];

  return (
    <div className="min-h-screen bg-[#FFDD00] px-4 md:px-10 py-8">
      <h1
        style={FONTS.boldHeading as React.CSSProperties}
        className="text-2xl md:text-3xl font-bold text-gray-900"
      >
        Explore Institutes
      </h1>
      <p
        style={FONTS.regular as React.CSSProperties}
        className="text-[#707070] text-sm md:text-base mt-1"
      >
        Discover trusted educational institutes offering quality courses
      </p>

      {/* 🔍 Search */}
      <div className="relative mt-6 w-full ">
        <Search className="absolute left-3 top-3 text-[#707070]" size={18} />
        <input
          style={FONTS.regular as React.CSSProperties}
          type="text"
          placeholder="Search for courses, institutes..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 bg-white focus:ring-red-400 outline-none text-sm md:text-base"
        />
      </div>

      {/* 🏷 Categories */}
      <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-7 mt-6">
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => dispatch(setActiveCategory(cat))}
      style={FONTS.tabheading as React.CSSProperties}
      className={`px-4 py-2 rounded-lg border text-sm md:text-base font-medium transition-all duration-200 
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


      {/* Count */}
      <h2
        style={FONTS.boldHeading as React.CSSProperties}
        className="mt-8 text-lg md:text-xl font-semibold text-gray-900"
      >
        Find {filteredInstitutes.length} Institutes
      </h2>

      {/* 📊 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-5">
        {filteredInstitutes.map((inst) => (
          <div
            key={inst.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <img
              src={inst.image}
              alt={inst.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-5">
              <h3 style={FONTS.boldHh as React.CSSProperties}>{inst.name}</h3>
              <p
                style={FONTS.regular as React.CSSProperties}
                className="text-sm text-gray-600 mt-1"
              >
                {inst.description}
              </p>

              <div                 style={FONTS.mediummm as React.CSSProperties}
 className="flex items-center gap-3 mt-3 text-[#707070] text-sm">
                <img src={star} alt="Rating" className="w-4 h-4" />
                <span>{inst.rating}</span>
                <img src={hat} alt="Courses" className="w-4 h-4" />
                <span>{inst.courses} Courses</span>
                <img src={student} alt="Students" className="w-4 h-4" />
                <span>{inst.students} Students</span>
              </div>

              <p style={FONTS.nummedium as React.CSSProperties} className="flex items-center text-sm text-[#707070] mt-4 gap-2">
                <img src={map} alt="location" className="w-5 h-5" />
                {inst.city}
              </p>

              <div style={FONTS.mediummm as React.CSSProperties} className="flex flex-wrap gap-3 mt-3">
                {inst.tags.map((tag) => ( 
                  <span
                    key={tag}
                    className="text-xs bg-[#7070701A] px-3 py-1 rounded-md text-[#707070]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

             <div style={{...FONTS.regular as React.CSSProperties}} className="flex items-center gap-3 mt-4 text-[#707070] text-sm">
                
                <span>{inst.email}</span>
              </div>

              {/* Links */}
              <div style={{...FONTS.nummedium1 as React.CSSProperties}}  className="flex gap-8  mt-4">
                <a
                  href={inst.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[#ED1C24] text-sm font-medium hover:underline"
                >
                  <img src={website} alt="Website" className="w-5 h-5" />
                  Website
                </a>

                <a
                  href={inst.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-blue-700 text-sm font-medium hover:underline"
                >
                  <img src={linkedin} alt="LinkedIn" className="w-[24px] h-[24px]" />
                  LinkedIn
                </a>
              </div>


              <button
                onClick={() => navigate(`/institute/${inst.id}`)}
                className="mt-5 bg-[#ED1C24] text-white font-medium py-2 rounded-md w-full flex items-center justify-center gap-2"
              >
                View Courses <img src={teacher} className="w-5 h-5" />
              </button> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreInstitutes;
