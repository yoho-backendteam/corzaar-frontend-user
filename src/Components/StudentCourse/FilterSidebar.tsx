"use client";

import { Star } from "lucide-react";
import filter from "../../assets/Image/fillteryl.png";
import { COLORS, FONTS } from "../../Constants/uiconstants";

export default function FilterSidebar() {
  const handleApplyFilters = () => {
    console.log("filters :");
  };

  const handleResetFilters = () => {
    console.log("Reset filters");
  };

  return (
    <div
      className="p-4 rounded-2xl shadow-md h-fit"
      style={{
        backgroundColor: COLORS.primary_white,
        borderColor: COLORS.primary_gray,
        boxShadow: "0px 4px 25px rgba(0,0,0,0.1)",
        fontFamily: FONTS.regular?.fontFamily,
        fontWeight: FONTS.regular?.fontWeight,
        fontStyle: FONTS.regular?.fontStyle,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-lg font-semibold"
          style={{
            color: COLORS.primary_black,
            fontFamily: FONTS.boldHeading?.fontFamily,
            fontWeight: FONTS.boldHeading?.fontWeight,
            fontSize: "20px",
          }}
        >
          Filters
        </h2>
        <div
          className="p-2 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: COLORS.primary_yellow }}
        >
          <img src={filter} alt="Filter Icon" className="w-5 h-5" />
        </div>
      </div>

      <div className="mb-4">
        <p
          className="font-semibold mb-2"
          style={{
            color: COLORS.primary_black,
            fontFamily: FONTS.medium?.fontFamily,
            fontWeight: FONTS.medium?.fontWeight,
          }}
        >
          Category
        </p>
        <div
          className="flex flex-col gap-1 text-sm"
          style={{ color: COLORS.primary_gray }}
        >
          <label>
            <input type="checkbox" className="mr-2 accent-red-600" /> All
          </label>
          <label>
            <input type="checkbox" className="mr-2 accent-red-600" /> Technology
          </label>
          <label>
            <input type="checkbox" className="mr-2 accent-red-600" /> Finance
          </label>
          <label>
            <input type="checkbox" className="mr-2 accent-red-600" /> Business
          </label>
        </div>
      </div>

      <div className="mb-4">
        <p
          className="font-semibold mb-2"
          style={{
            color: COLORS.primary_black,
            fontFamily: FONTS.medium?.fontFamily,
            fontWeight: FONTS.medium?.fontWeight,
          }}
        >
          Level
        </p>
        <div
          className="flex flex-col gap-1 text-sm"
          style={{ color: COLORS.primary_gray }}
        >
          <label>
            <input type="checkbox" className="mr-2 accent-red-600" /> Beginner
          </label>
          <label>
            <input type="checkbox" className="mr-2 accent-red-600" />{" "}
            Intermediate
          </label>
          <label>
            <input type="checkbox" className="mr-2 accent-red-600" /> Advanced
          </label>
        </div>
      </div>

      <div className="mb-4">
        <p
          className="font-semibold mb-2"
          style={{
            color: COLORS.primary_black,
            fontFamily: FONTS.medium?.fontFamily,
            fontWeight: FONTS.medium?.fontWeight,
          }}
        >
          Minimum Ratings
        </p>

        <div className="flex flex-col gap-1 text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 accent-red-600" />
            <span
              className="text-gray-700 flex items-center"
              style={{
                color: COLORS.primary_gray,
                fontFamily: FONTS.regular?.fontFamily,
                fontWeight: FONTS.regular?.fontWeight,
              }}
            >
              <div
                className="w-5 h-5 flex items-center justify-center rounded mr-1"
                style={{ backgroundColor: COLORS.primary_yellow }}
              >
                <Star
                  className="w-3 h-3"
                  style={{ color: COLORS.primary_white }}
                  fill={COLORS.primary_white}
                />
              </div>
              4.9 & Above
            </span>
          </label>

          <label className="flex items-center">
            <input type="checkbox" className="mr-2 accent-red-600" />
            <span
              className="text-gray-700 flex items-center"
              style={{
                color: COLORS.primary_gray,
                fontFamily: FONTS.regular?.fontFamily,
                fontWeight: FONTS.regular?.fontWeight,
              }}
            >
              <div
                className="w-5 h-5 flex items-center justify-center rounded mr-1"
                style={{ backgroundColor: COLORS.primary_yellow }}
              >
                <Star
                  className="w-3 h-3"
                  style={{ color: COLORS.primary_white }}
                  fill={COLORS.primary_white}
                />
              </div>
              4 & Above
            </span>
          </label>

          <label className="flex items-center">
            <input type="checkbox" className="mr-2 accent-red-600" />
            <span
              className="text-gray-700 flex items-center"
              style={{
                color: COLORS.primary_gray,
                fontFamily: FONTS.regular?.fontFamily,
                fontWeight: FONTS.regular?.fontWeight,
              }}
            >
              <div
                className="w-5 h-5 flex items-center justify-center rounded mr-1"
                style={{ backgroundColor: COLORS.primary_yellow }}
              >
                <Star
                  className="w-3 h-3"
                  style={{ color: COLORS.primary_white }}
                  fill={COLORS.primary_white}
                />
              </div>
              3.5 & Above
            </span>
          </label>

          <label className="flex items-center">
            <input type="checkbox" className="mr-2 accent-red-600" />
            <span
              className="text-gray-700 flex items-center"
              style={{
                color: COLORS.primary_gray,
                fontFamily: FONTS.regular?.fontFamily,
                fontWeight: FONTS.regular?.fontWeight,
              }}
            >
              <div
                className="w-5 h-5 flex items-center justify-center rounded mr-1"
                style={{ backgroundColor: COLORS.primary_yellow }}
              >
                <Star
                  className="w-3 h-3"
                  style={{ color: COLORS.primary_white }}
                  fill={COLORS.primary_white}
                />
              </div>
              3 & Above
            </span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <p
          className="font-semibold mb-2"
          style={{
            color: COLORS.primary_black,
            fontFamily: FONTS.medium?.fontFamily,
            fontWeight: FONTS.medium?.fontWeight,
          }}
        >
          Near By Location
        </p>
        <input type="range" className="w-full accent-red-600" />
      </div>

      <div className="mb-4">
        <p
          className="font-semibold mb-2"
          style={{
            color: COLORS.primary_black,
            fontFamily: FONTS.medium?.fontFamily,
            fontWeight: FONTS.medium?.fontWeight,
          }}
        >
          Price Range
        </p>
        <input type="range" className="w-full accent-red-600" />
      </div>

      <div className="mb-4">
        <p
          className="font-semibold mb-2"
          style={{
            color: COLORS.primary_black,
            fontFamily: FONTS.medium?.fontFamily,
            fontWeight: FONTS.medium?.fontWeight,
          }}
        >
          Mode
        </p>
        <div
          className="flex flex-col gap-1 text-sm"
          style={{ color: COLORS.primary_gray }}
        >
          <label>
            <input type="checkbox" className="mr-2 accent-red-600" /> Online
          </label>
          <label>
            <input type="checkbox" className="mr-2 accent-red-600" /> Offline
          </label>
          <label>
            <input type="checkbox" className="mr-2 accent-red-600" /> Hybrid
          </label>
        </div>
      </div>

      {/* ✅ Apply Filters Button */}
<button
  onClick={handleApplyFilters}
  className="w-full mt-4 rounded-md py-2 mb-2 border transition-all duration-300 hover:shadow-md"
  style={{
    backgroundColor: COLORS.primary_white,
    color: COLORS.primary_red,
    borderColor: COLORS.primary_red,
    fontFamily: FONTS.medium?.fontFamily,
    fontWeight: FONTS.medium?.fontWeight,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = COLORS.primary_red;
    e.currentTarget.style.color = COLORS.primary_white;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = COLORS.primary_white;
    e.currentTarget.style.color = COLORS.primary_red;
  }}
>
  Apply Filters
</button>

{/* 🔄 Reset Filters Button */}
<button
  onClick={handleResetFilters}
  className="w-full rounded-md py-2 border transition-all duration-300 hover:shadow-md"
  style={{
    backgroundColor: COLORS.primary_white,
    color: COLORS.primary_red,
    borderColor: COLORS.primary_red,
    fontFamily: FONTS.medium?.fontFamily,
    fontWeight: FONTS.medium?.fontWeight,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = COLORS.primary_red;
    e.currentTarget.style.color = COLORS.primary_white;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = COLORS.primary_white;
    e.currentTarget.style.color = COLORS.primary_red;
  }}
>
  Reset Filters
</button>

    </div>
  );
}