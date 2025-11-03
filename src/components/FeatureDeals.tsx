import React from "react";
import { useSelector} from "react-redux";
import { selectDeals } from "../features/deals/Selector";
import { LuTag } from "react-icons/lu";
import { GoClock } from "react-icons/go";

const FeaturedDeals: React.FC = () => {
 
  const deals = useSelector(selectDeals); 

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Featured Deals</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
          >
          <div className="relative">
            <img src={deal.image} alt={deal.title} className="w-full h-56 object-cover p-2 rounded-2xl" />
       <div className="absolute bottom-1 p-4"> <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                {deal.discount}
              </span>
               <h3 className=" mt-2 text-white">{deal.title}</h3></div>
            </div>  

            <div className="p-4 ">
                
             
             
              <p className="text-sm text-gray-600">{deal.description}</p>

              <div className="mt-3 flex items-center border border-amber-400 rounded px-2 py-1 justify-between">
                <span className="text-sm flex gap-2 items-center"><LuTag className="text-amber-400"/> {deal.code}</span>
                <button
                  className="text-sm text-yellow-600 font-semibold"
                  onClick={() => navigator.clipboard.writeText(deal.code)}
                >
                   Copy
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-2 flex gap-2 items-center">
              <GoClock /> Valid Until {deal.validUntil}
              </p>

              <div className="mt-3">
                <p className="text-xs font-semibold">Applicable To:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {deal.applicableTo.map((course, idx) => (
                    <span key={idx} className="bg-gray-100 text-xs px-2 py-1 rounded">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

            <div className="">
               <button className="mt-4 w-full bg-red-600 text-white font-semibold py-2 rounded">
                Browse Courses
              </button>
                </div> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDeals;
