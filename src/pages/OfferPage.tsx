import React from 'react'
import { COLORS } from '../Constants/uiconstants'
import CoursesOnSale from '../Components/CourseOnSale/CoursesOnSale'
import FeaturedDeals from '../Components/CourseOnSale/FeatureDeals'

const OfferPage: React.FC = () => {
  return (
    <div>
      <div className="min-h-screen" style={{ backgroundColor: COLORS.primary_yellow }}>
        <div className="max-w-7xl mx-auto">
          <FeaturedDeals />
          <CoursesOnSale />
        </div>

      </div>
    </div>s
  )
}

export default OfferPage