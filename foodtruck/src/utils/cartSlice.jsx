import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            const payload = action.payload;

            const existing = state.items.find(
                item => String(item.id) === String(payload.id)
            );

            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                state.items.push({
                    ...payload,
                    quantity: 1
                });
            }
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const existing = state.items.find(item => item.id === id);

            if (existing) {
                if (existing.quantity > 1) {
                    existing.quantity -= 1;
                } else {
                    // quantity was 1 → remove item
                    state.items = state.items.filter(item => item.id !== id);
                }
            }
        },
        clearItem: (state) => {
            state.items.length = 0;
        }
    }
})

export const { addItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;