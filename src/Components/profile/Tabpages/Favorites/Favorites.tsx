import { useDispatch, useSelector } from "react-redux";
import image1 from "../../../../assets/profile/images/image1.png";
import image2 from "../../../../assets/profile/images/image2.png";
import { COLORS } from "../../../../Constants/uiconstants";
import { useAppSelector } from "../../../../hooks/reduxhooks";
import type { AppDispatch } from "../../../../store/store";
import { useEffect, useState } from "react";
import { getAllFavData, setCoursesById } from "../../../../features/settings/reducers/settingThunks";
import { toast } from "react-toastify";
import { courseIdSelect, favSelect } from "../../../../features/settings/reducers/settingSelectors";

type FavoriteCardProps = {
  image: any;
  category: string;
  title: string;
  institute: string;
  description : string;
  price: string;
  oldPrice?: string;
  buttonLabel: string;
};

const FavoriteCard = ({
  image,
  category,
  title,
  institute,
  description,
  price,
  oldPrice,
  buttonLabel,
}: FavoriteCardProps) => {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden w-full h-fit p-4"
      style={{ backgroundColor: COLORS.primary_white }}>
      <img src={image} alt={title} className="w-full h-80 object-cover" />
      <div className="p-4">
        <span className="inline-block text-xs font-semibold px-2 py-1 rounded" style={{ backgroundColor: COLORS.primary_red, color: COLORS.primary_white }}>
          {category}
        </span>
        <h3 className="mt-2 text-lg font-semibold">{title}</h3>
        <p className="text-sm" style={{ color: COLORS.primary_gray }}>{description}</p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-semibold">₹{price}</span>
          {oldPrice && (
            <span className="text-sm line-through" style={{ color: COLORS.primary_gray }}>
              ₹{oldPrice}
            </span>
          )}
        </div>
      </div>

      <button className="w-full py-2 font-semibold rounded-xl transition"
        style={{ backgroundColor: COLORS.primary_red, color: COLORS.primary_white }}>
        {buttonLabel}
      </button>
    </div>
  );
};

// Interface for combined favorite item
interface CombinedFavoriteItem {
  courseId: string;
  title: string;
  price: number;
  discountPrice?: number;
  merchantId: string;
  category: string;
  institute: string;
  description: string;
  thumbnail?: string;
}

export const Favorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [combinedFavorites, setCombinedFavorites] = useState<CombinedFavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Get favorites and course data from Redux store
  const favoritesData = useSelector(favSelect);
  const courseData = useSelector(courseIdSelect);

  // Fetch favorites data
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const userId = "691d8d28340440bf767c5b1d";
        await dispatch(getAllFavData(userId));
      } catch (error: unknown) {
        toast.error(error as string);
      }
    };

    fetchFavorites();
  }, [dispatch]);

  // Fetch course details for each favorite item and combine data
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (favoritesData?.data?.data?.items?.length > 0) {
        try {
          const combinedData: CombinedFavoriteItem[] = [];

          for (const favItem of favoritesData.data.data.items) {
            try {
              // Fetch course details for each favorite item
              const courseResponse = await dispatch(setCoursesById(favItem.courseId));
              console.log("cour",courseResponse)
              
              if (courseResponse?.data) {
                const course = courseResponse.data;
                console.log("cpusre",course.data.description);
                
                
                combinedData.push({
                  courseId: favItem.courseId,
                  title: favItem.title || course.title,
                  price: favItem.discountPrice || favItem.price,
                  discountPrice: favItem.discountPrice ? favItem.price : undefined,
                  merchantId: favItem.merchantId,
                  category: course.category?.primary || "Programming",
                  institute:course.data.instituteId || "Institute Name", 
                  description:  course.data.description || course.data.shortDescription,
                  thumbnail: course.thumbnail
                });
              }
            } catch (error) {
              console.error(`Error fetching course ${favItem.courseId}:`, error);
            }
          }

          setCombinedFavorites(combinedData);
        } catch (error: unknown) {
          toast.error("Error combining favorite data");
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (favoritesData?.data?.data?.items) {
      fetchCourseDetails();
    }
  }, [favoritesData, dispatch]);
  console.log("comb",combinedFavorites)

  const imageMap: Record<string, string> = {
    "image1.png": image1,
    "image2.png": image2,
  };

  // Get fallback image based on course title or use default
  const getCourseImage = (course: CombinedFavoriteItem) => {
    if (course.thumbnail) {
      return course.thumbnail;
    }
    // Use a fallback logic based on course title or other properties
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 justify-items-center">
      {combinedFavorites.length > 0 ? (
        combinedFavorites.map((course, index) => (
          <FavoriteCard
            key={course.courseId}
            image={getCourseImage(course)}
            category={course.category}
            title={course.title}
            institute={course.institute}
            description={course.description}
            price={course.price.toString()}
            oldPrice={course.discountPrice ? course.discountPrice.toString() : undefined}
            buttonLabel="View Course"
          />
        ))
      ) : (
        <p className="text-sm" style={{ color: COLORS.primary_gray }}>
          No favorites found.
        </p>
      )}
    </div>
  );
};

export default Favorites;