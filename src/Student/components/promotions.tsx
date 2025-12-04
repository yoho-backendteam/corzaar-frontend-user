import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { selectOfferData } from "../../features/home_page/reducers/homeSelector";
import { useEffect, useRef} from "react";
import { getOfferThunk } from "../../features/home_page/reducers/homeThunk";
import type { AppDispatch, RootState } from "../../store/store";
import type { Offer } from "../../userHomeTypes/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SpecialPromotions = () => {
  const promotions = useSelector<RootState, Offer[]>(selectOfferData);
  console.log(promotions, "promotions");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getAllOffers = async () => {
      try {
        await dispatch(getOfferThunk());
      } catch (error) {
        console.error("Error in fetching offers:", error);
      }
    };

    getAllOffers();
  }, [dispatch]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const itemsToShow = promotions;
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
    <div className="  ">
      <h2 className="text-2xl md:text-3xl text-left mb-1 px-4 sm:px-8 md:px-12 lg:px-20" style={{ color: COLORS.primary_black, ...(FONTS.boldHeading as any) }}>
        Special Promotions
      </h2>
      <p className="text-left px-4 sm:px-8 md:px-12 lg:px-20" style={{ color: COLORS.primary_gray }}>
        Don’t miss out on these limited-time offers
      </p>

      <section className="relative py-10 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden">


        {itemsToShow?.length <= 0 ? (
          <p className="text-center font-bold text-md">No top courses available</p>
        ) : (
          <>
            {totalPages > 1 && (
              <button
                onClick={() => scroll("left")}
                className="hidden cursor-pointer md:flex absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-105 transition"
              >
                <ChevronLeft className="w-6 h-6 " style={{ color: COLORS.primary_gray }} />
              </button>
            )}

            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pr-[15%] md:pr-[0%]"
            >
              {itemsToShow?.map((promo, index) => (
                <div
                  key={promo?.id ?? index}
                  className="shrink-0 w-[85%] bg-white rounded-2xl sm:w-[45%] md:w-[30%] lg:w-[31%] snap-center"
                >
                  <div>
                    <div className="p-5">
                      <img
                        // src={promo.icon}
                        src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                        alt={promo.title}
                        className=" rounded-2xl"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-black">
                      {promo.title}
                    </h3>
                    <p
                      className="mb-4 text-sm md:text-base"
                      style={{ color: COLORS.primary_gray }}
                    >
                      {promo.description}
                    </p>
                  </div>
                  <button
                    className={`${promo.buttonColor} text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 self-start`}
                  >
                    {promo.buttonText}
                  </button>
                </div>
              ))}
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

    </div>
  );
};

export default SpecialPromotions;
