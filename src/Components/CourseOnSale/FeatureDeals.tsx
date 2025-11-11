import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuTag } from "react-icons/lu";
import { GoClock } from "react-icons/go";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { selectOfferData } from "../../features/offer_page/reducers/offerSelector";
import type { Offer } from "../../userHomeTypes/types";
import type { AppDispatch, RootState } from "../../store/store";
import { getOfferThunk } from "../../features/offer_page/reducers/offerThunk";

const FeaturedDeals: React.FC = () => {
  const deals = useSelector<RootState, Offer[]>(selectOfferData);
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

  return (
    <div className="p-6">
      <h2 className="mb-4" style={FONTS.boldHeading as object}>
        Featured Deals
      </h2>





      {(!deals || deals.length === 0) ? (
        <p
          className="text-center py-10 rounded-lg shadow-sm"
          style={{
            ...(FONTS.boldHeading3 as object),
            color: COLORS.primary_gray,
            background: COLORS.primary_white,
          }}
        >
          No featured deals available
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deals.map((deal) => (
            <div
              key={deal?._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
              style={{ background: COLORS.primary_white }}
            >
              <div className="relative">
                <img
                  src={deal?.image}
                  alt={deal?.title}
                  className="w-full h-56 object-cover p-2 rounded-2xl"
                />
                <div className="absolute bottom-1 p-4">
                  <span
                    className="px-2 py-1 rounded"
                    style={{
                      ...(FONTS.boldHeading3 as object),
                      color: COLORS.primary_white,
                      background: COLORS.primary_red,
                    }}
                  >
                    {deal?.discountValue}%
                  </span>
                  <h3
                    className="mt-2"
                    style={{
                      ...(FONTS.boldHeading3 as object),
                      color: COLORS.primary_black,
                    }}
                  >
                    {deal?.title}
                  </h3>
                </div>
              </div>

              <div className="p-4">
                <p
                  style={{
                    ...(FONTS.boldHeading4 as object),
                    color: COLORS.primary_gray,
                  }}
                >
                  {deal?.description}
                </p>

                <div className="mt-3 flex items-center border border-amber-400 rounded px-2 py-1 justify-between">
                  <span
                    className="flex gap-2 items-center"
                    style={FONTS.regular as object}
                  >
                    <LuTag style={{ color: COLORS.primary_yellow }} />{" "}
                    {deal?.code}
                  </span>
                  <button
                    style={{
                      ...(FONTS.boldHeading3 as object),
                      color: COLORS.primary_yellow,
                    }}
                    onClick={() =>
                      navigator?.clipboard?.writeText(
                        deal?.code || "no code available"
                      )
                    }
                  >
                    Copy
                  </button>
                </div>

                <p
                  className="mt-2 flex gap-2 items-center"
                  style={{
                    ...(FONTS.regular as object),
                    color: COLORS.primary_gray,
                  }}
                >
                  <GoClock /> Valid Until :{" "}
                  {new Date(deal?.endDate).toLocaleDateString("en-GB")}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <p style={FONTS.boldHeading4 as object}>Applicable To:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {deal?.courseId ? (
                      <span
                        className="px-2 py-1 rounded"
                        style={{
                          ...(FONTS.boldHeading4 as object),
                          color: COLORS.primary_white,
                          background: COLORS.primary_gray,
                        }}
                      >
                        {deal?.courseData?.title}
                      </span>
                    ) : (
                      <span>No course assigned</span>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    className="mt-4 w-full py-2 rounded"
                    style={{
                      ...(FONTS.boldHeading4 as object),
                      color: COLORS.primary_white,
                      background: COLORS.primary_red,
                    }}
                  >
                    Browse Courses
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedDeals;