"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import { ChevronDown, SearchIcon, Sliders } from "lucide-react";
import CourseCard from "../StudentCourse/CourseCard";
import FilterSidebar from "../StudentCourse/FilterSidebar";
import { COLORS, FONTS } from "../../Constants/uiconstants";

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

  console.log("Dummy Data:", courses);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: COLORS.primary_yellow }}
    >
      <header
        className="sticky top-0 z-40 px-6 py-6 border-b border-black/10"
        style={{ backgroundColor: COLORS.primary_yellow }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h1
              className=" font-bold mb-3"
              style={{
                color: COLORS.primary_black,
                fontFamily: FONTS.boldHeading.fontFamily,
                fontWeight: FONTS.boldHeading.fontWeight,
                fontStyle: FONTS.boldHeading.fontStyle,
                fontSize: FONTS.boldHeading.fontSize,
              }}
            >
              Explore Courses
            </h1>

            <div className="relative w-full">
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
                  fontWeight: FONTS.regular.fontWeight,
                  fontSize: "15px",
                  outlineColor: COLORS.primary_red,
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            <span
              className="text-sm font-semibold"
              style={{ color: COLORS.primary_black, ...(FONTS.medium as any) }}
            >
              Sort By:
            </span>
            <details className="relative">
              <summary
                className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-100 transition cursor-pointer list-none bg-white"
                style={{
                  borderColor: COLORS.primary_gray,
                  color: COLORS.primary_black,
                  ...(FONTS.regular as any),
                }}
              >
                <span>Most Popular</span>
                <ChevronDown size={16} className="transition-transform" />
              </summary>
              <div className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="flex flex-col p-2 gap-1">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        const details = document.querySelector("details");
                        if (details) details.removeAttribute("open");
                      }}
                      className="flex items-center px-3 py-2 gap-4 rounded transition-colors hover:bg-gray-100"
                      style={{
                        backgroundColor: "#fafafa",
                        color: COLORS.primary_gray,
                        fontFamily: FONTS.regular.fontFamily,
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

      <main className="flex gap-6 px-4 py-6 md:px-8">
        <aside className="hidden lg:block w-64">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </aside>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg hover:opacity-90"
          style={{
            backgroundColor: COLORS.primary_red,
            color: COLORS.primary_white,
            fontFamily: FONTS.medium.fontFamily,
          }}
        >
          <Sliders size={20} />
          Filters
        </button>

        <section className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </section>
      </main>
    </div>
  );
}
