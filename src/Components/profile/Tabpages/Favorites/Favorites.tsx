import image1 from "../../../../assets/profile/images/image1.png";
import image2 from "../../../../assets/profile/images/image2.png";
import { COLORS } from "../../../../Constants/uiconstants";
import { useAppSelector } from "../../../../hooks/reduxhooks";

type FavoriteCardProps = {
  image: any;
  category: string;
  title: string;
  institute: string;
  price: string;
  oldPrice?: string;
  buttonLabel: string;
};

const FavoriteCard = ({
  image,
  category,
  title,
  institute,
  price,
  oldPrice,
  buttonLabel,
}: FavoriteCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full h-fit p-4">
      <img src={image} alt={title} className="w-full h-80 object-cover" />
      <div className="p-4">
        <span className="inline-block text-white text-xs font-semibold px-2 py-1 rounded" style={{backgroundColor:COLORS.primary_red}}>
          {category}
        </span>
        <h3 className="mt-2 text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{institute}</p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-semibold">₹{price}</span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{oldPrice}
            </span>
          )}
        </div>
      </div>

      <button className="w-full bg-red-600 text-white py-2 font-semibold rounded-xl hover:bg-red-700 transition">
        {buttonLabel}
      </button>
    </div>
  );
};

export const Favorites = () => {
  const profile = useAppSelector((state) => state.profile);

  const imageMap: Record<string, string> = {
    "image1.png": image1,
    "image2.png": image2,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 justify-items-center">
      {profile.favorites && profile.favorites.length > 0 ? (
        profile.favorites.map((course, index) => (
          <FavoriteCard
            key={index}
            image={imageMap[course.image]}
            category={course.category}
            title={course.title}
            institute={course.institute}
            price={course.price}
            oldPrice={course.oldPrice}
            buttonLabel={course.buttonLabel}
          />
        ))
      ) : (
        <p className="text-gray-500 text-sm">No favorites found.</p>
      )}
    </div>
  );
};

export default Favorites;
