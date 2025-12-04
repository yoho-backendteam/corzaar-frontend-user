import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CourseCard from "./courseCard";
import { COLORS } from "../../Constants/uiconstants";
import { selectCourseData } from "../../features/home_page/reducers/homeSelector";
import type { CourseCardProps } from "../../userHomeTypes/types";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RecommendedCourse = () => {
  const RecommendCourses = useSelector(selectCourseData);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [_activeIndex, setActiveIndex] = useState(0);
  const Navigate = useNavigate();

  const handleOpen = (course: CourseCardProps) => {
    Navigate(`/courses/view/${course?._id}`)
  }

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

  console.log(RecommendCourses, 'coursesss')

  const itemsToShow = RecommendCourses;
  const itemsPerPage = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const totalPages = Math.ceil(itemsToShow.length / itemsPerPage);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -containerWidth / 1.05 : containerWidth / 1.05,
      behavior: "smooth",
    });
  };

  return (
    <section className=" overflow-hidden relative">
      {/* Header */}
      <div className="flex md:px-12 lg:px-20 flex-col sm:flex-row justify-between items-start sm:items-center pb-10 gap-3">
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

      <section className="relative py-10 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden">


        {itemsToShow?.length <= 0 ? (
          <p className="text-center font-bold text-md">No top courses available</p>
        ) : (
          <>
            {totalPages > 1 && (
              <button
                onClick={() => scroll("left")}
                className="hidden cursor-pointer md:flex absolute  left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-105 transition"
              >
                <ChevronLeft className="w-6 h-6 " style={{ color: COLORS.primary_gray }} />
              </button>
            )}

            <div
              ref={scrollRef}
              className="flex gap-13 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pr-[15%] md:pr-[0%]"
            >
              {RecommendCourses && RecommendCourses.length > 0 ? (
                RecommendCourses.map((course, index) => (
                  <div
                    key={index}
                    onClick={() => { handleOpen(course) }}
                    className="shrink-0 w-[85%] sm:w-[45%] md:w-[30%] lg:w-[30%] snap-center"
                  >
                    <CourseCard course={course as unknown as CourseCardProps["course"]} />
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 w-full py-8">
                  No recommended courses available
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <button
                onClick={() => scroll("right")}
                className="hidden cursor-pointer md:flex absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-105 transition"
              >
                <ChevronRight className="w-6 h-6 " style={{ color: COLORS.primary_red }} />
              </button>
            )}

          </>
        )}
      </section>



    </section>
  );
};

export default RecommendedCourse;
