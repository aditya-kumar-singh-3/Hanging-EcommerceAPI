
'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import Link from 'next/link';
import { removefromcart } from '../Redux/CreateSlice';

interface Product {
  id: number; // Ensure this matches your Product interface
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartContent = () => {
  const cartInfo = useSelector((state: RootState) => state.cart.cartData) as unknown as Product[]; // Cast to Product array
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(cartInfo);
  }, [cartInfo]);

  const calculateTotal = () => {
    return cartInfo.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cartInfo.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you have not added any items to your cart yet.</p>
        <Link href="/">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  const deleteitem = (id: number) => {
    // Instead of finding the item in the cart, just dispatch using the id
    dispatch(removefromcart(id));
  };

  return (
    <>
      <div>
        <Link href="/" className="ml-5 mt-5">Back to Home</Link>
      </div>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartInfo.map((item) => (
              <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
                <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                  <img src={item.image} alt={item.name} width={96} height={96} className="w-full h-full object-cover" />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => deleteitem(item.id)} className="text-red-500 mt-2 focus:outline-none hover:text-red-600">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">Total</span>
                  <span className="text-2xl font-bold">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-md mt-6 hover:bg-blue-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContent;
