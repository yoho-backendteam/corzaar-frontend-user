import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import CourseCard from "./courseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS } from "../../Constants/uiconstants";

const RecommendedCourse: React.FC = () => {
  const topCourses = useSelector(
    (state: RootState) => state.studentHome.topCourses
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -containerWidth / 1.05 : containerWidth / 1.05,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const index = Math.round(scrollLeft / (containerWidth / 1.05));
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Responsive items per page
  const itemsPerPage =
    window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;

  const totalPages = Math.ceil(topCourses.length / itemsPerPage);

  return (
    <section className="md:px-12 lg:px-20 overflow-hidden relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-10 gap-3">
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ color: COLORS.primary_black }}
          >
            Recommended Courses
          </h2>
          <p
            className="text-sm md:text-base flex"
            style={{ color: COLORS.primary_gray }}
          >
            Based on your skills and interests
          </p>
        </div>
      </div>

      {/* Outer container for arrows + scroll */}
      <div className="flex items-center justify-center relative">
        {/* Left Arrow (outside) */}
        <button
          onClick={() => scroll("left")}
          className="hidden sm:flex items-center justify-center p-2 rounded-full shadow bg-white hover:bg-gray-100 transition absolute -left-6 md:-left-10 z-10"
        >
          <ChevronLeft
            className="w-5 h-5"
            style={{ color: COLORS.primary_red }}
          />
        </button>

        {/* Scrollable Courses */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory  sm:px-1"
        >
          {topCourses.map((course) => (
            <div
              key={course.id}
              className="flex shrink-0 w-[85%] sm:w-[45%] md:w-[30%] lg:w-[31%] snap-center"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {/* Right Arrow (outside) */}
        <button
          onClick={() => scroll("right")}
          className="hidden sm:flex items-center justify-center p-2 rounded-full shadow bg-white hover:bg-gray-100 transition absolute -right-6 md:-right-10 z-10"
        >
          <ChevronRight
            className="w-5 h-5"
            style={{ color: COLORS.primary_red }}
          />
        </button>
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i === activeIndex ? "bg-red-500 w-4" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendedCourse;
