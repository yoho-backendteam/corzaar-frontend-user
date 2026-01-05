import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { COLORS, FONTS } from "../../Constants/uiconstants";


const SpecialPromotions:React.FC = () => {
  const promotions = useSelector(
    (state: RootState) => state.studentHome.promotions
  );

  return (
    <div className="mt-16 px-4 md:px-12 lg:px-20">
      <h2 className="text-2xl md:text-3xl text-left mb-1" style={{color:COLORS.primary_black,...(FONTS.boldHeading as any)}}>
        Special Promotions
      </h2>
      <p className=" mb-8 text-left"  style={{color: COLORS.primary_gray}}>
        Don’t miss out on these limited-time offers
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-14 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className=" rounded-2xl shadow p-6 flex flex-col justify-between text-left hover:shadow-lg transition"
            style={{background:COLORS.primary_white}}
          >
            <div>
              <div className=" w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <img
                  src={promo.icon}
                  alt={promo.title}
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-black">
                {promo.title}
              </h3>
              <p className=" mb-4 text-sm md:text-base"  style={{color: COLORS.primary_gray}}>
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
    </div>
  );
};

export default SpecialPromotions;
