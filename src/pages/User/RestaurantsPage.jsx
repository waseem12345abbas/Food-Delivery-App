import React from 'react';
import Restaurants from '../components/Restaurants/Restaurants';
import { restaurantsApi } from '../components/Home/api/restaurentsapi';

const RestaurantsPage = () => {
  return (
    <div>
      <Restaurants restaurantsApi={restaurantsApi}/>
    </div>
  )
}

export default RestaurantsPage
