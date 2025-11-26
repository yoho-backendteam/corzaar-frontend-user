import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { COLORS, FONTS } from "../../Constants/uiconstants";

const SpecialPromotions = () => {
  const promotions = useSelector(
    (state: RootState) => state.studentHome.promotions
  );

  return (
    <div className="mt-12 sm:mt-14 md:mt-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      <h2
        className="text-xl sm:text-2xl md:text-3xl text-left mb-1"
        style={{ color: COLORS.primary_black, ...(FONTS.S_Cart_title as any), }}
      >
        Special Promotions
      </h2>
      <p
        className="text-sm sm:text-base mb-6 sm:mb-8 text-left"
        style={{...(FONTS.sub_head1 as any), color: COLORS.primary_gray }}
      >
        Don't miss out on these limited-time offers
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10 md:mt-12 lg:mt-14">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="rounded-2xl shadow p-4 sm:p-5 md:p-6 flex flex-col justify-between text-left hover:shadow-lg transition w-full max-w-[400px] mx-auto"
            style={{ background: COLORS.primary_white }}
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <img
                  src={promo.icon}
                  alt={promo.title}
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-black">
                {promo.title}
              </h3>
              <p
                className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4"
                style={{ color: COLORS.primary_gray }}
              >
                {promo.description}
              </p>
            </div>
            <button
              className={`${promo.buttonColor} text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-red-700 self-start text-xs sm:text-sm`}
            >
              {promo.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialPromotions;
