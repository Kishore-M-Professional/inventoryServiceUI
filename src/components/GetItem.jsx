import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getItemApiCall } from "../reduxStore/reduxSlice";

function GetItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const errorData = useSelector((state) => state.inventory.error);
  const getItem = useSelector((state) => state.inventory.getItem);

  const [itemId, setItemId] = useState("ItemID");
  const [itemName, setItemName] = useState("itemName");
  const [itemPrice, setItemPrice] = useState("itemPrice");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (getItem && getItem.itemId) {
      setItemId(getItem.itemId);
      setItemName(getItem.itemName);
      setItemPrice(getItem.itemPrice);
      setQuantity(getItem.quantity);
    } else {
      dispatch(getItemApiCall(id));
    }
  }, [dispatch, id, getItem]);

  return (
    <div>
      <>
        <h2>
          <i>{id}</i>
        </h2>
        {errorData.status === 200 ? (
          <>
            <form className="flex mt-3">
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
                    readOnly={true}
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
                    readOnly={true}
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate("/")}
              >
                Back
              </button>
            </form>
          </>
        ) : (
          <>
            <h3>{errorData.msg}</h3>
          </>
        )}
      </>
    </div>
  );
}

export default GetItem;
