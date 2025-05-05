import { createContext, useEffect, useState } from "react";
import { staticProducts } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
export const ShopContext = createContext();
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  const isBackendnotWorking = () => {
    if(products.length === 0){
      setProducts(staticProducts);
    }
  };

  const addToCart = async (itemId, size, quantity) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let isValid =false;
    const product = products.find((item) => item._id === itemId);
    product.sizes.map((item) => {
      if (item.size === size) {
        if (item.quantity < quantity) {
          toast.error("Out of Stock");
          isValid = true;
          return;
        }
      }
    })
    if(isValid) return;

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += quantity;
      } else {
        cartData[itemId][size] = quantity;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);

    if (token) {
      try {
        const res = await axios.post(
            backendUrl + "/api/v1/carts/add", 
            {
              itemId: itemId,  // The item ID you want to add to the cart
              size: size,       // The size of the item
              quantity: quantity
            },
            {
              headers: { Authorization: ` ${token}`  }  // Authorization header with Bearer token
            }
          );
          if(res.data.success === true){
            toast.success(res.data.message);
          }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (e) {
          
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if(quantity !== 0){
      quantity = cartData[itemId][size] + quantity; 
    }
    
    // let isValid =false;
    // const product = products.find((item) => item._id === itemId);
    // product.sizes.map((item) => {
    //   if (item.size === size) {
    //     if (item.quantity < quantity) {
    //       toast.error("Out of Stock");
    //       isValid = true;
    //       return;
    //     }
    //   }
    // })
    // if(isValid) return;

    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    
    if(token) {  
            try {
                const res = await axios.put(
                    backendUrl + "/api/v1/carts/update", 
                    {
                    itemId: itemId,  // The item ID you want to add to the cart
                    size: size,       // The size of the item
                    quantity: quantity
                    },
                    {
                    headers: { Authorization: ` ${token}`  }  // Authorization header with Bearer token
                    }
                );
                if(res.data.success === true){
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
    }
  };

  let getCartAmount = () => {
    let totalAmount = 0;
    
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return totalAmount;
  };

  const getUserCart = async (token) => {
    try {
        if(!token) return;
      const response = await axios.get(backendUrl + "/api/v1/carts/list",{headers:{Authorization:`${token}`}});
      if (response.data.success === true) {
        setCartItems(response.data.cartData);
        toast.success(response.data.message);
      } else {
        toast.error(response.data?.message);
      }
    }catch(error){
        console.log(error);
        toast.error("Something went wrong");
    }
};
  const getProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/v1/products/list");
      if (response.data.success === true) {
        setProducts(response.data.items);
        toast.success(response.data.message);
      } else {
        toast.error(response.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getProducts();
    isBackendnotWorking();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
    if (!user && localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    user,
    setUser,
    getUserCart,
    setCartItems,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
