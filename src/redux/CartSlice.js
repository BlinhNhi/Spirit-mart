import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemWithIdCart = {
                ...action.payload,
                idCart: Date.now().toString() + Math.random().toString(36).substring(2)
            };
            state.push(itemWithIdCart);
        },
        deleteFromCart(state, action) {
            console.log(action.payload.id);
            console.log(action.payload.idCart);

            return state.filter(item => item.id !== action.payload.id);
        },
        deleteDetailFromCart(state, action) {
            console.log(action.payload.idCart);

            return state.filter(item => item.idCart !== action.payload.idCart);
        },
        incrementQuantity: (state, action) => {
            state = state.map(item => {
                if (item.id === action.payload) {
                    item.quantityOrder++;
                }
                return item;
            });
        },
        decrementQuantity: (state, action) => {
            state = state.map(item => {
                if (item.quantityOrder !== 1) {
                    if (item.id === action.payload) {
                        item.quantityOrder--;
                    }
                }
                return item;

            })
        },
        clearCart: (state, action) => {
            return [];
        }
    },
})

export const { addToCart, deleteFromCart, deleteDetailFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer