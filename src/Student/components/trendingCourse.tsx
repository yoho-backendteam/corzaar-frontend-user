import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import CourseCard from "./courseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS } from "../../Constants/uiconstants";
import { selectTrendingCourseData } from "../../features/home_page/reducers/homeSelector";
import { getTrendingCourseThunk } from "../../features/home_page/reducers/homeThunk";
import type { Course } from "../../userHomeTypes/types";
import { useNavigate } from "react-router-dom";

const TrendingCourse = () => {
  const rawTrendingCourses = useSelector(selectTrendingCourseData);
  const trendingCourses: Course[] = Array.isArray(rawTrendingCourses)
    ? rawTrendingCourses
    : []; // ✅ prevents .slice() error

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const getTrendingCourses = async () => {
      try {
        await dispatch(getTrendingCourseThunk());
      } catch (error) {
        console.error("Error in fetching trending courses:", error);
      }
    };
    getTrendingCourses();
  }, [dispatch]);

  // Scroll function
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

  // Update active dot when user scrolls
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

  // ✅ Safe slice now
  const itemsToShow = trendingCourses.slice(0, 6);

  // Calculate pages for dots
  const itemsPerPage =
    window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const totalPages = Math.ceil(itemsToShow.length / itemsPerPage);

  return (
    <section className="relative py-10 px-4 md:px-12 lg:px-20 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-14 gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Trending Courses
          </h2>
          <p
            className="text-sm md:text-base"
            style={{ color: COLORS.primary_gray }}
          >
            Most popular courses this week
          </p>
        </div>
        <button
          className="text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
          style={{ background: COLORS.primary_red }}
          onClick={() => navigate("/courses")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#b01218")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = COLORS.primary_red)
          }
        >
          View All
        </button>
      </div>

      {/* If no trending courses */}
      {itemsToShow.length === 0 ? (
        <p className="text-center font-bold text-md">
          No trending courses available
        </p>
      ) : (
        <>
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-105 transition"
          >
            <ChevronLeft
              className="w-6 h-6"
              style={{ color: COLORS.primary_red }}
            />
          </button>

          {/* Course Cards */}
          <div
            ref={scrollRef}
            className="flex gap-13 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pr-[15%] md:pr-[0%]"
          >
            {itemsToShow.map((course, index) => (
              <div
                key={course.id || course._id || index} // ✅ ensures unique key
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
            <ChevronRight
              className="w-6 h-6"
              style={{ color: COLORS.primary_red }}
            />
          </button>

          {/* Page Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                className={`h-3 rounded-full transition-all duration-500 ease-in-out ${
                  i === activeIndex
                    ? "w-10"
                    : "bg-white opacity-70 w-3"
                }`}
                style={{
                  background:
                    i === activeIndex ? COLORS.primary_red : "white",
                }}
              ></div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default TrendingCourse;
