import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],  // Stores the items in the cart
    addedToCart: {},  // Tracks which items have been added to the cart
  },
  reducers: {
    // Add an item to the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const parsedCost = parseFloat(cost.replace('$', '')); // Remove '$' and convert to float
      const existingItem = state.items.find(item => item.name === name);
    
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost: parsedCost, quantity: 1 }); // Use parsed cost as a number
      }
    
      state.addedToCart[name] = true;
    },

    // Remove an item from the cart
    removeItem: (state, action) => {
      const itemName = action.payload.name;
      // Remove item by filtering out the item with the specified name
      state.items = state.items.filter(item => item.name !== itemName);
      // Also remove it from the addedToCart tracker
      delete state.addedToCart[itemName];
    },

    // Update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        // Update the item's quantity
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Export action creators for use in other components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as default to use in store.js
export default CartSlice.reducer;
