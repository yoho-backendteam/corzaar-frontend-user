import React from "react";
import { Star, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { COLORS, FONTS } from "../../Constants/uiconstants";

const PopularInstitute = () => {
  const institutes = useSelector(
    (state: RootState) => state.studentHome.popularInstitute
  );

  return (
    <section className="py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
   
      <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-left">
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1"
          style={{
            ...(FONTS.S_Cart_title as any),
            color: COLORS.primary_black,
          }}
        >
          Popular Institutes
        </h2>
        <p
          className="text-xs sm:text-sm md:text-base"
          style={{ ...(FONTS.sub_head1 as any), color: COLORS.primary_gray }}
        >
          Learn from verified and trusted Institutes
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {institutes.map((institute) => (
          <div
            key={institute.id}
            className="rounded-[14px] overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 p-3 sm:p-4 border border-gray-200 w-full max-w-[300px] mx-auto"
            style={{ background: COLORS.primary_white }}
          >
            {/* Image */}
            <img
              src={institute.image}
              alt={institute.name}
              className="w-full h-36 sm:h-40 object-cover rounded-[14px]"
            />

            {/* Info Section */}
            <div className="p-1 sm:p-2 text-left">
              <h3
                className="text-base sm:text-lg pt-2 sm:pt-3 font-semibold pb-1"
                style={{ ...FONTS.S_Cart_title2, color: COLORS.primary_black }}
              >
                {institute.name}
              </h3>
              <p
                className="pt-2 sm:pt-3 text-xs sm:text-sm pb-2 sm:pb-3"
                style={{
                  ...FONTS.S_Cart_Rupees_delete,
                  color: COLORS.primary_gray,
                }}
              >
                {institute.courses} courses
              </p>

              {/* Rating + Location */}
              <div
                className="flex flex-col gap-1 text-xs sm:text-sm"
                style={{
                  ...(FONTS.nummedium as any),
                  color: COLORS.primary_gray,
                }}
              >
                <div className="flex mt-2 sm:mt-3 items-center gap-1">
                  <Star
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    style={{
                      fill: COLORS.primary_yellow,
                      stroke: COLORS.primary_yellow,
                    }}
                  />
                  <span className="font-semibold">{institute.rating}</span>
                </div>
                <div
                  className="flex mt-2 sm:mt-3 items-center gap-1"
                  style={{
                    ...FONTS.S_Cart_Rupees_delete,
                    color: COLORS.primary_gray,
                  }}
                >
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="truncate">{institute.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularInstitute;
