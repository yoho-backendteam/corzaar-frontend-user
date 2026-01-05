import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import CourseCard from "./courseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS, FONTS } from "../../Constants/uiconstants";

const TopCourse:React.FC = () => {
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
          direction === "left"
            ? -containerWidth / 1.05
            : containerWidth / 1.05,
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
    <section className="relative py-10 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 sm:mb-14 gap-4">
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold flex items-start"
            style={{...(FONTS.boldHeading as any),color:COLORS.primary_black}}
          >
            Top Courses Near You
          </h2>
          <p
            className="text-sm md:text-base text-[#707070]"
            style={FONTS.regular as any}
          >
            Discover quality courses from institutes in your area
          </p>
        </div>
        <button
          className="text-white font-semibold px-5 py-2 rounded-lg text-sm md:text-base"
          style={{ background: COLORS.primary_red }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#b01218")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = COLORS.primary_red)
          }
        >
          View All
        </button>
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-105 transition"
      >
        <ChevronLeft
          className="w-6 h-6"
          style={{ color: COLORS.primary_gray }}
        />
      </button>

      {/* Course Cards */}
      <div
        ref={scrollRef}
        className="flex gap-5 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-1"
      >
        {topCourses.map((course) => (
          <div
            key={course.id}
            className="flex shrink-0 w-[90%] sm:w-[48%] md:w-[31%] lg:w-[30%] snap-center"
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-105 transition"
      >
        <ChevronRight
          className="w-6 h-6"
          style={{ color: COLORS.primary_red }}
        />
      </button>

      {/* Page Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div
            key={i}
            className={`h-3 rounded-full transition-all duration-500 ease-in-out ${
              i === activeIndex ? "w-10" : "w-3"
            }`}
            style={{
              background: i === activeIndex ? COLORS.primary_red : "#E5E5E5",
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default TopCourse;
