//@ts-nocheck
import { db } from "@/app/config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import { doc, getDoc, setDoc } from "firebase/firestore";



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

};

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {

    addtocart(state,action){
        const item = action.payload;
        if (!item || !item.id) {
            console.error("Invalid item:", item);
            return;
          }
          const isThere = state.cartData.find((itemm) => itemm.id === item.id);

          if (!isThere) {
            state.cartData.push(item);
            state.totalProductInCart += 1;
          }
    },
    removefromcart(state,action){
      const item = action.payload;

      const updatedCart = state.cartData.filter((itemm)=> itemm.id != item.id);
      state.cartData = updatedCart;
    },

            },
});



export const {
addtocart,
removefromcart
} = cartSlice.actions;

export default cartSlice.reducer;
