import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import image1 from "../../../../assets/profile/images/image1.png";
import image2 from "../../../../assets/profile/images/image2.png";
import { COLORS } from "../../../../Constants/uiconstants";
import { toast } from "react-toastify";
import type { AppDispatch } from "../../../../store/store";
import { getAllFavData, setCoursesById } from "../../../../features/settings/reducers/settingThunks";
import { favSelect } from "../../../../features/settings/reducers/settingSelectors";
import type { CombinedFavoriteItem, FavResponse } from "../../../../features/settings/types/settingTypes";

// ---------- CARD PROPS ----------
interface FavoriteCardProps {
  image: string;
  category: string;
  title: string;
  institute: string;
  description: string;
  price: string;
  oldPrice?: string;
  buttonLabel: string;
}

// ---------- CARD COMPONENT ----------
const FavoriteCard: React.FC<FavoriteCardProps> = ({
  image,
  category,
  title,
  description,
  price,
  oldPrice,
  buttonLabel,
}) => (
  <div
    className="rounded-2xl shadow-md overflow-hidden w-full h-fit p-4"
    style={{ backgroundColor: COLORS.primary_white }}
  >
    <img src={image} alt={title} className="w-full h-80 object-cover" />
    <div className="p-4">
      <span
        className="inline-block text-xs font-semibold px-2 py-1 rounded"
        style={{
          backgroundColor: COLORS.primary_red,
          color: COLORS.primary_white,
        }}
      >
        {category}
      </span>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm" style={{ color: COLORS.primary_gray }}>
        {description}
      </p>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-semibold">₹{price}</span>
        {oldPrice && (
          <span
            className="text-sm line-through"
            style={{ color: COLORS.primary_gray }}
          >
            ₹{oldPrice}
          </span>
        )}
      </div>
    </div>

    <button
      className="w-full py-2 font-semibold rounded-xl transition"
      style={{
        backgroundColor: COLORS.primary_red,
        color: COLORS.primary_white,
      }}
    >
      {buttonLabel}
    </button>
  </div>
);

// ---------- MAIN COMPONENT ----------
export const Favorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [combinedFavorites, setCombinedFavorites] = useState<CombinedFavoriteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Redux selectors
  const favoritesData: FavResponse | null = useSelector(favSelect);

  // ---------- Fetch favorites ----------
  useEffect(() => {
    const fetchFavorites = async (): Promise<void> => {
      try {
        setLoading(true);
        const userId = "68fb72ea19c3430ef1c8d3e6";
        const result = await dispatch(getAllFavData(userId));
        if (result?.success === true) {
          toast.success(result.message)
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred";
        toast.error(errorMessage);
      }
    };

    fetchFavorites();
  }, [dispatch]);

  // ---------- Fetch courses for each favorite ----------
  useEffect(() => {
    const fetchCourseDetails = async (): Promise<void> => {
      const items = favoritesData?.data?.items ?? [];

      if (items.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const combinedData: CombinedFavoriteItem[] = [];

        for (const favItem of items) {
          try {
            const courseResponse = await dispatch(setCoursesById(favItem.courseId));

            const course = courseResponse?.data;
            if (!course) {
              console.warn(`No course data found for courseId: ${favItem.courseId}`);
              continue;
            }

            const finalPrice = favItem.discountPrice || favItem.price;
            const originalPrice = favItem.discountPrice ? favItem.price : undefined;

            combinedData.push({
              courseId: favItem.courseId,
              title: favItem.title || course.title || "Untitled Course",
              price: finalPrice,
              discountPrice: originalPrice,
              merchantId: favItem.merchantId,
              category: course.category?.primary || "General",
              institute: course.instituteId || "Institute Name",
              description:
                course.shortDescription ||
                course.description ||
                "No description available",
              thumbnail: course.thumbnail,
            });
          } catch (error) {
            console.error(`Error fetching course ${favItem.courseId}:`, error);
          }
        }
        setCombinedFavorites(combinedData);
      } catch (error) {
        console.error("Error combining favorite data:", error);
        toast.error("Error loading favorite courses");
      } finally {
        setLoading(false);
      }
    };

    if (favoritesData?.data?.items) {
      fetchCourseDetails();
    } else {
      setLoading(false);
    }
  }, [favoritesData, dispatch]);

  // ---------- Get fallback image ----------
  const getCourseImage = (course: CombinedFavoriteItem): string => {
    if (course.thumbnail) return course.thumbnail;
    return course.title.toLowerCase().includes("java") ? image1 : image2;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-sm" style={{ color: COLORS.primary_gray }}>
          Loading favorites...
        </p>
      </div>
    );
  }

  // ---------- Render ----------
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 justify-items-center">
      {combinedFavorites.length > 0 ? (
        combinedFavorites.map((course) => (
          <FavoriteCard
            key={course.courseId}
            image={getCourseImage(course)}
            category={course.category}
            title={course.title}
            institute={course.institute}
            description={course.description}
            price={course.price.toString()}
            oldPrice={
              course.discountPrice
                ? course.discountPrice.toString()
                : undefined
            }
            buttonLabel="View Course"
          />
        ))
      ) : (
        <div className="col-span-2 flex justify-center items-center py-8">
          <p className="text-sm" style={{ color: COLORS.primary_gray }}>
            No favorites found. Add some courses to your favorites!
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
