import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { COLORS } from "../../Constants/uiconstants";
import { selectInstituteData } from "../../features/home_page/reducers/homeSelector";
import { getInstituteThunk } from "../../features/home_page/reducers/homeThunk";
import type { Institute } from "../../userHomeTypes/types";

const ExpertsInstitute = () => {
  const institutes = useSelector<RootState, Institute[]>(selectInstituteData);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getInstitutes = async () => {
      try {
        await dispatch(getInstituteThunk());
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    };
    getInstitutes();
  }, [dispatch]);

  const limitedInstitutes = institutes;

  const scrollRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const totalPages = Math.ceil(limitedInstitutes.length / itemsPerPage);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -containerWidth / 1.05 : containerWidth / 1.05,
      behavior: "smooth",
    });
  };

  return (
    <section
      className=""
      style={{ background: COLORS.primary_red }}
    >
      <div className=" text-left py-12 px-6 md:px-12 lg:px-20">
        <h2 className="text-2xl md:text-3xl text-white font-bold mb-1">
          Institutes Experts Hub
        </h2>
        <p className="text-sm md:text-base text-white">
          Discover quality education providers in your area
        </p>
      </div>

      <section className="relative py-10 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden">


        {limitedInstitutes?.length <= 0 ? (
          <p className="text-center font-bold text-md">No top courses available</p>
        ) : (
          <>
            {totalPages >= 1 && (
              <button
                onClick={() => scroll("left")}
                className="hidden cursor-pointer md:flex absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-105 transition"
              >
                <ChevronLeft className="w-6 h-6 "  />
              </button>
            )}

            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pr-[15%] md:pr-[0%]"
            >
              {limitedInstitutes?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-4">
                  {limitedInstitutes?.map((institute, index) => (
                    <div
                      key={institute?.id || institute?._id || index}
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <img
                        src={institute?.coverImage || "/placeholder.png"}
                        alt={institute?.name || "Institute"}
                        className="w-full h-40 object-cover"
                      />

                      <div className="p-5 text-left">
                        <h3 className="text-lg mt-3 font-semibold text-black mb-1">
                          {institute?.name}
                        </h3>
                        <p
                          className="mt-3 text-sm mb-3"
                          style={{ color: COLORS.primary_gray }}
                        >
                          {Array.isArray(institute?.courses)
                            ? `${institute?.courses.length} courses`
                            : `${institute?.courses || 0} courses`}
                        </p>

                        <div
                          className="flex flex-col gap-1 text-sm"
                          style={{ color: COLORS.primary_gray }}
                        >
                          <div
                            className="flex mt-3 items-center gap-1"
                            style={{ color: COLORS.primary_gray }}
                          >
                            <MapPin className="w-4 h-4" />
                            <span>{institute?.contactInfo?.address?.city}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-white text-lg font-medium">
                  No institute expert hubs available
                </div>
              )}
            </div>

            {totalPages >= 1 && (
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

export default ExpertsInstitute;
