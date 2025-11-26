import { Star, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { COLORS, FONTS } from "../../Constants/uiconstants";

const ExpertsInstitute = () => {
  const institutes = useSelector(
    (state: RootState) => state.studentHome.InstitueExperts
  );

  return (
    <section
      className="py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20"
      style={{ background: COLORS.primary_red }}
    >

      <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-left">
        <h2
          className="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-1"
          style={{
            ...(FONTS.S_Cart_title as any),
          }}
        >
          Institues Experts Hub
        </h2>
        <p
          className="text-xs sm:text-sm md:text-base text-white"
          style={{ ...(FONTS.sub_head1 as any) }}
        >
          Discover quality education provides in your area
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {institutes.map((institute) => (
          <div
            key={institute.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[300px] mx-auto"
          >
            <img
              src={institute.image}
              alt={institute.name}
              className="w-full h-36 sm:h-40 object-cover"
            />

            <div className="p-4 sm:p-5 text-left">
              <h3
                className="text-base sm:text-lg mt-2 sm:mt-3 font-semibold text-black mb-1"
                style={{ ...FONTS.S_Cart_title2, color: COLORS.primary_black }}
              >
                {institute.name}
              </h3>
              <p
                className="mt-2 sm:mt-3 text-xs sm:text-sm mb-2 sm:mb-3"
                style={{
                  ...FONTS.S_Cart_Rupees_delete,
                  color: COLORS.primary_gray,
                }}
              >
                {institute.courses} courses
              </p>

              <div
                className="flex flex-col gap-1 text-xs sm:text-sm"
                style={{
                  ...(FONTS.nummedium as any),
                  color: COLORS.primary_gray,
                }}
              >
                <div className="flex mt-2 sm:mt-3 items-center gap-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
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
                  <span>{institute.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertsInstitute;
