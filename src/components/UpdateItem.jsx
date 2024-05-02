import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getItemApiCall, updateItemApiCall } from "../reduxStore/reduxSlice";
import Header from "./Header";

function UpdateItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const errorData = useSelector((state) => state.inventory.error);
  const updateItem = useSelector((state) => state.inventory.getItem);

  const [itemId, setItemId] = useState("ItemID");
  const [itemName, setItemName] = useState("itemName");
  const [itemPrice, setItemPrice] = useState("itemPrice");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (updateItem && updateItem.itemId) {
      setItemId(updateItem.itemId);
      setItemName(updateItem.itemName);
      setItemPrice(updateItem.itemPrice);
      setQuantity(updateItem.quantity);
    } else {
      dispatch(getItemApiCall(id));
    }
  }, [dispatch, id, updateItem]);

  const handleChange = (event) => {
    if (event.target.name === "itemPrice") {
      setItemPrice(event.target.value);
    } else if (event.target.name === "quantity") {
      setQuantity(event.target.value);
    }
  };

  const invokeUpdateItemApi = (event) => {
    event.preventDefault();
    console.log("invoking the updateItem API call");
    const updateRequest = {
      itemId: itemId,
      itemName: itemName,
      itemPrice: itemPrice,
      quantity: quantity
    }
    dispatch(updateItemApiCall(updateRequest));
    navigate("/");
  }

  const handleResetChange = () => {
    setItemId(updateItem.itemId);
    setItemName(updateItem.itemName);
    setItemPrice(updateItem.itemPrice);
    setQuantity(updateItem.quantity);
  };

  return (
    <div>
      <Header value={"updateItem"} />
      {errorData.status === 200 ? (
        <>
          <form className="flex mt-3" onSubmit={invokeUpdateItemApi}>
            <div className="row mb-3">
              <label htmlFor="itemId" className="col-sm-2 col-form-label">
                Item ID
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  name="itemId"
                  id="itemId"
                  value={itemId}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="itemName" className="col-sm-2 col-form-label">
                Item Name
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  name="itemName"
                  id="itemName"
                  value={itemName}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="itemPrice" className="col-sm-2 col-form-label">
                Item Price
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  name="itemPrice"
                  id="itemPrice"
                  value={itemPrice}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="quantity" className="col-sm-2 col-form-label">
                Quantity
              </label>
              <div className="col-sm-3">
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  id="quantity"
                  value={quantity}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleResetChange}
            >
              Reset
            </button>
          </form>
        </>
      ) : (
        <>
          <h3>{errorData.msg}</h3>
        </>
      )}
    </div>
  );
}

export default UpdateItem;
