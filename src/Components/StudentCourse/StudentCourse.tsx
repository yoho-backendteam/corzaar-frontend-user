"use client";

import { useSelector } from "react-redux";
import {type RootState } from "../../store/store";
import { useState } from "react";
import { ChevronDown, SearchIcon, X } from "lucide-react";
import CourseCard from "../../Components/StudentCourse/CourseCard";
import FilterSidebar from "../../Components/StudentCourse/FilterSidebar";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import filter from "../../assets/Image/fillteryl.png";

const sortOptions = [
  "Most Popular",
  "Highest Rated",
  "Price Low to High",
  "Price High to Low",
  "Newest",
];

export default function ExploreCourses() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const courses = useSelector((state: RootState) => state.courses.list);

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: COLORS.primary_yellow }}
    >
      <header
        className="sticky top-0 z-40 px-4 md:px-8 py-5 border-b border-black/10"
        style={{ backgroundColor: COLORS.primary_yellow }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 w-full">
          <div className="flex flex-col flex-1">
            <h1
              className="mb-3"
              style={{
                color: COLORS.primary_black,
                fontFamily: FONTS.boldHeading.fontFamily,
                fontWeight: FONTS.boldHeading.fontWeight,
                fontSize: FONTS.boldHeading.fontSize,
              }}
            >
              Explore Courses
            </h1>

            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[600px] xl:max-w-[800px]">
              <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: COLORS.primary_gray }}
              />
              <input
                type="text"
                placeholder="Search for courses, institutes..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white placeholder:text-gray-500 focus:outline-none focus:ring-2"
                style={{
                  borderColor: COLORS.primary_gray,
                  color: COLORS.primary_black,
                  fontFamily: FONTS.regular.fontFamily,
                  fontSize: "15px",
                }}
              />
            </div>
          </div>

<div className="flex items-center justify-start gap-3 w-full sm:w-auto max-w-full md:max-w-[320px] lg:max-w-[360px] xl:max-w-[400px]">
  <span
    className="text-sm whitespace-nowrap"
    style={{
      color: COLORS.primary_black,
      fontFamily: FONTS.medium.fontFamily,
      fontWeight: FONTS.medium.fontWeight,
    }}
  >
    Sort By:
  </span>

  <details className="relative w-full">
    <summary
      className="flex items-center justify-between px-4 border rounded-lg hover:bg-gray-100 transition cursor-pointer list-none bg-white h-11"
      style={{
        borderColor: COLORS.primary_gray,
        color: COLORS.primary_black,
        fontFamily: FONTS.regular.fontFamily,
        fontSize: "15px",
        lineHeight: "20px",
      }}
    >
      <span>Most Popular</span>
      <ChevronDown size={16} className="transition-transform" />
    </summary>

    <div className="absolute top-12 right-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="flex flex-col p-2 gap-1">
        {sortOptions.map((option) => (
          <button
            key={option}
            onClick={() => {
              const details = document.querySelector("details");
              if (details) details.removeAttribute("open");
            }}
            className="flex items-center px-3 py-2 gap-4 rounded transition-colors hover:bg-gray-100 w-full text-left"
            style={{
              backgroundColor: "#fafafa",
              color: COLORS.primary_gray,
              fontFamily: FONTS.regular.fontFamily,
              fontSize: "14px",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  </details>
</div>


        </div>

        <p
          className="font-medium mt-3"
          style={{
            color: COLORS.primary_black,
            fontFamily: FONTS.medium.fontFamily,
          }}
        >
          {courses.length} Courses Found
        </p>
      </header>

      <main className="flex flex-1 gap-6 px-4 md:px-8 py-6 relative">
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-28">
            <FilterSidebar />
          </div>
        </aside>

        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
            <div className="bg-white w-72 h-full p-4 overflow-y-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg hover:opacity-90"
          style={{
            backgroundColor: COLORS.primary_red,
            fontFamily: FONTS.medium.fontFamily,
          }}
        >
          <img src={filter} alt="Filter Icon" className="w-5 h-5" />
          <span style={{ color: COLORS.primary_white }}>Filters</span>
        </button>

        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </section>
      </main>
    </div>
  );
}
