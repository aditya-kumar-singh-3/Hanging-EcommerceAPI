import { createSlice } from "@reduxjs/toolkit";

// Define your Product type here or import it if it's defined elsewhere
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface CartState {
  cartData: Product[];
  wishListData: Product[];
  totalProductInCart: number;
  added: boolean;
  quantity: number;
  totalProductInWishlist: number;
}

const initialState: CartState = {
  cartData: [],
  wishListData: [],
  totalProductInCart: 0,
  quantity: 1,
  totalProductInWishlist: 0,
  added: false
};

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addtocart(state, action) {
      const item = action.payload as Product;  // Explicitly typing the payload as Product
      if (!item || !item.id) {
        console.error("Invalid item:", item);
        return;
      }
      const isThere = state.cartData.find((itemm: Product) => itemm.id === item.id);

      if (!isThere) {
        state.cartData.push(item);
        state.totalProductInCart += 1;
      }
    },
    removefromcart(state, action) {
      const idToRemove = action.payload; // This should be the ID of the item to remove
    
      const updatedCart = state.cartData.filter((item: Product) => item.id !== idToRemove);
      state.cartData = updatedCart;
    },
    
  },
});

export const {
  addtocart,
  removefromcart
} = cartSlice.actions;

export default cartSlice.reducer;
