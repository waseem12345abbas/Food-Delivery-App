import {configureStore} from '@reduxjs/toolkit'
import cartSlice  from './features/cart/Cart';
import productsSlice from './features/products/productsSlice';
import featureProductsSlice from './features/products/featureProducts';
import usersSlice from './features/users/users';
import userSession from './features/users/userSession'

export const store=configureStore({
    reducer:{
        cart:cartSlice,
        products:productsSlice,
        featureProducts:featureProductsSlice,
        users:usersSlice,
        userSession: userSession
    },
})