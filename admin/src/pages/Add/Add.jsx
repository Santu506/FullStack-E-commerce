import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function Add({ url, token }) {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSizeChange = (size, quantity) => {
    setSizes((prev) => {
      const existingSize = prev.find((item) => item.size === size);
      if (existingSize) {
        return prev.map((item) =>
          item.size === size ? { size, quantity } : item
        );
      } else {
        return [...prev, { size, quantity }];
      }
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));
    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);

    try {
      
      const response = await axios.post(url + "/api/v1/products/add", formData, {
        headers: {
          Authorization: token,
        },
      });
      

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Men",
          subCategory: "Topwear",
        });
        setBestseller(false);
        setSizes([]);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the product.");
    }
  };

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className="flex-col">
        <div className="add-img-upload flex-col ">
          <p>Upload Image</p>
          <div className="all-img">
            <label htmlFor="image1">
              <img
                src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
                alt="Upload preview"
              />
            </label>
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              style={{ opacity: 0, position: "absolute", zIndex: -1 }}
            />
            <label htmlFor="image2">
              <img
                src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
                alt="Upload preview"
              />
            </label>
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              style={{ opacity: 0, position: "absolute", zIndex: -1 }}
            />
            <label htmlFor="image3">
              <img
                src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
                alt="Upload preview"
              />
            </label>
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              style={{ opacity: 0, position: "absolute", zIndex: -1 }}
            />
            <label htmlFor="image4">
              <img
                src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
                alt="Upload preview"
              />
            </label>
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              style={{ opacity: 0, position: "absolute", zIndex: -1 }}
            />
          </div>
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
              required
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="add-category flex-col">
            <p>Product sub category</p>
            <select
              onChange={onChangeHandler}
              name="subCategory"
              value={data.subCategory}
              required
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="₹20"
              required
            />
          </div>
        </div>
        <div>
          <p className="product-sizes">Product Sizes and Quantities</p>
          <div className="sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size} className="size-input">
                <label>{size}</label>
                <input
                className="quantity-input"
                  type="number"
                  min="0"
                  placeholder="Quantity"
                  onChange={(e) => handleSizeChange(size, Number(e.target.value))}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bestseller">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
          />
          <label htmlFor="bestseller"> Add to bestseller</label>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
}

export default Add;


// import React, { useEffect, useState } from "react";
// import "./Add.css";
// import { assets } from "../../assets/admin_assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";

// function Add({ url,token }) {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);
//   const [image4, setImage4] = useState(null);
//   const [sizes,setSizes] = useState([]);
//   const [bestseller, setBestseller] = useState(false);
//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "Men",
//     subCategory: "Topwear",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//     console.log(data);
//   };

  

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("description", data.description);
//     formData.append("price", Number(data.price));
//     formData.append("category", data.category);
//     formData.append("subCategory", data.subCategory);
//     formData.append("bestseller", bestseller);
//     formData.append("sizes", JSON.stringify(sizes));
//     {image1 && formData.append("image1", image1)};
//     {image2 && formData.append("image2", image2)};
//     {image3 && formData.append("image3", image3)};
//     {image4 && formData.append("image4", image4)};


    
//     try {
//       const response = await axios.post(url+"/api/v1/products/add",formData,{  // Payload with the product ID
//         headers: { 
//           Authorization: token  // Add the token in the Authorization header
//         }});

//       if (response.data.success) {
//         setData({
//           name: "",
//           description: "",
//           price: "",
//           category: "Men",
//           subCategory: "Topwear",
//         });
//         setBestseller(false);
//         setSizes([]);
//         setImage1(null);
//         setImage2(null);
//         setImage3(null);
//         setImage4(null);
//         toast.success(response.data.message);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("An error occurred while adding the product.");
//     }
//   };

//   return (
//     <div className="add">
//       <form onSubmit={onSubmitHandler} className="flex-col">
//         <div className="add-img-upload flex-col ">
//           <p>Upload Image</p>
//           <div className="all-img">
//             <label htmlFor="image1">
//               <img
//                 src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
//                 alt="Upload preview"
//               />
//             </label>
//             <input
//               onChange={(e)=>setImage1(e.target.files[0])}
//               type="file"
//               id="image1"
//               style={{ opacity: 0, position: "absolute", zIndex: -1 }}
//             />
//             <label htmlFor="image2">
//               <img
//                 src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
//                 alt="Upload preview"
//               />
//             </label>
//             <input
//               onChange={(e)=>setImage2(e.target.files[0])}
//               type="file"
//               id="image2"
//               style={{ opacity: 0, position: "absolute", zIndex: -1 }}
//             />
//             <label htmlFor="image3">
//               <img
//                 src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
//                 alt="Upload preview"
//               />
//             </label>
//             <input
//               onChange={(e)=>setImage3(e.target.files[0])}
//               type="file"
//               id="image3"
//               style={{ opacity: 0, position: "absolute", zIndex: -1 }}
//             />
//             <label htmlFor="image4">
//               <img
//                 src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
//                 alt="Upload preview"
//               />
//             </label>
//             <input
//               onChange={(e)=>setImage4(e.target.files[0])}
//               type="file"
//               id="image4"
//               style={{ opacity: 0, position: "absolute", zIndex: -1 }}
//             />
//           </div>
//         </div>

//         <div className="add-product-name flex-col">
//           <p>Product name</p>
//           <input
//             onChange={onChangeHandler}
//             value={data.name}
//             type="text"
//             name="name"
//             placeholder="Type here"
//             required
//           />
//         </div>
//         <div className="add-product-description flex-col">
//           <textarea
//             onChange={onChangeHandler}
//             value={data.description}
//             name="description"
//             rows="6"
//             placeholder="Write content here"
//             required
//           ></textarea>
//         </div>
//         <div className="add-category-price">
//           <div className="add-category flex-col">
//             <p>Product category</p>
//             <select
//               onChange={onChangeHandler}
//               name="category"
//               value={data.category} // Ensures controlled component behavior
//               required
//             >
//               <option value="Men">Men</option>
//               <option value="Women">Women</option>
//               <option value="Kids">Kids</option>
//             </select>
//           </div>
//           <div className="add-category flex-col">
//             <p>Product sub category</p>
//             <select
//               onChange={onChangeHandler}
//               name="subCategory"
//               value={data.subCategory} // Ensures controlled component behavior
//               required
//             >
//               <option value="Topwear">Topwear</option>
//               <option value="Bottomwear">Bottomwear</option>
//               <option value="Winterwear">Winterwear</option>
//             </select>
//           </div>
//           <div className="add-price flex-col">
//             <p>Product price</p>
//             <input
//               onChange={onChangeHandler}
//               value={data.price}
//               type="number"
//               name="price"
//               placeholder="$20"
//               required
//             />
//           </div>
//         </div>
//         <div>
//           <p className="product-sizes">Product Sizes</p>
//           <div className="sizes">
//             <div onClick={()=>setSizes(prev => prev.includes('S') ? prev.filter(size => size !== 'S') : [...prev,'S'])} >
//               <p className={`${sizes.includes('S') ? 'active':'inactive'} size`}>S</p>
//             </div>

//             <div onClick={()=>setSizes(prev => prev.includes('M') ? prev.filter(size => size !== 'M') : [...prev,'M'])} >
//               <p className={`${sizes.includes('M') ? 'active':'inactive'} size`}>M</p>
//             </div>

//             <div onClick={()=>setSizes(prev => prev.includes('L') ? prev.filter(size => size !== 'L') : [...prev,'L'])} >
//               <p className={`${sizes.includes('L') ? 'active':'inactive'} size`}>L</p>
//             </div>

//             <div onClick={()=>setSizes(prev => prev.includes('XL') ? prev.filter(size => size !== 'XL') : [...prev,'XL'])} >
//               <p className={`${sizes.includes('XL') ? 'active':'inactive'} size`}>XL</p>
//             </div>

//             <div onClick={()=>setSizes(prev => prev.includes('XXL') ? prev.filter(size => size !== 'XXL') : [...prev,'XXL'])} >
//               <p className={`${sizes.includes('XXL') ? 'active':'inactive'} size`}>XXL</p>
//             </div>
//           </div>
//         </div>
//         <div className="bestseller">
//           <input onChange={()=>setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller"/>
//           <label htmlFor="bestseller"> Add to bestseller</label>
//         </div>
//         <button type="submit" className="add-btn">
//           ADD
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Add;
