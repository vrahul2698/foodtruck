import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: {}
    },
    reducers: {
        addItem: (state, action) => {
            const { id, basePrice, name } = action.payload;
            if (state.items[id]) {
                state.items[id].quantity = (state.items[id]?.quantity || 1) + 1;
            } else {
                state.items[id] = { id, name, basePrice, quantity: 1 }
            }
        },
        removeItem: (state, action) => {
            const id = action.payload;
            if (!state.items[id]) return;
            if (state.items[id].quantity > 1) {
                state.items[id].quantity -= 1;
            } else {
                delete state.items[id];
            }
        },
        clearItem: (state) => {
            state.items ={};
        }
    }
})

export const { addItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;