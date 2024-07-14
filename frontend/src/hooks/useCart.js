import React, { createContext, useContext, useEffect, useState } from 'react'





const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
  items: [],
  totalPrice:0,
  totalCount:0,
};

export default function CartProvider({ children }) {
const initCart =getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart.items);
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);


  useEffect(() => {
    const totalPrice = sum(cartItems.map(item => item.price));
    const totalCount = sum(cartItems.map(item => item.quantity));
    setTotalCount(totalCount);
    setTotalPrice(totalPrice);
    localStorage.setItem(CART_KEY,JSON.stringify({
      items:cartItems,
      totalPrice,
      totalCount,
    }))
  },
    [cartItems]);



    function  getCartFromLocalStorage() {
      const storedCart = localStorage.getItem(CART_KEY);
      return storedCart? JSON.parse(storedCart):EMPTY_CART;
    }

  const sum = items => {
    return items.reduce((prevValue, curValue) => prevValue + curValue, 0)
  }

  const removeFromCart = parfumId => {
    const filteredCartItems = cartItems.filter(item => item.parfum.id !== parfumId);
    setCartItems(filteredCartItems);
  };

  const changeQuantity = (cartItem, newQuantity) => {
    const { parfum } = cartItem;
    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: parfum.price * newQuantity,
    };

    setCartItems(
      cartItems.map(item => (item.parfum.id === parfum.id ? changedCartItem : item))
    );
  };

const addToCart = parfum => {
  const cartItem =cartItems.find(item => item.parfum.id === parfum.id);
  if(cartItem){
    changeQuantity(cartItem,cartItem.quantity+1);
  }else{
    setCartItems([...cartItems,{parfum,quantity:1,price:parfum.price}]);
  }
}

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);