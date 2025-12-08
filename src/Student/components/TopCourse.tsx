import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "./courseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS } from "../../Constants/uiconstants";
import { selectCourseData } from "../../features/home_page/reducers/homeSelector";
import { getCourseThunk } from "../../features/home_page/reducers/homeThunk";
import type { AppDispatch, RootState } from "../../store/store";
import type { Course } from "../../userHomeTypes/types";
import { useNavigate } from "react-router-dom";

const TopCourse = () => {
  const topCourses = useSelector<RootState, Course[]>(selectCourseData);
  const dispatch = useDispatch<AppDispatch>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

     const handleOpen = (id: string) => {
    navigate(`/courses/view/${id}`)
  }


  useEffect(() => {
    dispatch(getCourseThunk()).catch((err) => console.error(err));
  }, [dispatch]);


  const itemsToShow = topCourses.slice(0, 6);



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

  return (
    <section className="relative py-10 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-14 gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-black text-left">
            Top Courses Near You
          </h2>
          <p className="text-[#707070] text-sm md:text-base">
            Discover quality courses from institutes in your area
          </p>
        </div>
        <button
          className="text-white font-semibold px-4 py-2 cursor-pointer rounded-lg"
          style={{ background: COLORS.primary_red }}
          onClick={() => navigate("/courses")}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#b01218")}
          onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.primary_red)}
        >
          View All
        </button>
      </div>

      {/* No courses */}
      {itemsToShow?.length <= 0 ? (
        <p className="text-center font-bold text-md">No top courses available</p>
      ) : (
        <>
          {/* Left Arrow */}
          {totalPages > 1 && (
            <button
              onClick={() => scroll("left")}
              className="cursor-pointer hidden md:flex absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-105 transition"
            >
              <ChevronLeft className="w-6 h-6 " style={{ color: COLORS.primary_gray }} />
            </button>
          )}

          {/* Course Cards */}
          <div
            ref={scrollRef}
            className="flex gap-13 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pr-[15%] md:pr-[0%]"
          >
            {itemsToShow?.map((course,index) => (
              <div
                key={course?.id ?? index}
                  onClick={() => { handleOpen(course?._id) }}
                className="flex-shrink-0 w-[85%] sm:w-[45%] md:w-[30%] lg:w-[31%] cursor-pointer snap-center"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {totalPages > 1 && (
            <button
              onClick={() => scroll("right")}
              className="cursor-pointer hidden md:flex absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-105 transition"
            >
              <ChevronRight className="w-6 h-6 " style={{ color: COLORS.primary_red }} />
            </button>
          )}

          {/* Page Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array?.from({ length: totalPages })?.map((_, i) => (
                <div
                  key={i}
                  className={`h-3 rounded-full transition-all duration-500 ease-in-out ${i === activeIndex ? "w-10" : "bg-white opacity-70 w-3"
                    }`}
                  style={{
                    background: i === activeIndex ? COLORS.primary_red : "white",
                  }}
                ></div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default TopCourse;
