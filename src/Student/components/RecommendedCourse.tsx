import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import CourseCard from "./courseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS } from "../../Constants/uiconstants";

const RecommendedCourse = () => {
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
    <section className="relative py-10 px-4 md:px-12 lg:px-20  overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-14 gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-black">
           Recommended Courses
          </h2>
          <p className=" text-sm md:text-base" style={{color: COLORS.primary_gray}}>
           Bases on your skills interest
          </p>
        </div>
       
      </div>

    
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

    
    </section>
  );
};

export default  RecommendedCourse;
