import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import CourseCard from "./courseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS, FONTS } from "../../Constants/uiconstants";

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
        left:
          direction === "left" ? -containerWidth / 1.05 : containerWidth / 1.05,
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


  const itemsPerPage =
    window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;

  const totalPages = Math.ceil(topCourses.length / itemsPerPage);

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 overflow-hidden relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 sm:pb-8 md:pb-10 gap-3">
        <div>
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold"
            style={{
              ...(FONTS.S_Cart_title as any),
              color: COLORS.primary_black,
            }}
          >
            Recommended Courses
          </h2>
          <p
            className="text-xs sm:text-sm md:text-base flex"
            style={{ ...(FONTS.sub_head1 as any), color: COLORS.primary_gray }}
          >
            Based on your skills and interests
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center relative">
        {/* Left Arrow (outside) */}
        <button
          onClick={() => scroll("left")}
          className="hidden sm:flex items-center justify-center p-2 rounded-full shadow bg-white hover:bg-gray-100 transition absolute -left-4 sm:-left-6 md:-left-8 lg:-left-10 z-10"
        >
          <ChevronLeft
            className="w-4 h-4 sm:w-5 sm:h-5"
            style={{ color: COLORS.primary_red }}
          />
        </button>

        {/* Scrollable Courses */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-1"
        >
          {topCourses.map((course) => (
            <div
              key={course.id}
              className="flex shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-auto sm:h-[580px] md:h-[600px] lg:h-[612px] p-2 sm:p-3 md:p-4 gap-3 sm:gap-4 md:gap-5 rounded-2xl snap-center"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {/* Right Arrow  */}
        <button
          onClick={() => scroll("right")}
          className="hidden sm:flex items-center justify-center p-2 rounded-full shadow bg-white hover:bg-gray-100 transition absolute -right-4 sm:-right-6 md:-right-8 lg:-right-10 z-10"
        >
          <ChevronRight
            className="w-4 h-4 sm:w-5 sm:h-5"
            style={{ color: COLORS.primary_red }}
          />
        </button>
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 sm:mt-5 md:mt-6 gap-1 sm:gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all ${
                i === activeIndex ? "bg-red-500 w-3 sm:w-4" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendedCourse;
