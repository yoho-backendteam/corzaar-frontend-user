import React from "react";
import { useSelector} from "react-redux";
import { selectDeals } from "../features/deals/Selector";
import { LuTag } from "react-icons/lu";
import { GoClock } from "react-icons/go";
import { COLORS, FONTS } from "../Constants/uiconstants";

const FeaturedDeals: React.FC = () => {
 
  const deals = useSelector(selectDeals); 

  return (
    <div className="p-6">
     <h2 className="mb-4" style={FONTS.boldHeading as any}>
  Featured Deals
</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
            style={{background : COLORS.primary_white}}
          >
          <div className="relative">
            <img src={deal.image} alt={deal.title} className="w-full h-56 object-cover p-2 rounded-2xl" />
       <div className="absolute bottom-1 p-4"> <span className=" px-2 py-1 rounded" style={{ ...(FONTS.medium as any), color: COLORS.primary_white , background : COLORS.primary_red}}>
                {deal.discount}
              </span>
               <h3 className=" mt-2"style={{ ...(FONTS.regular as any), color: COLORS.primary_white }}>{deal.title}</h3></div>
            </div>  

            <div className="p-4 ">
                
             
             
              <p style={{ ...(FONTS.regular as any), color: COLORS.primary_gray }}>{deal.description}</p>

              <div className="mt-3 flex items-center border border-amber-400 rounded px-2 py-1 justify-between">
                <span className=" flex gap-2 items-center" style={FONTS.regular as any}><LuTag style={{color: COLORS.primary_yellow }}/> {deal.code}</span>
                <button
                   style={{ ...(FONTS.medium as any), color: COLORS.primary_yellow }}
                  onClick={() => navigator.clipboard.writeText(deal.code)}
                >
                   Copy
                </button>
              </div>

              <p className=" mt-2 flex gap-2 items-center" style={{ ...(FONTS.regular as any), color: COLORS.primary_gray }}>
              <GoClock /> Valid Until {deal.validUntil}
              </p>

              <div className="mt-3">
                <p style={FONTS.regular as any}>Applicable To:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {deal.applicableTo.map((course, idx) => (
                    <span key={idx} className="px-2 py-1 rounded" style={{ ...(FONTS.regular as any), color: COLORS.primary_white , background : COLORS.primary_gray}}>
                      {course}
                    </span>
                  ))}
                </div>
              </div>

            <div>
               <button className="mt-4 w-full  py-2 rounded" style={{ ...(FONTS.medium as any), color: COLORS.primary_white , background : COLORS.primary_red}}>
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
