import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import Update from "../Update/Update";

function List({ url, token }) {
  const [list, setList] = useState([]);
  const [updateItem, setUpdateItem] = useState(null);

  const [update, setUpdate] = useState(false);
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/products/list`);
      if (response.data.success) {
        setList(response.data.items);
      } else {
        toast.error("Error fetching product list.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the product list.");
    }
  };

  const handleUpdate = (item) => {
    setUpdateItem(item);
    setUpdate(true);
  };

  const removeProduct = async (_id) => {
    try {
      const response = await axios.delete(`${url}/api/v1/products/remove`, {
        data: { id: _id }, // Payload with the product ID
        headers: {
          Authorization: token, // Add the token in the Authorization header
        },
      });
      if (response.data.success) {
        const updatedList = list.filter((item) => item._id !== _id);
        setList(updatedList);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while removing the product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Products List</p>
      <div className="list-table">
        <div className="list-table-formet title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>SubCategory</p>
          <p>Price</p>
          <p>Sizes (Quantity)</p>
          <p>Bestseller</p>
          <p>Action</p>
        </div>
        {list.map((item, idx) => (
          <div key={idx} className="list-table-formet">
            <img src={item.image[0]} alt={`${item.name}`} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.subCategory}</p>
            <p>₹{item.price}</p>
            {/* Display sizes with quantities */}
            <p>
              {item.sizes.map((sizeObj) => (
                <span style={{ display: "block" }} key={sizeObj.size}>
                  {sizeObj.size} {"->"} {sizeObj.quantity}{" "}
                </span>
              ))}
            </p>
            <p>{item.bestseller ? "Yes" : "No"}</p>
            <p className="cursor">
              <button
                onClick={() => removeProduct(item._id)}
                style={{
                  color: "red",
                  marginRight: "10px",
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                X
              </button>

              <button
                onClick={() => handleUpdate(item)}
                style={{
                  color: "green",
                  marginRight: "10px",
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              {update && <Update url={url} token={token} item={updateItem} setUpdate={setUpdate} fetchList={fetchList} />}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;

