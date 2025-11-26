import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import CourseCard from "./courseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS, FONTS } from "../../Constants/uiconstants";

const TrendingCourse = () => {
  const trendingCourses = useSelector(
    (state: RootState) => state.studentHome.trendingCourses
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

  // Calculate number of pages (approx)
  const itemsPerPage =
    window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const totalPages = Math.ceil(trendingCourses.length / itemsPerPage);

  return (
    <section className="relative py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-14 gap-3 sm:gap-4">
        <div className="">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold text-black"
            style={{
              ...(FONTS.S_Cart_title as any),
              color: COLORS.primary_black,
            }}
          >
            Trending Courses
          </h2>
          <p
            className="text-xs sm:text-sm md:text-base"
            style={{ ...(FONTS.sub_head1 as any), color: COLORS.primary_gray }}
          >
            Most popular courses this week
          </p>
        </div>
        <button
          className="w-[70px] sm:w-[80px] md:w-[89px] h-[32px] sm:h-[34px] md:h-[36px] gap-2 sm:gap-[10px] text-white font-semibold py-1 sm:py-2 px-3 sm:px-4 rounded-[4px] text-xs sm:text-sm md:text-base transition-all duration-300 whitespace-nowrap"
          style={{
            ...(FONTS.boldHeadingg3 as any),
            backgroundColor: COLORS.primary_red,
          }}
        >
          View All
        </button>
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="hidden sm:flex absolute left-2 sm:left-3 md:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1.5 sm:p-2 rounded-full shadow hover:scale-105 transition"
      >
        <ChevronLeft
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          style={{ color: COLORS.primary_red }}
        />
      </button>

      {/* Course Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-1"
      >
        {trendingCourses.map((course) => (
          <div
            key={course.id}
            className="flex shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-auto sm:h-[580px] md:h-[600px] lg:h-[612px] p-2 sm:p-3 md:p-4 gap-3 sm:gap-4 md:gap-5 rounded-[16px] snap-center"
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="hidden sm:flex absolute right-2 sm:right-3 md:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1.5 sm:p-2 rounded-full shadow hover:scale-105 transition"
      >
        <ChevronRight
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          style={{ color: COLORS.primary_red }}
        />
      </button>

      {/* Page Dots */}
      <div className="flex justify-center mt-4 sm:mt-5 md:mt-6 gap-1.5 sm:gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div
            key={i}
            className={`h-2 sm:h-3 rounded-full transition-all duration-500 ease-in-out ${
              i === activeIndex ? "w-6 sm:w-8 md:w-10" : "w-2 sm:w-3"
            }`}
            style={{
              background: i === activeIndex ? COLORS.primary_red : "white",
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default TrendingCourse;
