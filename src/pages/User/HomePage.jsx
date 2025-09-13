import React from 'react'
import HeroCarousel from '../../components/Home/HeroCarousel'
import DiscountProducts from '../../components/Home/DiscountProducts'
import FeatureProducts from '../../components/Home/FeatureProducts'

const HomePage = () => {
  return (
    <div>
      {/* the main hero carosol component */}
      <HeroCarousel/>
      <DiscountProducts/>
      <FeatureProducts/>
      {/* <Offers/> */}
    </div>
  )
}

export default HomePage
