import React from 'react'
import FeaturedDeals from '../components/FeatureDeals'
import CoursesOnSale from '../components/CoursesOnSale'
import { COLORS } from '../Constants/uiconstants'

const OfferPage:React.FC = () => {
  return (
    <div>
        <div className="min-h-screen" style={{ backgroundColor: COLORS.primary_yellow }}>
         <div className="max-w-7xl mx-auto">
          <FeaturedDeals/>
          <CoursesOnSale/>
         </div>

         </div>
    </div>
  )
}

export default OfferPage