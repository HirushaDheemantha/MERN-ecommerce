import { createContext, useContext } from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {


    const currency = import.meta.env.VITE_CURRENCY;


    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller , setIsSeller] = useState(false);
    const [showUserLogin , setShowUserLogin] = useState(false);
    const [products , setProducts] = useState([]);
    const [cartItems , setCartItems] = useState({});
    const [searchQuery , setSearchQuery] = useState({});


//fetch products
    const fetchProducts = async () => {
      setProducts(dummyProducts)
    }

//add producst to cart
  const addToCart = (itemID) => {
    let cartData = structuredClone(cartItems);

    if(cartData[itemID]){
      cartData[itemID] += 1;
    } else {
      cartData[itemID] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart");
  }
//update cart quantity

const updateCartItem = (itemID , quantity) => {
  let cartData = structuredClone(cartItems);
  cartData[itemID] = quantity;
  setCartItems(cartData);
  toast.success("Cart updated")
}

//remove item from cart

const removeFromCart = (itemID) => {
  let cartData = structuredClone(cartItems);
  if(cartData[itemID]){
    cartData[itemID] -= 1;
    if(cartData[itemID] === 0){
      delete cartData[itemID];
    }
  }
  toast.success("Item removed from cart")
  setCartItems(cartData);
}

//get cart items count 

const getCartCount = () => {
  let totalCount = 0 ;
  for(const item in cartItems){
    totalCount += cartItems[item];
  }
  return totalCount;
}

//get cart total amount 

const getCartAmount = () => {
  let totalAmount = 0 ;
  for(const item in cartItems){
    let itemInfo = products.find((product) => product._id === item);
    if(cartItems[item] > 0 && itemInfo){
      totalAmount += itemInfo.offerPrice * cartItems[item];
    }
  }
  return Math.floor(totalAmount * 100) / 100;
}



    useEffect(() => {
      fetchProducts();
    }, [])
    
 
    const value = { navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, 
      products ,currency , addToCart ,updateCartItem ,removeFromCart ,cartItems,searchQuery 
      , setSearchQuery, getCartAmount ,getCartCount };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext)
}
