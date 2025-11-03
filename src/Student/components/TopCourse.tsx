import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import CourseCard from "./courseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TopCourse = () => {
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

  // Calculate number of pages (approx)
  const itemsPerPage = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const totalPages = Math.ceil(topCourses.length / itemsPerPage);

  return (
    <section className="relative py-10 px-4 md:px-12 lg:px-20 bg-[#FFDD00] overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-black text-left">
            Top Courses Near You
          </h2>
          <p className="text-[#707070] text-sm md:text-base">
            Discover quality courses from institues in your area
          </p>
        </div>
        <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700">
          View All
        </button>
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-105 transition"
      >
        <ChevronLeft className="w-6 h-6 text-[#ED1C24]" />
      </button>

      {/* Course Cards */}
      <div
        ref={scrollRef}
        className="flex gap-13 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pr-[15%] md:pr-[0%]"
      >
        {topCourses.map((course) => (
          <div
            key={course.id}
            className="flex-shrink-0 w-[85%] sm:w-[45%] md:w-[30%] lg:w-[31%] snap-center"
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-105 transition"
      >
        <ChevronRight className="w-6 h-6 text-[#ED1C24]" />
      </button>

      {/* Page Dots */}
    <div className="flex justify-center mt-6 gap-2">
  {Array.from({ length: totalPages }).map((_, i) => (
    <div
      key={i}
      className={`h-3 rounded-full transition-all duration-500 ease-in-out ${
        i === activeIndex
          ? "bg-[#ED1C24] w-10 scale-80"
          : "bg-white opacity-70 w-3"
      }`}
    ></div>
  ))}
</div>

    </section>
  );
};

export default TopCourse;
