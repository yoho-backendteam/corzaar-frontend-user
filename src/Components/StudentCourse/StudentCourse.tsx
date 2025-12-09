/* eslint-disable @typescript-eslint/no-explicit-any */


import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { ChevronDown, SearchIcon, X } from "lucide-react";
import CourseCard from "../../Components/StudentCourse/CourseCard";
import FilterSidebar from "../../Components/StudentCourse/FilterSidebars";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import filter from "../../assets/Image/fillteryl.png";
import {
  fetchCourses,
  fetchTrendingCourses,
  fetchFeaturedCourses,
  fetchAllDetailedCourses,
  filterCourses,
} from "../../Components/Redux/courseThunks";
import type { RootState, AppDispatch } from "../../store/store";
import { BatchModal } from "./batchs/SelectBatchCard";
import { getBatchBycourseId } from "../../features/courses/service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const sortOptions = [
  "Most Popular",
  "Highest Rated",
  "Price Low to High",
  "Price High to Low",
  "Newest",
];

const DEFAULT_LIMIT = 10;

export default function ExploreCourses() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Most Popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [, setAppliedFilters] = useState<any>(null);

  // pagination local state
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(DEFAULT_LIMIT);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate()


  const courseState = useSelector((state: RootState) => state.course);
  const { courses = [], loading, error } = courseState;

  const [SelectedCourse, setSelectedCourse] = useState<any>(null);


  const fetchCoursesPage = async (pageNumber = 1) => {
    try {
      const actionResult: any = await dispatch(
        // @ts-ignore allow dynamic arg; adapt thunk if needed
        fetchCourses({ page: pageNumber, limit })
      );


      const payload = actionResult?.payload ?? actionResult;

      if (payload) {

        if (payload.data && Array.isArray(payload.data)) {
          setTotalPages(Number(payload.totalPages ?? 1));
          setTotalItems(Number(payload.total ?? payload.data.length ?? 0));
          setPage(Number(payload.page ?? pageNumber));
        } else if (Array.isArray(payload)) {

          setTotalPages(1);
          setTotalItems(payload.length);
          setPage(pageNumber);
        }
      } else {
        const reduxPage = (courseState as any).page;
        const reduxTotalPages = (courseState as any).totalPages;
        const reduxTotal = (courseState as any).total;
        if (reduxPage) setPage(Number(reduxPage));
        if (reduxTotalPages) setTotalPages(Number(reduxTotalPages));
        if (reduxTotal) setTotalItems(Number(reduxTotal));
      }
    } catch (err) {
      console.error("Failed to fetch courses page", err);
    }
  };


  useEffect(() => {
    fetchCoursesPage(page);
  }, [dispatch, page, limit]);


  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setAppliedFilters(null);
    setPage(1);

    switch (filterId) {
      case "all":
        fetchCoursesPage(1);
        break;
      case "trending":
        dispatch(fetchTrendingCourses());
        break;
      case "featured":
        dispatch(fetchFeaturedCourses());
        break;
      case "detailed":
        dispatch(fetchAllDetailedCourses());
        break;
      default:
        fetchCoursesPage(1);
    }
  };

  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
    setActiveFilter("");
    setPage(1);
    dispatch(filterCourses({ ...filters, page: 1, limit }));
  };

  const handleResetFilters = () => {
    setAppliedFilters(null);
    setActiveFilter("all");
    setPage(1);
    fetchCoursesPage(1);
  };

  const handleSortChange = (option: string) => {
    setSelectedSort(option);
    const details = document.querySelector("details");
    if (details) details.removeAttribute("open");
  };


  const filteredCourses = useMemo(() => {
    if (!Array.isArray(courses)) return [];

    if (!searchQuery.trim()) return courses;

    const query = searchQuery.toLowerCase();
    return courses.filter((course: any) => {
      return (
        course.title?.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query) ||
        course.instituteName?.toLowerCase().includes(query) ||
        course.category?.primary?.toLowerCase().includes(query) ||
        (Array.isArray(course.category?.secondary) &&
          course.category.secondary.join(" ").toLowerCase().includes(query))
      );
    });
  }, [courses, searchQuery]);


  const sortedAndFilteredCourses = useMemo(() => {
    const arr = [...filteredCourses];
    arr.sort((a: any, b: any) => {
      switch (selectedSort) {
        case "Most Popular":
          return (b.popularity || 0) - (a.popularity || 0);
        case "Highest Rated":
          return (b.rating || 0) - (a.rating || 0);
        case "Price Low to High":
          return (a.pricing?.price || 0) - (b.pricing?.price || 0);
        case "Price High to Low":
          return (b.pricing?.price || 0) - (a.pricing?.price || 0);
        case "Newest":
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        default:
          return 0;
      }
    });
    return arr;
  }, [filteredCourses, selectedSort]);


  const goToPage = (num: number) => {
    if (num < 1 || num > totalPages) return;
    setPage(num);

  };

  const prevPage = () => goToPage(Math.max(1, page - 1));
  const nextPage = () => goToPage(Math.min(totalPages, page + 1));


  useEffect(() => {
    const reduxTotalPages = (courseState as any).totalPages;
    const reduxTotal = (courseState as any).total;
    const reduxPage = (courseState as any).page;

    if (reduxTotalPages) setTotalPages(Number(reduxTotalPages));
    if (reduxTotal) setTotalItems(Number(reduxTotal));
    if (reduxPage) setPage(Number(reduxPage));
  }, []);


  const handelSlectedCourse = async (courseId: string) => {
    const { data } = await getBatchBycourseId(courseId)

    if (data.length == 0) {
      return toast.warn("there is no batch available")
    }

    setSelectedCourse(data)

  }

  const handelcloseModel = () => {
    setSelectedCourse(null)
  }


  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: COLORS.primary_yellow }}
    >
      <header
        className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b border-black/10"
        style={{ backgroundColor: COLORS.primary_yellow }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 w-full">
          <div className="flex flex-col flex-1 space-y-4">
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl"
              style={{
                color: COLORS.primary_black,
                fontFamily: FONTS.boldHeading.fontFamily,
                fontWeight: FONTS.boldHeading.fontWeight,
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              }}
            >
              Explore Courses
            </h1>

            <div className="relative w-full max-w-full lg:max-w-2xl">
              <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5"
                style={{ color: COLORS.primary_gray }}
              />
              <input
                type="text"
                placeholder="Search for courses, institutes..."
                className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border bg-white placeholder:text-gray-500 focus:outline-none focus:ring-2 text-sm sm:text-base"
                style={{
                  borderColor: COLORS.primary_gray,
                  color: COLORS.primary_black,
                  fontFamily: FONTS.regular.fontFamily,
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
            <span
              className="text-sm whitespace-nowrap shrink-0 hidden sm:inline-block"
              style={{
                color: COLORS.primary_black,
                fontFamily: FONTS.medium.fontFamily,
                fontWeight: FONTS.medium.fontWeight,
              }}
            >
              Sort By:
            </span>

            <details className="relative flex-1 lg:flex-none min-w-[140px] sm:min-w-40">
              <summary
                className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg hover:bg-gray-100 transition cursor-pointer list-none bg-white w-full"
                style={{
                  borderColor: COLORS.primary_gray,
                  color: COLORS.primary_black,
                  fontFamily: FONTS.regular.fontFamily,
                  fontSize: "14px",
                }}
              >
                <span className="truncate text-sm sm:text-base">
                  {selectedSort}
                </span>
                <ChevronDown
                  size={16}
                  className="transition-transform shrink-0"
                />
              </summary>

              <div className="absolute top-12 right-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="flex flex-col p-2 gap-1">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSortChange(option)}
                      className={`flex items-center cursor-pointer px-3 py-2.5 gap-4 rounded transition-colors hover:bg-gray-100 w-full text-left ${selectedSort === option ? "bg-gray-100 font-medium" : ""
                        }`}
                      style={{
                        color: COLORS.primary_gray,
                        fontFamily: FONTS.regular.fontFamily,
                        fontSize: "14px",
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

        <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
          {[
            { id: "all", label: "All Courses" },
            { id: "trending", label: "Trending Courses" },
            { id: "featured", label: "Featured Courses" },
            { id: "detailed", label: "Detailed Courses" },
          ].map((filterBtn) => (
            <button
              key={filterBtn.id}
              onClick={() => handleFilterChange(filterBtn.id)}
              className={`px-3 py-1.5 sm:px-4 cursor-pointer sm:py-2 rounded-full text-xs sm:text-sm transition-colors ${activeFilter === filterBtn.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {filterBtn.label}
            </button>
          ))}
        </div>

        <p
          className="font-medium mt-3 sm:mt-4 text-sm sm:text-base"
          style={{
            color: COLORS.primary_black,
            fontFamily: FONTS.medium.fontFamily,
          }}
        >
          {loading
            ? "Loading courses..."
            : error
              ? `Failed to load courses: ${error}`
              : `${totalItems ?? sortedAndFilteredCourses.length} Courses Found`}
        </p>
      </header>

      <main className="flex flex-1 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative">
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-28">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              activeFilter={activeFilter}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
            />
          </div>
        </aside>

        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex justify-end lg:hidden">
            <div className="bg-white w-80 sm:w-96 h-full p-4 sm:p-6 overflow-y-auto shadow-lg animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="font-semibold text-lg sm:text-xl">Filters</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <FilterSidebar
                onFilterChange={handleFilterChange}
                activeFilter={activeFilter}
                onApplyFilters={(filters) => {
                  handleApplyFilters(filters);
                  setIsSidebarOpen(false);
                }}
                onResetFilters={() => {
                  handleResetFilters();
                  setIsSidebarOpen(false);
                }}
              />
            </div>
          </div>
        )}

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: COLORS.primary_red,
            fontFamily: FONTS.medium.fontFamily,
          }}
        >
          <img src={filter} alt="Filter Icon" className="w-5 h-5" />
          <span
            style={{ color: COLORS.primary_white }}
            className="text-sm sm:text-base"
          >
            Filters
          </span>
        </button>

        <section className="flex-1 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {loading && (
            <div className="col-span-full flex justify-center py-8 sm:py-12">
              <p className="text-base sm:text-lg">Loading courses...</p>
            </div>
          )}

          {!loading && error && (
            <div className="col-span-full flex justify-center py-8 sm:py-12">
              <p className="text-red-500 text-base sm:text-lg">
                Error: {error}
              </p>
            </div>
          )}

          {!loading && !error && sortedAndFilteredCourses.length === 0 && (
            <div className="col-span-full flex justify-center py-8 sm:py-12">
              <p className="text-base sm:text-lg text-center">
                No courses found. Try adjusting your filters.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            sortedAndFilteredCourses.map((course: any) => (
              <div key={course.id || course._id} className="relative group">
                <CourseCard course={course} SelectedCourse={handelSlectedCourse} />
              </div>
            ))}
        </section>
      </main>


      <div className="flex justify-center items-center gap-2 py-6 px-4">
        <button
          onClick={prevPage}
          disabled={page === 1 || loading}
          className={`px-4 py-2 rounded border ${page === 1 || loading
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
            }`}
        >
          Prev
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => {

            const showAll = totalPages <= 7;
            const inRange =
              pNum === 1 ||
              pNum === totalPages ||
              (pNum >= page - 2 && pNum <= page + 2);

            if (!showAll && !inRange) {

              return null;
            }

            const isActive = pNum === page;
            return (
              <button
                key={pNum}
                onClick={() => goToPage(pNum)}
                className={`px-3 py-1 rounded ${isActive ? "bg-[#ED1C24] text-white" : "bg-white hover:bg-gray-100"
                  }`}
                aria-current={isActive ? "page" : undefined}
              >
                {pNum}
              </button>
            );
          })}


          {!Array.from({ length: totalPages }).every((_, i) => {
            const pNum = i + 1;
            return (
              totalPages <= 7 ||
              pNum === 1 ||
              pNum === totalPages ||
              (pNum >= page - 2 && pNum <= page + 2)
            );
          }) && (
              <div className="flex items-center gap-2">

                <button
                  onClick={() => goToPage(1)}
                  className={`px-3 py-1 rounded ${page === 1 ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                    }`}
                >
                  1
                </button>

                {page - 3 > 1 && <span className="px-2">...</span>}

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((pNum) => pNum >= page - 2 && pNum <= page + 2)
                  .map((pNum) => (
                    <button
                      key={`w-${pNum}`}
                      onClick={() => goToPage(pNum)}
                      className={`px-3 py-1 rounded ${pNum === page ? "bg-[#ED1C24] text-white" : "bg-white hover:bg-gray-100"
                        }`}
                    >
                      {pNum}
                    </button>
                  ))}

                {page + 3 < totalPages && <span className="px-2">...</span>}

                <button
                  onClick={() => goToPage(totalPages)}
                  className={`px-3 py-1 rounded ${page === totalPages ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                    }`}
                >
                  {totalPages}
                </button>
              </div>
            )}
        </div>

        <button
          onClick={nextPage}
          disabled={page === totalPages || loading}
          className={`px-4 py-2 rounded border ${page === totalPages || loading
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
            }`}
        >
          Next
        </button>
      </div>

      <BatchModal
        isOpen={SelectedCourse !== null}
        onClose={handelcloseModel}
        course={SelectedCourse}
        gotoCart={() => navigate("/cart")}
      />
    </div>
  );
}
