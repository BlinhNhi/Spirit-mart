import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './reducer/locationReducer'
import cartSlice from './CartSlice'

export const store = configureStore({
    reducer: {
        locationReducer,
        cart: cartSlice
    }
})