import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: {},
        restaurantId:"",
    },
    reducers: {
        addItem: (state, action) => {
            const { menuItem, price, name } = action.payload;
            if (state.items[menuItem]) {
                state.items[menuItem].quantity += 1;
            } else {
                state.items[menuItem] = { menuItem, name, price, quantity: 1 }
            }
        },
        removeItem: (state, action) => {
            const menuItem = action.payload;
            if (!state.items[menuItem]) return;
            if (state.items[menuItem].quantity > 1) {
                state.items[menuItem].quantity -= 1;
            } else {
                delete state.items[menuItem];
            }
        },
        clearItem: (state) => {
            state.items ={};
        },
        getItems:(state , action)=>{
            state.items = action.payload;
        },
        getRestaurantId:(state , action)=>{
            state.restaurantId = action.payload;
        }
    }
})

export const { addItem, removeItem, clearItem , getItems ,getRestaurantId } = cartSlice.actions;

export default cartSlice.reducer;