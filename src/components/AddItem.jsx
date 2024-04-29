import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemApiCall } from "../reduxStore/reduxSlice";
import "../styles/AddItem.css";
import Header from "./Header";

function AddItem() {
  const formRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const invokeAddItemApi = (event) => {
    event.preventDefault();
    const form = formRef.current;
    console.log("invoked the AddItem API call");
    const postRequest = {
      itemId: form['itemId'].value,
      itemName: form['itemName'].value,
      itemPrice: form['itemPrice'].value,
      quantity: form['quantity'].value,
    }
    dispatch(addItemApiCall(postRequest));
    navigate("/");
  };

  return (
    <>
      <Header value={"addItem"} />
      <form className="flex mt-3" ref={formRef} onSubmit={invokeAddItemApi}>
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
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </>
  );
}

export default AddItem;
