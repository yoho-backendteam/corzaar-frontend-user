import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import filter from "../../assets/Image/fillteryl.png";
import { COLORS, FONTS } from "../../Constants/uiconstants";

interface FilterSidebarProps {
  categories?: any[];
  onFilterChange?: (filterId: string) => void;
  activeFilter?: string;
  onApplyFilters?: (filters: any) => void;
  onResetFilters?: () => void;
}

export default function FilterSidebar({
  categories = [],
  onFilterChange,
  activeFilter,
  onApplyFilters,
  onResetFilters,
}: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [locationRadius, setLocationRadius] = useState<number>(50);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 5000,
  });

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    setSelectedCategories((prev) =>
      isChecked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  const handleLevelChange = (level: string, isChecked: boolean) => {
    setSelectedLevels((prev) =>
      isChecked
        ? [...prev, level.toLowerCase()]
        : prev.filter((l) => l !== level.toLowerCase())
    );
  };

  const handleRatingChange = (rating: number, isChecked: boolean) => {
    setMinRating(isChecked ? rating : 0);
  };

  const handleModeChange = (mode: string, isChecked: boolean) => {
    setSelectedModes((prev) =>
      isChecked
        ? [...prev, mode.toLowerCase()]
        : prev.filter((m) => m !== mode.toLowerCase())
    );
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationRadius(parseInt(event.target.value));
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setPriceRange({ min: 0, max: value });
  };

  const handleApplyFilters = () => {
    const filters = {
      categories:
        selectedCategories.length > 0 ? selectedCategories : undefined,
      levels: selectedLevels.length > 0 ? selectedLevels : undefined,
      minRating: minRating > 0 ? minRating : undefined,
      modes: selectedModes.length > 0 ? selectedModes : undefined,
      locationRadius: locationRadius !== 50 ? locationRadius : undefined,
      priceRange: priceRange.max !== 5000 ? priceRange : undefined,
    };
    onApplyFilters?.(filters);
  };
  // Inside FilterSidebar component, add useEffect for location
  useEffect(() => {
    // Request location permission on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          localStorage.setItem("userLocation", JSON.stringify(location));
        },
        (error) => {
          console.log("Location access denied or unavailable:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          localStorage.setItem("userLocation", JSON.stringify(location));
        },
        (error) => {
          console.log("Location access denied or unavailable:", error);
        }
      );
    }
  }, []);

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedModes([]);
    setMinRating(0);
    setLocationRadius(50);
    setPriceRange({ min: 0, max: 5000 });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });

    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach((slider) => {
      const rangeInput = slider as HTMLInputElement;
      if (rangeInput.min === "1") {
        rangeInput.value = "50";
      } else {
        rangeInput.value = "5000";
      }
    });

    onResetFilters?.();
  };

  const filterOptions = [
    { id: "all", label: "All Courses" },
    { id: "trending", label: "Trending Courses" },
    { id: "featured", label: "Featured Courses" },
    { id: "detailed", label: "Detailed Courses" },
  ];

  const defaultCategories = [
    { id: "all", name: "All" },
    { id: "technology", name: "Technology" },
    { id: "finance", name: "Finance" },
    { id: "business", name: "Business" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
  ];

  const displayCategories =
    categories.length > 0 ? categories : defaultCategories;

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

      <div className="mb-6">
        <p
          className="font-semibold mb-2"
          style={{
            color: COLORS.primary_black,
            fontFamily: FONTS.medium?.fontFamily,
            fontWeight: FONTS.medium?.fontWeight,
          }}
        >
          Quick Filters
        </p>
        <div className="grid grid-cols-2 gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange?.(filter.id)}
              className={`px-2 py-1 rounded text-sm transition-colors ${
                activeFilter === filter.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
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
          className="flex flex-col gap-1 text-sm max-h-32 overflow-y-auto"
          style={{ color: COLORS.primary_gray }}
        >
          {displayCategories.map((category) => (
            <label
              key={category.id || category._id}
              className="flex items-center"
            >
              <input
                type="checkbox"
                className="mr-2 accent-red-600"
                checked={selectedCategories.includes(category.name)}
                onChange={(e) =>
                  handleCategoryChange(category.name, e.target.checked)
                }
              />
              {category.name}
            </label>
          ))}
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
            <input
              type="checkbox"
              className="mr-2 accent-red-600"
              checked={selectedLevels.includes("beginner")}
              onChange={(e) => handleLevelChange("Beginner", e.target.checked)}
            />
            Beginner
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2 accent-red-600"
              checked={selectedLevels.includes("intermediate")}
              onChange={(e) =>
                handleLevelChange("Intermediate", e.target.checked)
              }
            />
            Intermediate
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2 accent-red-600"
              checked={selectedLevels.includes("advanced")}
              onChange={(e) => handleLevelChange("Advanced", e.target.checked)}
            />
            Advanced
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
          {[
            { rating: 4.9, label: "4.9 & Above" },
            { rating: 4.0, label: "4 & Above" },
            { rating: 3.5, label: "3.5 & Above" },
            { rating: 3.0, label: "3 & Above" },
          ].map(({ rating, label }) => (
            <label key={rating} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 accent-red-600"
                checked={minRating === rating}
                onChange={(e) => handleRatingChange(rating, e.target.checked)}
              />
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
                {label}
              </span>
            </label>
          ))}
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
          Near By Location (km)
        </p>
        <input
          type="range"
          className="w-full accent-red-600"
          min="1"
          max="100"
          value={locationRadius}
          onChange={handleLocationChange}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1km</span>
          <span>{locationRadius}km</span>
          <span>100km</span>
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
          Price Range (₹)
        </p>
        <input
          type="range"
          className="w-full accent-red-600"
          min="0"
          max="5000"
          step="100"
          value={priceRange.max}
          onChange={handlePriceChange}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹0</span>
          <span>₹{priceRange.max}</span>
          <span>₹5000+</span>
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
          Mode
        </p>
        <div
          className="flex flex-col gap-1 text-sm"
          style={{ color: COLORS.primary_gray }}
        >
          <label>
            <input
              type="checkbox"
              className="mr-2 accent-red-600"
              checked={selectedModes.includes("online")}
              onChange={(e) => handleModeChange("Online", e.target.checked)}
            />
            Online
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2 accent-red-600"
              checked={selectedModes.includes("offline")}
              onChange={(e) => handleModeChange("Offline", e.target.checked)}
            />
            Offline
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2 accent-red-600"
              checked={selectedModes.includes("hybrid")}
              onChange={(e) => handleModeChange("Hybrid", e.target.checked)}
            />
            Hybrid
          </label>
        </div>
      </div>

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
